import { calculateTax } from '../index';

describe('Calculate Taxes Tests', () => {
  it('Calculates taxes with a before fee with type of Multiplier', () => {
    const tax = {
      percent: 10,
      beforeFee: true,
      type: 'Multiplier',
    };

    expect(calculateTax(tax, 100, 5000)).toEqual(500);
  });
  it('Calculates taxes without a before fee with type of Multiplier', () => {
    const tax = {
      percent: 10,
      beforeFee: false,
      type: 'Multiplier',
    };

    expect(calculateTax(tax, 100, 5000)).toEqual(490);
  });
  it('Calculates taxes with a before fee with type of Divider', () => {
    const tax = {
      percent: 10,
      beforeFee: true,
      type: 'Divider',
    };

    expect(calculateTax(tax, 100, 5000)).toBeCloseTo(454.54, 1);
  });
  it('Calculates taxes without a before fee with type of Divider', () => {
    const tax = {
      percent: 10,
      beforeFee: false,
      type: 'Divider',
    };

    expect(calculateTax(tax, 100, 5000)).toBeCloseTo(445.45, 1);
  });
});
