import { addYears } from 'date-fns';
import { IDeclassificationOffset, IDeclassificationRule } from './interface';

export class DeclassificationRule implements IDeclassificationRule {
  public static compare(aRule: IDeclassificationRule, bRule: IDeclassificationRule): number {
    const LEFT = 1;
    const RIGHT = -1;
    const EQUAL = 0;

    if (Number(aRule.offset.years) > Number(bRule.offset.years)) {
      return LEFT;
    }
    if (Number(aRule.offset.years) < Number(bRule.offset.years)) {
      return RIGHT;
    }
    if (aRule.deprecated > bRule.deprecated) {
      return LEFT;
    }
    if (aRule.deprecated < bRule.deprecated) {
      return RIGHT;
    }
    return EQUAL;
  }

  public id: string = '';
  public offset: IDeclassificationOffset = {};

  public get deprecated(): boolean {
    return Boolean(this.offset.deprecated);
  }

  constructor(id: string, { deprecated = false, years = 0 }: IDeclassificationOffset) {
    this.id = id;
    this.offset = { deprecated, years };
  }

  public apply(date: Date): Date {
    const { years }: IDeclassificationOffset = this.offset;

    let result: Date = date;

    if (years) {
      result = addYears(result, years);
    }

    return result;
  }
}
