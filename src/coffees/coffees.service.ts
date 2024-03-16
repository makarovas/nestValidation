import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';

export const coffees: Coffee[] = [
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

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
  ) {}

  async findAll(): Promise<Coffee[]> {
    return await this.coffeeRepository.find();
  }
  async findOne(id: string): Promise<Coffee> {
    const coffee = await this.coffeeRepository.findOne(id);
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} was not found`);
    }
    return coffee;
  }

  create(dto: CreateCoffeeDto): Promise<CreateCoffeeDto> | void {
    const coffee = this.coffeeRepository.create(dto);
    if (coffee) {
      return this.coffeeRepository.save(coffee);
    }
  }

  async update(id: string, dto: UpdateCoffeeDto) {
    const coffee = await this.coffeeRepository.preload({
      id,
      ...dto,
    });
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} was not find`);
    }
    return this.coffeeRepository.save(coffee);
  }

  async remove(id: string) {
    const coffee = await this.coffeeRepository.findOne(id);
    return this.coffeeRepository.remove(coffee);
  }
}
