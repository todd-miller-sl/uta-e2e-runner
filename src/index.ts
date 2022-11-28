import { Tax } from './types';

/**
 * This calculates the tax amount for each ticket in a ticket tier.
 * @param {Tax} tax  // Tax object
 * @param {number} totalFees // sum of all fees on ticket.
 * @param {number} sumGrossPotential // ticket.avail * (Math.max(ticket.advance, ticket.dayOfShow)
 * @returns number
 */
export const calculateTax = (tax: Tax, totalFees: number, sumGrossPotential: number) => {
  const ratio = Number(tax.percent) / 100;
  const factor = tax.type === 'Multiplier' ? ratio : ratio / (1 + ratio);
  const adjustedGross = tax.beforeFee ? sumGrossPotential : sumGrossPotential - totalFees;
  return adjustedGross * factor;
};
