import test from 'ava';
import { Classification } from '../src/main';
import { CodewordCollection } from '../src/codeword-collection';

test('Codewords default to blank', (t) => {
  const classification = new Classification();

  classification.setClassificationLevel(4);
  t.is(classification.toString(), 'TOP SECRET');
});

test('One codeword appears after classification level', (t) => {
  const classification = new Classification();

  classification.setClassificationLevel(4);
  classification.addCodeword('COMINT-GAMMA');
  t.is(classification.toString(), 'TOP SECRET//COMINT-GAMMA');
});

test('Multiple codewords are separated by a single slash (/)', (t) => {
  const classification = new Classification();

  classification.setClassificationLevel(4);
  classification.addCodeword('SI');
  classification.addCodeword('TK');
  t.is(classification.toString(), 'TOP SECRET//SI/TK');
});

test('Duplicate codewords do not show up multiple times', (t) => {
  const classification = new Classification();

  classification.setClassificationLevel(4);
  classification.addCodeword('SI');
  classification.addCodeword('SI');
  classification.addCodeword('SI');
  t.is(classification.toString(), 'TOP SECRET//SI');
});

test('Removed codewords do not show up at all', (t) => {
  const classification = new Classification();

  classification.setClassificationLevel(4);
  classification.addCodeword('SI');
  classification.addCodeword('SI');
  classification.addCodeword('SI');
  classification.remCodeword('SI');
  t.is(classification.toString(), 'TOP SECRET');
});

test('Removing a codeword returns "true"', (t) => {
  const classification = new Classification();

  classification.setClassificationLevel(4);
  classification.addCodeword('SI');
  t.is(classification.remCodeword('SI'), true);
});

test('Removing a nonexistent codeword returns "false"', (t) => {
  const classification = new Classification();

  t.is(classification.remCodeword('SI'), false);
});

test('Searching for an existent codeword returns "true"', (t) => {
  const classification = new Classification();

  classification.addCodeword('SI');
  t.is(classification.hasCodeword('SI'), true);
});

test('Searching for a nonexistent codeword returns "false"', (t) => {
  const classification = new Classification();

  t.is(classification.remCodeword('SI'), false);
});

test('Codewords should always default to upper-case', (t) => {
  const classification = new Classification();

  classification.addCodeword('Si');
  t.is(classification.hasCodeword('SI'), true);
  t.is(classification.hasCodeword('si'), true);
  t.is(classification.hasCodeword('sI'), true);
  t.is(classification.hasCodeword('Si'), true);
});

test('Codeword Collections maintain a count', (t) => {
  const codewords = new CodewordCollection([ 'codeword' ]);

  t.is(codewords.count(), 1);
  t.is(codewords.rem(codewords.find('CoDeWoRd')), true);
  t.is(codewords.rem(codewords.find('CoDeWoRd')), false);
  t.is(codewords.count(), 0);
});

test('Codewords can be easily cleared', (t) => {
  const classification = new Classification();

  classification.addCodeword('SI', 'TK');

  t.is(classification.hasCodeword('SI'), true);

  classification.clearCodewords();

  t.is(classification.hasCodeword('SI'), false);
});
