import { calculateTax } from '../index';

describe('Calculate Taxes Tests', () => {
  it('Calculates taxes with a before fee with type of Multiplier', () => {
    expect(calculateTax(10, 'Multiplier', true, 100, 5000)).toEqual(500);
  });
  it('Calculates taxes without a before fee with type of Multiplier', () => {
    expect(calculateTax(10, 'Multiplier', false, 100, 5000)).toEqual(490);
  });
  it('Calculates taxes with a before fee with type of Divider', () => {
    expect(calculateTax(10, 'Divider', true, 100, 5000)).toBeCloseTo(454.54, 1);
  });
  it('Calculates taxes without a before fee with type of Divider', () => {
    expect(calculateTax(10, 'Divider', false, 100, 5000)).toBeCloseTo(445.45, 1);
  });
});
