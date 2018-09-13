import test from 'ava';
import { Classification } from '../src/main';

test('FGI section defaults to blank', (t) => {
  const classification = new Classification();

  classification.setClassificationLevel(4);
  t.is(classification.toString(), 'TOP SECRET');
});

test('single-source FGI in otherwise unclassified document creates foreign-intelligence document', (t) => {
  const classification = new Classification();

  classification.addFgi({ owner: 'CAN', level: 3 });
  classification.addFgi({ owner: 'CAN', level: 2 });
  classification.addFgi({ owner: 'CAN', level: 1 });
  t.is(classification.toString(), '//CAN SECRET');
});

test('multi-source FGI in otherwise unclassified document creates FGI document', (t) => {
  const classification = new Classification();

  classification.addFgi({ owner: 'CAN', level: 3 });
  classification.addFgi({ owner: 'GBR', level: 2 });
  t.is(classification.toString(), 'SECRET//FGI CAN GBR');
});

test('FGI section is prefixed by "FGI" if it has countries', (t) => {
  const classification = new Classification();

  classification.setClassificationLevel(4);
  classification.addFgi({ owner: 'CAN' });
  t.is(classification.toString(), 'TOP SECRET//FGI CAN');
});

test('One FGI appears after classification level', (t) => {
  const classification = new Classification();

  classification.setClassificationLevel(4);
  classification.addFgi({ owner: 'CAN' });
  t.is(classification.toString(), 'TOP SECRET//FGI CAN');
});

test('Multiple FGIs are separated by a single space ( )', (t) => {
  const classification = new Classification();

  classification.setClassificationLevel(4);
  classification.addFgi({ owner: 'CAN' });
  classification.addFgi({ owner: 'GBR' });
  t.is(classification.toString(), 'TOP SECRET//FGI CAN GBR');
});

test('Multiple FGIs are alphabetized', (t) => {
  const classification = new Classification();

  classification.setClassificationLevel(4);
  classification.addFgi({ owner: 'GBR' });
  classification.addFgi({ owner: 'CAN' });
  t.is(classification.toString(), 'TOP SECRET//FGI CAN GBR');
});

test('Duplicate FGIs do not show up multiple times', (t) => {
  const classification = new Classification();

  classification.setClassificationLevel(4);
  classification.addFgi({ owner: 'CAN' });
  classification.addFgi({ owner: 'CAN' });
  classification.addFgi({ owner: 'CAN' });
  classification.addFgi({ owner: 'GBR' });
  classification.addFgi({ owner: 'GBR' });
  classification.addFgi({ owner: 'GBR' });
  t.is(classification.toString(), 'TOP SECRET//FGI CAN GBR');
});

test('Removed FGIs do not show up at all', (t) => {
  const classification = new Classification();

  classification.setClassificationLevel(4);
  classification.addFgi({ owner: 'CAN' });
  classification.remFgi({ owner: 'CAN' });
  t.is(classification.toString(), 'TOP SECRET');
});

test('Removing a FGI returns "true"', (t) => {
  const classification = new Classification();

  classification.setClassificationLevel(4);
  classification.addFgi({ owner: 'CAN' });
  t.is(classification.remFgi({ owner: 'CAN' }), true);
});


test('Removing a nonexistent FGI returns "false"', (t) => {
  const classification = new Classification();

  classification.setClassificationLevel(4);
  t.is(classification.remFgi({ owner: 'CAN' }), false);
});

test('Searching for an existent FGI returns "true"', (t) => {
  const classification = new Classification();

  classification.setClassificationLevel(4);
  classification.addFgi({ owner: 'CAN' });
  t.is(classification.hasFgi({ owner: 'CAN' }), true);
});

test('Searching for a nonexistent FGI returns "false"', (t) => {
  const classification = new Classification();

  classification.setClassificationLevel(4);
  t.is(classification.hasFgi({ owner: 'CAN' }), false);
});
