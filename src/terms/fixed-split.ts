import { Flat } from './flat';
import { validatePotentialAndExpenses } from './terms';

export class FixedSplit extends Flat {
  percent: number;
  afterAmount: number;

  constructor(bonus: number, guarantee: number, percent: number, afterAmount: number) {
    super(bonus, guarantee);
    this.percent = percent;
    this.afterAmount = afterAmount;
  }

  walkoutPotential(potential: number, expenses: number) {
    validatePotentialAndExpenses(potential, expenses, true);
    return this.guarantee + (this.percent * (potential - this.afterAmount)) / 100 + this.bonus;
  }
}