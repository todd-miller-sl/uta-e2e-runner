import { Terms, validatePotentialAndExpenses } from './terms';

export class DoorDeal extends Terms {
  percent: number;
  afterAmount: number;

  constructor(bonus: number, percent: number, afterAmount: number) {
    super(bonus);
    this.percent = percent;
    this.afterAmount = afterAmount;
  }

  get breakEven(): number {
    return 0;
  }

  get guarantee(): number {
    return 0;
  }

  walkout(potential: number, expenses: number) {
    return (this.percent * (potential - expenses)) / 100;
  }

  walkoutPotential(potential: number, expenses: number) {
    validatePotentialAndExpenses(potential, expenses);
    return this.walkout(potential, expenses) + this.bonus;
  }
}
