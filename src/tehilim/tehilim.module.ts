import { Module } from '@nestjs/common';
import { TehilimController } from './tehilim.controller';
import { TehilimService } from './tehilim.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';
import { TehilimSchema, Tehilim } from 'src/schemas/tehilim.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Tehilim.name, schema: TehilimSchema },
    ]),
  ],
  controllers: [TehilimController],
  providers: [TehilimService],
})
export class TehilimModule {}
