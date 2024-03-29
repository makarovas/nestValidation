import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
  ) {}

  async findAll(): Promise<Coffee[]> {
    return await this.coffeeRepository.find();
  }
  async findOne(id: number): Promise<Coffee> {
    const coffee = await this.coffeeRepository.findOne({ where: { id } });
    console.log('id', id);
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

  async update(id: number, dto: UpdateCoffeeDto) {
    const coffee = await this.coffeeRepository.preload({
      id: +id,
      ...dto,
    });
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} was not find`);
    }
    return this.coffeeRepository.save(coffee);
  }

  async remove(id: number) {
    const coffee = await this.coffeeRepository.findOne({ where: { id } });
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} was not find`);
    }
    if (coffee) {
      return this.coffeeRepository.remove(coffee);
    }
  }
}
