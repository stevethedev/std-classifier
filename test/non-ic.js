import test from 'ava';
import { Classification } from '../src/main';

test('Non-IC markings default to blank', (t) => {
  const classification = new Classification();

  classification.setClassificationLevel(4);
  t.is(classification.toString(), 'TOP SECRET');
});

test('Non-IC markings are separated with spaceless commas', (t) => {
  const classification = new Classification();

  classification.setClassificationLevel(4);
  classification.addNonIC('comsec');
  classification.addNonIC('SAR');
  t.is(classification.toString(), 'TOP SECRET//COMSEC,SAR');
});

test('Non-IC markings do not display duplicates', (t) => {
  const classification = new Classification();

  classification.setClassificationLevel(4);
  classification.addNonIC('comsec');
  classification.addNonIC('comsec');
  classification.addNonIC('COMSEC');
  classification.addNonIC('comsec');
  t.is(classification.toString(), 'TOP SECRET//COMSEC');
});

test('Non-IC markings may be removed', (t) => {
  const classification = new Classification();

  classification.setClassificationLevel(4);
  classification.addNonIC('comsec');
  classification.remNonIC('COMSEC');
  t.is(classification.toString(), 'TOP SECRET');
});

test('Non-IC markings may be retrieved as an array of strings', (t) => {
  const classification = new Classification({ nonic: [ 'comsec' ] });

  t.deepEqual(classification.getNonIC(), [ 'COMSEC' ]);
});

test('Non-IC markings may be checked for existence, and are non-case-sensitive', (t) => {
  const classification = new Classification({ nonic: [ 'comsec' ] });

  t.is(classification.hasNonIC('comsec'), true);
  t.is(classification.hasNonIC('COMSEC'), true);
});
