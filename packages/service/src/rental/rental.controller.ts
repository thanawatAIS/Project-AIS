import {
  Body,
  Controller,
  Param,
  Get,
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
    description: 'Get all books available to rent',
    type: [Rental],
  })
  async getAllBooksWithoutFilters(): Promise<Rental[]> {
    return this.rentalService.findAll({});
  }

  @Post('create')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'Create a book rental', type: Rental })
  async createRental(@Body() rental: CreateRentalDto, @Req() req): Promise<Rental> {
    return this.rentalService.create(rental, req.user);
  }

  @Put('rent:id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Update a book rental date', type: Rental })
  async rentDate(
    @Param('id') id: string,
    @Body() rental: UpdateRentalDto,
  ): Promise<Rental> {
    return this.rentalService.updateById(id, rental);
  }

  @Put('return:id')
    @UseGuards(AuthGuard())
    @ApiBearerAuth()
    @ApiResponse({ status: 200, description: 'Update a book return date', type: Rental })
    async returnDate(
      @Param('id') id: string,
      @Body() rental: UpdateRentalDto,
    ): Promise<Rental> {
      return this.rentalService.updateById(id, rental);
    }
}
