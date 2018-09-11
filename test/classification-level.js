import test from 'ava';
import { Classification } from '../dist/classifier';

test('Classifications default to "UNCLASSIFIED"', (t) => {
  const classification = new Classification();

  t.is(classification.toString(), 'UNCLASSIFIED');
});

test('Classification.setClassificationLevel(0) sets to "UNCLASSIFIED"', (t) => {
  const classification = new Classification();

  classification.setClassificationLevel(0);
  t.is(classification.toString(), "UNCLASSIFIED");
});

test('Classification.setClassificationLevel(1) sets to "CONFIDENTIAL"', (t) => {
  const classification = new Classification();

  classification.setClassificationLevel(1);
  t.is(classification.toString(), "CONFIDENTIAL");
});

test('Classification.setClassificationLevel(2) sets to "CONFIDENTIAL"', (t) => {
  const classification = new Classification();

  classification.setClassificationLevel(2);
  t.is(classification.toString(), "CONFIDENTIAL");
});

test('Classification.setClassificationLevel(3) sets to "SECRET"', (t) => {
  const classification = new Classification();

  classification.setClassificationLevel(3);
  t.is(classification.toString(), "SECRET");
});

test('Classification.setClassificationLevel(4) sets to "TOP SECRET"', (t) => {
  const classification = new Classification();

  classification.setClassificationLevel(4);
  t.is(classification.toString(), "TOP SECRET");
});

test('Classification.setClassificationLevel(5) throws an error when converted', (t) => {
  const classification = new Classification();

  classification.setClassificationLevel(5);
  t.throws(classification.toString.bind(classification));
});

test('Classification.setClassificationLevel(-1) throws an error when converted', (t) => {
  const classification = new Classification();

  classification.setClassificationLevel(-1);
  t.throws(classification.toString.bind(classification));
});
