import { IsString } from 'class-validator';

export class CreateCoffeeDto {
  readonly id: number;
  @IsString()
  readonly name: string;
  @IsString()
  readonly brand: string;
  @IsString({ each: true })
  readonly flavors?: string[];
}
