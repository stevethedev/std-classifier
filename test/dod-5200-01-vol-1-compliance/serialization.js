import { Classification, ClassificationCollection } from '../../src/main';
import test from 'ava';

test('Serialized classifications should record the declassification rules', (t) => {
  const classification = new Classification({
    declassification: {
      exemptions: [ '75X1', '75X2' ]
    }
  });

  const { declassification } = classification.toJSON();

  t.is(declassification.exemptions[0], '75X1');
  t.is(declassification.exemptions[1], '75X2');
});
test('Serialized classifications should record the declassification date', (t) => {
  const classification = new Classification({
    declassification: { date: '20180101' }
  });

  const { declassification } = classification.toJSON();
  const date = new Date(declassification.date);

  t.is(date.getFullYear(), 2018);
  t.is(date.getMonth(), 0);
  t.is(date.getDate(), 1);
});
test('Serialized classifications should record the creation date', (t) =>{
  const classification = new Classification({
    declassification: { created: '20180101' }
  });

  const { declassification } = classification.toJSON();
  const date = new Date(declassification.created);

  t.is(date.getFullYear(), 2018);
  t.is(date.getMonth(), 0);
  t.is(date.getDate(), 1);
});
