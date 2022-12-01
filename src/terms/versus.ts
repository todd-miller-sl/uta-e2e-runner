import { Flat } from './flat';
import { validatePotentialAndExpenses } from './terms';

export class Versus extends Flat {
  percent: number;

  constructor(bonus: number, guarantee: number, percent: number) {
    super(bonus, guarantee);
    this.percent = percent;
  }

  walkoutPotential(potential: number, expenses: number) {
    validatePotentialAndExpenses(potential, expenses);
    return Math.max(this.guarantee, (this.percent * (potential - expenses)) / 100) + this.bonus;
  }
}
