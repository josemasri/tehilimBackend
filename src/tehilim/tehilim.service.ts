import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import { Tehilim } from 'src/schemas/tehilim.schema';
import { InjectModel } from '@nestjs/mongoose';
import { InscriptionDto } from 'src/dtos/inscription.dto';
import { join } from 'path';

@Injectable()
export class TehilimService {
  constructor(
    private readonly mailerService: MailerService,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Tehilim.name) private tehilimModel: Model<Tehilim>,
  ) {}

  async inscription({
    quantity,
    mail,
    beraja,
    leiluy,
    matir,
    refua,
    zera,
    zibug,
  }: InscriptionDto): Promise<any> {
    let tehilim = await this.createGetTehilimInstance();
    if (quantity === 5 && tehilim.available.includes(119)) {
      try {
        const tehilims = [];
        tehilims.push(119);
        tehilim.available = tehilim.available.filter(item => item !== 119);
        await tehilim.save();
        const user = new this.userModel({
          email: mail,
          initial: 119,
          final: 119,
        });
        user.beraja = beraja;
        user.refua = refua;
        user.zibug = zibug;
        user.zera = zera;
        user.leiluy = leiluy;
        user.matir = matir;
        await user.save();
        await this.sendMail(mail, tehilims, beraja, refua, zibug, zera, matir);
        return {
          ok: true,
          tehilims,
          user,
        };
      } catch (error) {
        throw new InternalServerErrorException(
          'Ha ocurrido un error, intentalo de nuevo',
        );
      }
    }
    try {
      const tehilims = [];
      for (let i = 0; i < quantity; i++) {
        if (tehilim.available.length === 0) {
          tehilim = await this.resetTehilim();
        }
        tehilims.push(tehilim.available.shift());
      }
      await tehilim.save();
      const user = new this.userModel({
        beraja,
        refua,
        zibug,
        zera,
        leiluy,
        matir,
        email: mail,
        initial: tehilims[0],
        final: tehilims[tehilims.length - 1],
      });
      await user.save();
      await this.sendMail(mail, tehilims, beraja, refua, zibug, zera, matir);
      return {
        ok: true,
        tehilims,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Ha ocurrido un error, intentalo de nuevo',
      );
    }
  }

  private async sendMail(
    mail: string,
    tehilims: number[],
    beraja,
    refua,
    zibug,
    zera,
    matir,
  ): Promise<void> {
    try {
      await this.mailerService.sendMail({
        to: mail,
        subject: 'Maratón de tehilim ✔',
        template: 'mail',
        context: {
          tehilims,
          beraja,
          refua,
          zibug,
          zera,
          matir,
        },
        attachments: [
          {
            filename: 'logoCuarentena.png',
            path: join(
              __dirname,
              '..',
              '..',
              'assets',
              'images',
              'logoCuarentena.png',
            ),
            cid: 'logoCuarentena',
          },
          {
            filename: 'logoPink.png',
            path: join(
              __dirname,
              '..',
              '..',
              'assets',
              'images',
              'logoPink.png',
            ),
            cid: 'logoPink',
          },
          {
            filename: 'quote-bg.png',
            path: join(
              __dirname,
              '..',
              '..',
              'assets',
              'images',
              'quote-bg.png',
            ),
            cid: 'quote-bg',
          },
          {
            filename: 'quote-icon.png',
            path: join(
              __dirname,
              '..',
              '..',
              'assets',
              'images',
              'quote-icon.png',
            ),
            cid: 'quote-icon',
          },
        ],
      });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'No hemos podido enviar el correo porfavor intentalo de nuevo',
      );
    }
  }

  private async createGetTehilimInstance(): Promise<Tehilim> {
    try {
      const tehilim = await this.tehilimModel.findOne();
      if (!tehilim) {
        // Create tehilim instance
        const newTehilim = new this.tehilimModel();
        newTehilim.round = 1;
        newTehilim.available = Array.from(Array(150), (_, i) => i + 1);
        console.log(newTehilim);
        return await newTehilim.save();
      }
      return tehilim;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Ha ocurrido un error');
    }
  }

  private async resetTehilim() {
    const tehilim = await this.tehilimModel.findOne();
    tehilim.available = Array.from(Array(150), (_, i) => i + 1);
    tehilim.round += 1;
    try {
      await tehilim.save();
      return tehilim;
    } catch (error) {
      throw new InternalServerErrorException('Ha ocurrido un error');
    }
  }

  async getInfo(): Promise<any> {
    const tehilim = await this.tehilimModel.findOne();
    const numberUsers = await this.userModel.estimatedDocumentCount();
    // Calculate tehilims readed
    const tehilimsReaded =
      (tehilim.round - 1) * 150 + (150 - tehilim.available.length);

    return {
      ok: true,
      rounds: tehilim.round - 1,
      numberUsers,
      tehilimsReaded,
    };
  }
}
