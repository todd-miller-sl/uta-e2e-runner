import { Flat } from './flat';
import { validatePotentialAndExpenses } from './terms';

export class PlusBackend extends Flat {
  percent: number;
  buyerProfit: number;

  constructor(bonus: number, guarantee: number, percent: number, buyerProfit: number) {
    super(bonus, guarantee);
    this.percent = percent;
    this.buyerProfit = buyerProfit;
  }

  walkoutPotential(potential: number, expenses: number) {
    validatePotentialAndExpenses(potential, expenses);
    const splitPoint = expenses * (1 + this.buyerProfit / 100);
    if (potential < splitPoint) throw new Error('Potential should be greater than the expenses plus buyer profit');
    return this.guarantee + (this.percent * (potential - splitPoint)) / 100 + this.bonus;
  }
}