import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Rental } from './schemas/rental.schema';
import { User } from '../auth/schemas/user.schema';
import { CreateRentalDto } from './dto/create-rental.dto';
import { UpdateRentalDto } from './dto/update-rental.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class RentalService {
  constructor(@InjectModel(Rental.name) private rentalModel: Model<Rental>) {}

  async findAll(): Promise<Rental[]> {
    return this.rentalModel.find().exec();
  }

  async create(rentalDto: CreateRentalDto): Promise<Rental> {
    const createdRental = new this.rentalModel(rentalDto);
    return createdRental.save();
  }

  async findById(id: string): Promise<Rental> {
    const rental = await this.rentalModel.findById(id).exec();
    if (!rental) {
      throw new NotFoundException(`Rental with ID ${id} not found`);
    }
    return rental;
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
