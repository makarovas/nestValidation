export class CreateCoffeeDto {
  readonly id: string;
  readonly name: string;
  readonly brand: string;
  readonly flavors?: string[];
}
