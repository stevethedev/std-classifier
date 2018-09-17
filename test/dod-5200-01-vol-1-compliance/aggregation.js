import { Classification, ClassificationCollection } from '../../src/main';
import test from 'ava';

test('Derivative classifications should combine the declassification exemptions', (t) => {
  const cc = new ClassificationCollection();

  cc.add(new Classification({ declassification: { exemptions: ['25X3'] } }));
  cc.add(new Classification({ declassification: { exemptions: ['25X1'] } }));
  cc.add(new Classification({ declassification: { exemptions: ['25X2'] } }));

  const classification = cc.reduce();

  t.is(classification.getDeclassificationExemption(), '25X1');
});
test('Derivative classifications should use the biggest declassification date', (t) => {
  const cc = new ClassificationCollection();

  cc.add(new Classification({ declassification: { date: '20000101' } }));
  cc.add(new Classification({ declassification: { date: '20100101' } }));
  cc.add(new Classification({ declassification: { date: '20050101' } }));

  const classification = cc.reduce();

  t.is(classification.getDeclassificationRawDate().getFullYear(), 2010);
});
test('Derivative classifications should use the biggest classification date', (t) => {
  const cc = new ClassificationCollection();

  cc.add(new Classification({ declassification: { created: '20000101' } }));
  cc.add(new Classification({ declassification: { created: '20100101' } }));
  cc.add(new Classification({ declassification: { created: '20050101' } }));

  const classification = cc.reduce();

  t.is(classification.getClassificationDate().getFullYear(), 2010);
});
