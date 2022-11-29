/**
 * This calculates the tax amount for each ticket in a ticket tier.
 * @param {number} percent // tax percent
 * @param {string} type // tax type i.e. 'Multiplier', 'Divider'
 * @param {boolean} beforeFee // gross sum includes total fees.
 * @param {number} totalFees // sum of all fees on ticket.
 * @param {number} sumGrossPotential // ticket.avail * (Math.max(ticket.advance, ticket.dayOfShow)
 * @returns number
 */
export const calculateTax = (percent: number, type: string, beforeFee: boolean , totalFees: number, sumGrossPotential: number) => {
  const ratio = Number(percent) / 100;
  const factor = type === 'Multiplier' ? ratio : ratio / (1 + ratio);
  const adjustedGross = beforeFee ? sumGrossPotential : sumGrossPotential - totalFees;
  return adjustedGross * factor;
};
