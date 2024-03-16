import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
  private coffees: Coffee[] = [
    { id: '1', name: 'coca', brand: 'cola' },
    { id: '2', name: 'rabusta', brand: 'poland', flavors: ['orange', 'red'] },
    {
      id: '3',
      name: 'latte',
      brand: 'motherRussia',
      flavors: ['orange', 'red'],
    },
    {
      id: '4',
      name: 'latte',
      brand: 'motherRussia1',
      flavors: ['orange', 'red'],
    },
  ];
  findAll(): Coffee[] {
    return this.coffees;
  }
  findOne(id: string): Coffee {
    const coffee = this.coffees.find((coffee) => coffee.id === id);
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} was not found`);
    }
    return coffee;
  }

  create(dto: CreateCoffeeDto): void {
    const { id, name, brand } = dto;
    const ifExist = this.findOne(id);

    if (!ifExist) {
      this.coffees.push({ id, name, brand });
    }
  }
  remove(id: string): void {
    const indexToDelete = this.coffees.findIndex((item) => {
      return item.id === id;
    });
    if (indexToDelete !== -1) {
      this.coffees.splice(indexToDelete, 1);
    }
  }
}
