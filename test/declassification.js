import test from 'ava';
import { DeclassificationRule } from '../src/declassification/rule';
import { Classification } from '../src/main';

test('Declassification rules with higher years should be prioritized', (t) => {
  const aRule = new DeclassificationRule('foo', { years: 5 });
  const bRule = new DeclassificationRule('bar', { years: 10 });

  t.is(DeclassificationRule.compare(aRule, bRule), -1);
  t.is(DeclassificationRule.compare(bRule, aRule), 1);
});
test('Declassification rules which are deprecated should be deprioritized when years are the same', (t) => {
  const aRule = new DeclassificationRule('foo', { deprecated: true });
  const bRule = new DeclassificationRule('bar', { deprecated: false });

  t.is(DeclassificationRule.compare(aRule, bRule), 1);
  t.is(DeclassificationRule.compare(bRule, aRule), -1);
});
test('Declassification rules should not prioritize either when they are equal', (t) => {
  const aRule = new DeclassificationRule('foo');
  const bRule = new DeclassificationRule('bar');

  t.is(DeclassificationRule.compare(aRule, bRule), 0);
  t.is(DeclassificationRule.compare(bRule, aRule), 0);
});
test('Declassification rules may be added through an interface', (t) => {
  Classification.addDeclassificationRule('IMM', { years: 0 });
  const classification = new Classification();

  classification.addDeclassificationExemption('IMM');

  const today = new Date();

  t.is(classification.getDeclassificationDate().getFullYear(), today.getFullYear());
});
