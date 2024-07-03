import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Rental } from './schemas/rental.schema';
import { User } from '../auth/schemas/user.schema';
import { CreateRentalDto } from './dto/create-rental.dto';
import { UpdateRentalDto } from './dto/update-rental.dto';

@Injectable()
export class RentalService {
  constructor(@InjectModel(Rental.name) private rentalModel: Model<Rental>) {}

  async findAll(): Promise<Rental[]> {
    return this.rentalModel.find().exec();
  }

  async create(rentalDto: CreateRentalDto, user: User): Promise<Rental> {
    const createdRental = new this.rentalModel({
      ...rentalDto,
      user: user._id,
      // rentHistory: [{ date: new Date(), user: user._id }],
      // returnHistory: [],
    });
    return createdRental.save();
  }

  async updateRent(id: string, rentalDto: UpdateRentalDto): Promise<Rental> {
    return this.rentalModel.findByIdAndUpdate(
      id,
      {
        ...rentalDto,
        rentDate: new Date().toISOString(),
        $push: { rentHistory: { date: new Date(), user: rentalDto.user } },
      },
      { new: true },
    );
  }

  async updateReturn(id: string, rentalDto: UpdateRentalDto): Promise<Rental> {
    return this.rentalModel.findByIdAndUpdate(
      id,
      {
        ...rentalDto,
        returnDate: new Date().toISOString(),
        $push: { returnHistory: { date: new Date(), user: rentalDto.user } },
      },
      { new: true },
    );
  }

  async deleteById(id: string): Promise<Rental> {
    return this.rentalModel.findByIdAndDelete(id);
  }
}
