import { Terms } from './terms';

export class Flat extends Terms {
  guarantee: number;
  static afterAmount = 0;

  constructor(bonus: number, guarantee: number) {
    super(bonus);
    this.guarantee = guarantee;
  }

  get breakEven(): number {
    return this.guarantee;
  }

  walkoutPotential(potential: number, expenses: number) {
    return this.guarantee + this.bonus;
  }
}