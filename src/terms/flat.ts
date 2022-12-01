import { Terms } from './terms';

export class Flat extends Terms {
  guarantee: number;

  constructor(bonus: number, guarantee: number) {
    super(bonus);
    this.guarantee = guarantee;
  }

  get afterAmount(): number {
    return 0;
  }

  get breakEven(): number {
    return this.guarantee;
  }

  walkoutPotential(potential: number, expenses: number) {
    return this.guarantee + this.bonus;
  }
}
