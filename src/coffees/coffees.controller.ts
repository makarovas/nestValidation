import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { Coffee } from './entities/coffee.entity';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeeService: CoffeesService) {}
  @Get()
  findAll(@Query() paginationQuery) {
    const { limit, offset } = paginationQuery;
    console.log(limit, offset);
    return this.coffeeService.findAll();
  }

  @Get(':id')
  findOne(@Param() params): Coffee {
    return this.coffeeService.findOne(params.id);
  }

  @Post(':id')
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    return this.coffeeService.create(createCoffeeDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body): Response {
    console.log(id, body);
    return body;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coffeeService.remove(id);
  }
}
