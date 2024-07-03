import {
  Body,
  Controller,
  Param,
  Get,
  Post,
  Put,
  Req,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { RentalService } from './rental.service';
import { CreateRentalDto } from './dto/create-rental.dto';
import { UpdateRentalDto } from './dto/update-rental.dto';
import { Rental } from './schemas/rental.schema';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { Role } from 'src/auth/roles/roles.enum';

@ApiTags('rental')
@Controller('rental')
export class RentalController {
  constructor(private rentalService: RentalService) {}

  @Get('all')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Admin)
  @ApiResponse({
    status: 200,
    description: 'Get all rentals',
    type: [Rental],
  })
  async getAllRentals(): Promise<Rental[]> {
    return this.rentalService.findAll();
  }

  @Post('create')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'Create a rental',
    type: Rental,
  })
  async createRental(
    @Body() rental: CreateRentalDto,
    @Req() req,
  ): Promise<Rental> {
    return this.rentalService.create(rental, req.user);
  }

  @Put('rent/:id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Update rent details',
    type: Rental,
  })
  async updateRent(
    @Param('id') id: string,
    @Body() rental: UpdateRentalDto,
  ): Promise<Rental> {
    return this.rentalService.updateRent(id, rental);
  }

  @Put('return/:id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Update return details',
    type: Rental,
  })
  async updateReturn(
    @Param('id') id: string,
    @Body() rental: UpdateRentalDto,
  ): Promise<Rental> {
    return this.rentalService.updateReturn(id, rental);
  }

  @Delete('delete/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Admin)
  @ApiResponse({ status: 200, description: 'Delete a rental' })
  async deleteRental(@Param('id') id: string): Promise<Rental> {
    return this.rentalService.deleteById(id);
  }
}
