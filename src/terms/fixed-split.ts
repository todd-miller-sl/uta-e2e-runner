import { Versus } from './versus';
import { validatePotentialAndExpenses } from './terms';

export class FixedSplit extends Versus {
  private _afterAmount: number;

  constructor(bonus: number, guarantee: number, percent: number, afterAmount: number) {
    super(bonus, guarantee, percent);
    this._afterAmount = afterAmount;
  }

  get afterAmount(): number {
    return this._afterAmount;
  }

  walkoutPotential(potential: number, expenses: number) {
    validatePotentialAndExpenses(potential, expenses, true);
    return this.guarantee + (this.percent * (potential - this.afterAmount)) / 100 + this.bonus;
  }
}
