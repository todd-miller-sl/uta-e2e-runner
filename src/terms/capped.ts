import { DoorDeal } from './door-deal';
import { validatePotentialAndExpenses } from './terms';

export class Capped extends DoorDeal {
  cap: number;

  constructor(bonus: number, percent: number, afterAmount: number, cap: number) {
    super(bonus, percent, afterAmount);
    this.cap = cap;
  }

  walkoutPotential(potential: number, expenses: number) {
    validatePotentialAndExpenses(potential, expenses);
    const walkout = this.walkout(potential, expenses);
    return (walkout > this.cap ? this.cap : walkout) + this.bonus;
  }
}
