import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { RentalController } from './rental.controller';
import { RentalService } from './rental.service';
import { RentalSchema } from './schemas/rental.schema';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'Rental', schema: RentalSchema }]),
  ],
  controllers: [RentalController],
  providers: [RentalService],
})
export class RentalModule {}
