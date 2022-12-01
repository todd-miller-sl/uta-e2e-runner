export class Terms {
  bonus: number;

  constructor(bonus: number) {
    this.bonus = bonus;
  }
}

/**
 * Common method to validate the combination of potential and expenses for different term types.
 * @param {number} potential - The potential revenue.
 * @param {number} expenses - The expenses expected.
 * @param {boolean} ignoreLessThanZero - Ignore negative potential and expenses for this validation.
 * Raises: Error: if the potential and expenses combination is invalid.
 */
export const validatePotentialAndExpenses = (
  potential: number,
  expenses: number,
  ignoreLessThanZero: boolean = false
) => {
  if ((potential < 0 || expenses < 0) && !ignoreLessThanZero) {
    throw new Error(
      `Potential (${potential}) and expenses (${expenses}) must be greater than or equal to 0`
    );
  }
  if (potential < expenses)
    throw new Error(`Potential (${potential}) should be greater than expenses (${expenses})`);
};
