import {
    Injectable,
  } from '@nestjs/common';
  import { InjectModel } from '@nestjs/mongoose';
  import * as mongoose from 'mongoose';
  import { Rental } from './schemas/rental.schema';
  import { User } from '../auth/schemas/user.schema';

@Injectable()
export class RentalService {
    constructor(
        @InjectModel(Rental.name)
        private rentalModel: mongoose.Model<Rental>,
      ) {}

      async create(rental: Rental, user: User): Promise<Rental> {
        const data = Object.assign(rental, { user: user._id });
        const res = await this.rentalModel.create(data);
        return res;
      }

      async updateById(id: string, rental: Rental): Promise<Rental> {
        return await this.rentalModel.findByIdAndUpdate(id, rental, {
          new: true,
          runValidators: true,
        });
      }
}
