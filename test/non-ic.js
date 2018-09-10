import test from 'ava';
import { Classification } from '../dist/classifier';

test('Non-IC markings default to blank', t => {
  const classification = new Classification();
  classification.setClassificationLevel(4);
  t.is(classification.toString(), 'TOP SECRET');
});

test('Non-IC markings are separated with spaceless commas', t => {
  const classification = new Classification();
  classification.setClassificationLevel(4);
  classification.addNonIC('comsec');
  classification.addNonIC('SAR');
  t.is(classification.toString(), 'TOP SECRET//COMSEC,SAR');
});

test('Non-IC markings do not display duplicates', t => {
  const classification = new Classification();
  classification.setClassificationLevel(4);
  classification.addNonIC('comsec');
  classification.addNonIC('comsec');
  classification.addNonIC('COMSEC');
  classification.addNonIC('comsec');
  t.is(classification.toString(), 'TOP SECRET//COMSEC');
});

test('Non-IC markings may be removed', t => {
  const classification = new Classification();
  classification.setClassificationLevel(4);
  classification.addNonIC('comsec');
  classification.remNonIC('COMSEC');
  t.is(classification.toString(), 'TOP SECRET');
});
