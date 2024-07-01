import {
  Body,
  Controller,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RentalService } from './rental.service';
import { CreateRentalDto } from './dto/create-rental.dto';
import { UpdateRentalDto } from './dto/update-rental.dto';
import { Rental } from './schemas/rental.schema';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';

@ApiTags('rental')
@Controller('rental')
export class RentalController {
  constructor(private rentalService: RentalService) {}

  @Post('create')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'Create a book rental', type: Rental })
  async createBook(@Body() rental: CreateRentalDto, @Req() req): Promise<Rental> {
    return this.rentalService.create(rental, req.user);
  }

  @Put('update:id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Update a book rental', type: Rental })
  async updateBook(
    @Param('id') id: string,
    @Body() rental: UpdateRentalDto,
  ): Promise<Rental> {
    return this.rentalService.updateById(id, rental);
  }
}
