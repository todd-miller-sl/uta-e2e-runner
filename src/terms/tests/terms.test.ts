import { Flat } from '../flat';
import { DoorDeal } from '../door-deal';
import { Capped } from '../capped';
import { PlusBackend } from '../plus-backend';
import { FixedSplit } from '../fixed-split';
import { Versus } from '../versus';

describe('Terms', () => {
  describe('Flat Terms', () => {
    it('should calculate break even value', () => {
      const flat = new Flat(0, 1000);

      expect(flat.breakEven).toBe(flat.guarantee);
    });

    it('should calculate walkout potential with negative expenses', () => {
      const flat = new Flat(0, 1000);

      expect(flat.walkoutPotential(10000, -1)).toBe(flat.guarantee + flat.bonus);
    });

    it('should calculate walkout potential with no expenses', () => {
      const flat = new Flat(0, 1000);

      expect(flat.walkoutPotential(10000, 0)).toBe(flat.guarantee + flat.bonus);
    });

    it('should calculate walkout potential with less expenses than potential', () => {
      const flat = new Flat(0, 1000);

      expect(flat.walkoutPotential(10000, 5000)).toBe(flat.guarantee + flat.bonus);
    });

    it('should calculate walkout potential with more expenses than potential', () => {
      const flat = new Flat(0, 1000);

      expect(flat.walkoutPotential(10000, 20000)).toBe(flat.guarantee + flat.bonus);
    });
  });

  describe('Door Deal Terms', () => {
    it('should calculate break even value', () => {
      const doordeal = new DoorDeal(0, 10, 245);

      expect(doordeal.breakEven).toBe(0);
    });

    it('should imply a guarantee', () => {
      // guarantee is not defined for door deal but implictly this is 0
      const doordeal = new DoorDeal(0, 10, 245);

      expect(doordeal.guarantee).toBe(0);
    });

    it('should not calculate walkout potential with negative expenses', () => {
      const doordeal = new DoorDeal(0, 10, 245);

      expect(() => doordeal.walkoutPotential(10000, -1)).toThrow(
        'Potential (10000) and expenses (-1) must be greater than or equal to 0'
      );
    });

    it('should calculate walkout potential with no expenses', () => {
      const doordeal = new DoorDeal(0, 10, 245);

      // without bonus
      expect(doordeal.walkoutPotential(10000, 0)).toBe(1000);

      // with bonus
      doordeal.bonus = 100;
      expect(doordeal.walkoutPotential(10000, 0)).toBe(1100);
    });

    it('should calculate walkout potential with less expenses than potential', () => {
      const doordeal = new DoorDeal(0, 10, 245);

      // without bonus
      expect(doordeal.walkoutPotential(10000, 5000)).toBe(500);

      // with bonus
      doordeal.bonus = 100;
      expect(doordeal.walkoutPotential(10000, 5000)).toBe(600);
    });

    it('should not calculate walkout potential with more expenses than potential', () => {
      const doordeal = new DoorDeal(0, 10, 245);

      expect(() => doordeal.walkoutPotential(10000, 20000)).toThrow(
        'Potential (10000) should be greater than expenses (20000)'
      );
    });
  });

  describe('Capped Door Deal Terms', () => {
    it('should calculate break even value', () => {
      const capped = new Capped(0, 10, 245, 10000);

      expect(capped.breakEven).toBe(0);
    });

    it('should imply a guarantee', () => {
      // guarantee is not defined for capped but implictly this is 0
      const capped = new Capped(0, 10, 245, 10000);

      expect(capped.guarantee).toBe(0);
    });

    it('should not calculate walkout potential with negative expenses', () => {
      const capped = new Capped(0, 10, 245, 10000);

      expect(() => capped.walkoutPotential(10000, -1)).toThrow(
        'Potential (10000) and expenses (-1) must be greater than or equal to 0'
      );
    });

    it('should calculate walkout potential with no expenses', () => {
      const capped = new Capped(0, 10, 245, 10000);

      // without bonus
      expect(capped.walkoutPotential(10000, 0)).toBe(1000);

      // with bonus
      capped.bonus = 100;
      expect(capped.walkoutPotential(10000, 0)).toBe(1100);
    });

    it('should calculate walkout potential with less expenses than potential', () => {
      const capped = new Capped(0, 10, 245, 10000);

      // without bonus
      expect(capped.walkoutPotential(10000, 5000)).toBe(500);

      // with bonus
      capped.bonus = 100;
      expect(capped.walkoutPotential(10000, 5000)).toBe(600);
    });

    it('should not calculate walkout potential with more expenses than potential', () => {
      const capped = new Capped(0, 10, 245, 10000);

      expect(() => capped.walkoutPotential(10000, 20000)).toThrow(
        'Potential (10000) should be greater than expenses (20000)'
      );
    });

    it('should calculate walkout potential with a cap limit', () => {
      const capped = new Capped(0, 10, 245, 100);

      // without bonus
      expect(capped.walkoutPotential(10000, 0)).toBe(100);

      // with bonus
      capped.bonus = 100;
      expect(capped.walkoutPotential(10000, 0)).toBe(200);
    });
  });

  describe('Plus Backend', () => {
    it('should calculate break even value', () => {
      const plusBackend = new PlusBackend(0, 1000, 10, 25);

      expect(plusBackend.breakEven).toBe(plusBackend.guarantee);
    });

    it('should not calculate walkout potential with negative expenses', () => {
      const plusBackend = new PlusBackend(0, 1000, 10, 25);

      expect(() => plusBackend.walkoutPotential(10000, -1)).toThrow(
        'Potential (10000) and expenses (-1) must be greater than or equal to 0'
      );
    });

    it('should calculate walkout potential with no expenses', () => {
      const plusBackend = new PlusBackend(0, 1000, 10, 25);

      // without bonus
      expect(plusBackend.walkoutPotential(10000, 0)).toBe(2000);

      // with bonus
      plusBackend.bonus = 100;
      expect(plusBackend.walkoutPotential(10000, 0)).toBe(2100);
    });

    it('should calculate walkout potential with less expenses than potential', () => {
      const plusBackend = new PlusBackend(0, 1000, 10, 25);

      // without bonus
      expect(plusBackend.walkoutPotential(10000, 5000)).toBe(1375);

      // with bonus
      plusBackend.bonus = 100;
      expect(plusBackend.walkoutPotential(10000, 5000)).toBe(1475);
    });

    it('should not calculate walkout potential with more buyer profit than potential', () => {
      const plusBackend = new PlusBackend(0, 1000, 10, 50);

      // without bonus
      expect(() => plusBackend.walkoutPotential(10000, 9000)).toThrow(
        'Potential should be greater than the expenses plus buyer profit'
      );
    });

    it('should not calculate walkout potential with more expenses than potential', () => {
      const plusBackend = new PlusBackend(0, 1000, 10, 25);

      expect(() => plusBackend.walkoutPotential(10000, 20000)).toThrow(
        'Potential (10000) should be greater than expenses (20000)'
      );
    });
  });

  describe('Fixed Split Terms', () => {
    it('should calculate break even value', () => {
      const fixedSplit = new FixedSplit(0, 1000, 10, 25);

      expect(fixedSplit.breakEven).toBe(fixedSplit.guarantee);
    });

    it('should calculate walkout potential with negative expenses', () => {
      const fixedSplit = new FixedSplit(0, 1000, 10, 25);

      // without bonus
      expect(fixedSplit.walkoutPotential(10000, -1)).toBe(1997.5);

      // with bonus
      fixedSplit.bonus = 100;
      expect(fixedSplit.walkoutPotential(10000, -1)).toBe(2097.5);
    });

    it('should calculate walkout potential with no expenses', () => {
      const fixedSplit = new FixedSplit(0, 1000, 10, 25);

      // without bonus
      expect(fixedSplit.walkoutPotential(10000, 0)).toBe(1997.5);

      // with bonus
      fixedSplit.bonus = 100;
      expect(fixedSplit.walkoutPotential(10000, 0)).toBe(2097.5);
    });

    it('should calculate walkout potential with less expenses than potential', () => {
      const fixedSplit = new FixedSplit(0, 1000, 10, 25);

      // without bonus
      expect(fixedSplit.walkoutPotential(10000, 5000)).toBe(1997.5);

      // with bonus
      fixedSplit.bonus = 100;
      expect(fixedSplit.walkoutPotential(10000, 5000)).toBe(2097.5);
    });

    it('should not calculate walkout potential with more expenses than potential', () => {
      const fixedSplit = new FixedSplit(0, 1000, 10, 25);

      expect(() => fixedSplit.walkoutPotential(10000, 20000)).toThrow(
        'Potential (10000) should be greater than expenses (20000)'
      );
    });
  });

  describe('Versus Terms', () => {
    it('should calculate break even value', () => {
      const versusGross = new Versus(0, 1000, 10);

      expect(versusGross.breakEven).toBe(versusGross.guarantee);
    });

    it('should not calculate walkout potential with negative expenses', () => {
      const versusGross = new Versus(0, 1000, 10);

      expect(() => versusGross.walkoutPotential(10000, -1)).toThrow(
        'Potential (10000) and expenses (-1) must be greater than or equal to 0'
      );
    });

    it('should calculate walkout potential with no expenses', () => {
      const versusGross = new Versus(0, 1000, 10);

      // without bonus
      expect(versusGross.walkoutPotential(10000, 0)).toBe(1000);

      // with bonus
      versusGross.bonus = 100;
      expect(versusGross.walkoutPotential(10000, 0)).toBe(1100);
    });

    it('should calculate walkout potential with less expenses than potential', () => {
      const versusGross = new Versus(0, 1000, 10);

      // without bonus
      expect(versusGross.walkoutPotential(10000, 5000)).toBe(1000);

      // with bonus
      versusGross.bonus = 100;
      expect(versusGross.walkoutPotential(10000, 5000)).toBe(1100);

      // under cap
      versusGross.guarantee = 100;
      expect(versusGross.walkoutPotential(10000, 5000)).toBe(600);
    });

    it('should not calculate walkout potential with more expenses than potential', () => {
      const versusGross = new Versus(0, 1000, 10);

      expect(() => versusGross.walkoutPotential(10000, 20000)).toThrow(
        'Potential (10000) should be greater than expenses (20000)'
      );
    });
  });
});
