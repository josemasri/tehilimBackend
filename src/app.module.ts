import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { ServeStaticModule } from '@nestjs/serve-static'
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
import { TehilimModule } from './tehilim/tehilim.module';
import { join } from 'path';

dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
      autoIndex: true,
    }),
    MailerModule.forRoot({
      transport: `smtps://${process.env.MAILER_EMAIL}:${process.env.MAILER_PASS}@smtp.gmail.com`,
      defaults: {
        from: `"Maraton de Tehilim" <${process.env.MAILER_EMAIL}>`,
      },
      template: {
        dir: __dirname + '/../templates',
        adapter: new PugAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    TehilimModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
