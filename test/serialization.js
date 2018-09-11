import test from 'ava';
import { Classification } from '..';

test('Serializing classifications creates an object', (t) => {
  const classification = new Classification();

  t.is(typeof classification.toJSON(), 'object');
  t.is(typeof classification.serialize(), 'string');
});

test('Serialized classifications can be used to instantiate new Classification objects', (t) => {
  const classification1 = new Classification();
  const classification2 = new Classification(classification1.toJSON());
  const classification3 = Classification.deserialize(classification1.serialize());

  t.true(classification1 instanceof Classification);
  t.true(classification2 instanceof Classification);
  t.true(classification3 instanceof Classification);
});

test('Classification objects instantiated using serialized values yield identical results to the first object', (t) => {
  const classification1 = new Classification();

  classification1.setClassificationLevel(3);
  classification1.addRel('AUS', 'CAN', 'GBR');
  classification1.addFgi({ owner: 'CAN', level: 4 });
  classification1.addCodeword('UAS-FOO');
  classification1.setRelido(true);

  const classification2 = new Classification(classification1.toJSON());
  const classification3 = Classification.deserialize(classification1.serialize());

  t.is(classification2.toString(), classification1.toString());
  t.is(classification2.toString(), classification3.toString());
  t.is(classification3.toString(), classification1.toString());

  t.deepEqual(classification2.toJSON(), classification1.toJSON());
  t.deepEqual(classification2.toJSON(), classification3.toJSON());
  t.deepEqual(classification3.toJSON(), classification1.toJSON());
});
