import test from 'ava';
import { ClassificationCollection } from '../src/classification-collection';
import { Classification } from '../src/classification';

test('Unclassified classifications do not strip REL TO when primary', (t) => {
  const cc = new ClassificationCollection();
  const c1 = new Classification();
  const c2 = new Classification();

  c2.setClassificationLevel(4);
  c2.addRel('GBR');

  cc.add(c1);
  cc.add(c2);

  t.is(cc.reduce().toString(), 'TOP SECRET//REL TO USA and GBR');
});

test('Unclassified classifications do not strip REL TO when secondary', (t) => {
  const cc = new ClassificationCollection();
  const c1 = new Classification();
  const c2 = new Classification();

  c1.setClassificationLevel(4);
  c1.addRel('GBR');

  cc.add(c1);
  cc.add(c2);

  t.is(cc.reduce().toString(), 'TOP SECRET//REL TO USA and GBR');
});
