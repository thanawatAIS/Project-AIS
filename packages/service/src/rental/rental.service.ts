import {
    Injectable,
  } from '@nestjs/common';
  import { InjectModel } from '@nestjs/mongoose';
  import * as mongoose from 'mongoose';
  import { Query } from 'express-serve-static-core';
  import { Rental } from './schemas/rental.schema';
  import { User } from '../auth/schemas/user.schema';

@Injectable()
export class RentalService {
    constructor(
        @InjectModel(Rental.name)
        private rentalModel: mongoose.Model<Rental>,
      ) {}

      async findAll(query: Query): Promise<Rental[]> {
        const resPerPage = 999999;
        const currentPage = Number(query.page) || 1;
        const skip = resPerPage * (currentPage - 1);
        const rental = await this.rentalModel.find().skip(skip).limit(resPerPage).exec();
        return rental;
      }

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
