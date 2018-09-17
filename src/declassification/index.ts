import { parse } from 'date-fns';
import { IDeclassification, IDeclassificationConstruct } from './interface';
import { DeclassificationRule } from './rule';
import { IDeclassificationOffset, IDeclassificationRule } from './rule/interface';

const RULE_REGISTRY: IDeclassificationRule[] = [];

function findRule(name: string): number {
  for (let iRule = 0; iRule < RULE_REGISTRY.length; ++iRule) {
    if (RULE_REGISTRY[iRule].id === name) {
      return iRule;
    }
  }
  return -1;
}

function exemptionToRuleId(exemption: string): number {
  const ruleIndex = findRule(exemption);
  if (-1 === ruleIndex || isNaN(ruleIndex)) {
    throw new Error(`Declassification rule "${exemption}" not found`);
  }
  return ruleIndex;
}

function rulesToIds(exemptions: string[]): number[] {
  return exemptions
    .map(exemptionToRuleId)
    // Sort the rule indexes into the order they appear in the registry
    .sort((aIndex: number, bIndex: number) => {
      switch (true) {
        case (aIndex > bIndex): return 1;
        case (aIndex < bIndex): return -1;
        default: return 0;
      }
    });
}

function idsToRules(ruleIds: number[]): string[] {
  return ruleIds.map((ruleId: number) => RULE_REGISTRY[ruleId].id);
}

function findMaxRuleIndex(exemptions: string[]): number {
  // Find the first rule with the biggest offset
  return rulesToIds(exemptions).reduce((current: number, ruleId: number) => {
    if (-1 === current) {
      return ruleId;
    }

    if (1 === DeclassificationRule.compare(RULE_REGISTRY[ruleId], RULE_REGISTRY[current])) {
      return ruleId;
    }
    return current;
  }, -1);
}

function deduplicate<T>(exemptions: T[]): T[] {
  const result: T[] = [];

  exemptions.forEach((exemption: T) => {
    if (!result.includes(exemption)) {
      result.push(exemption);
    }
  });

  return result;
}

export class Declassification implements IDeclassification {
  public static defaultOffset: IDeclassificationOffset = { years: 10 };
  public static addRule(name: string, offset: IDeclassificationOffset): void {
    for (let iRule = 0; iRule < RULE_REGISTRY.length; ++iRule) {
      if (RULE_REGISTRY[iRule].id === name) {
        RULE_REGISTRY.splice(iRule--, 1);
      }
    }

    RULE_REGISTRY.push(new DeclassificationRule(name, offset));
  }

  private readonly mExemptions: string[] = [];
  private mDate: Date = new Date();
  private mDeclassifyOn: Date | null = null;

  constructor({
    created = new Date(),
    date = null,
    exemptions = [],
  }: IDeclassificationConstruct = {}) {
    this.setClassificationDate(created);
    this.setDate(date);
    for (const exemption of exemptions) {
      this.addExemption(exemption);
    }
  }

  public toJSON(): IDeclassificationConstruct {
    return ({
      created: parse(this.mDate),
      date: this.mDeclassifyOn,
      exemptions: this.getExemptionList(),
    });
  }

  public getExemptionList(): string[] {
    return idsToRules(deduplicate<number>(rulesToIds(this.mExemptions)));
  }

  public getExemption(): null | string {
    const ruleId = findMaxRuleIndex(this.mExemptions);

    if (-1 === ruleId) {
      return null;
    }

    const date = this.getDate();
    const declassifyOn = this.mDeclassifyOn;
    if (date && declassifyOn && date.getTime() === declassifyOn.getTime()) {
      return null;
    }

    const rule = RULE_REGISTRY[ruleId];
    return rule.deprecated ? null : RULE_REGISTRY[ruleId].id;
  }

  public getClassificationDate(): Date {
    return this.mDate;
  }

  public setClassificationDate(date: Date | string | number): void {
    this.mDate = parse(date);
  }

  public setDate(date: Date | string | number | null): void {
    this.mDeclassifyOn = date ? parse(date) || null : null;
  }

  public getDate(): null | Date {
    const ruleId = findMaxRuleIndex(this.mExemptions);
    const rule = (-1 === ruleId)
      ? new DeclassificationRule('', Declassification.defaultOffset)
      : RULE_REGISTRY[ruleId];

    const ruleDate = rule.apply(this.mDate);

    if (this.mDeclassifyOn) {
      const declassifyOn = new Date(this.mDeclassifyOn);
      if (declassifyOn.getTime() > ruleDate.getTime()) {
        return declassifyOn;
      }
    }
    return ruleDate;
  }

  public getRawDate(): null | Date {
    if (this.mDeclassifyOn) {
      return parse(this.mDeclassifyOn);
    }
    return null;
  }

  public addExemption(name: string): void {
    this.mExemptions.push(`${name}`.toUpperCase());
  }
}

Declassification.addRule('25X1', { years: 50 });
Declassification.addRule('25X2', { years: 50 });
Declassification.addRule('25X3', { years: 50 });
Declassification.addRule('25X4', { years: 50 });
Declassification.addRule('25X5', { years: 50 });
Declassification.addRule('25X6', { years: 50 });
Declassification.addRule('25X7', { years: 50 });
Declassification.addRule('25X8', { years: 50 });
Declassification.addRule('25X9', { years: 50 });

Declassification.addRule('50X1-HUM', { years: 75 });
Declassification.addRule('50X2-WMD', { years: 75 });
Declassification.addRule('50X1', { years: 75 });
Declassification.addRule('50X2', { years: 75 });
Declassification.addRule('50X3', { years: 75 });
Declassification.addRule('50X4', { years: 75 });
Declassification.addRule('50X5', { years: 75 });
Declassification.addRule('50X6', { years: 75 });
Declassification.addRule('50X7', { years: 75 });
Declassification.addRule('50X8', { years: 75 });
Declassification.addRule('50X9', { years: 75 });

Declassification.addRule('75X1', { years: 100 });
Declassification.addRule('75X2', { years: 100 });
Declassification.addRule('75X3', { years: 100 });
Declassification.addRule('75X4', { years: 100 });
Declassification.addRule('75X5', { years: 100 });
Declassification.addRule('75X6', { years: 100 });
Declassification.addRule('75X7', { years: 100 });
Declassification.addRule('75X8', { years: 100 });
Declassification.addRule('75X9', { years: 100 });

Declassification.addRule('X1', { deprecated: true, years: 25 });
Declassification.addRule('X2', { deprecated: true, years: 25 });
Declassification.addRule('X3', { deprecated: true, years: 25 });
Declassification.addRule('X4', { deprecated: true, years: 25 });
Declassification.addRule('X5', { deprecated: true, years: 25 });
Declassification.addRule('X6', { deprecated: true, years: 25 });
Declassification.addRule('X7', { deprecated: true, years: 25 });
Declassification.addRule('X8', { deprecated: true, years: 25 });
