import test from 'ava';
import { Classification } from '../src/main';

test('Classification-only has no slashes', (t) => {
  const classification = new Classification();

  t.is(classification.toString(), 'UNCLASSIFIED');
});

test('US Classification//Codewords', (t) => {
  const classification = new Classification();

  classification.setClassificationLevel(4);
  classification.addCodeword('SI');
  t.is(classification.toString(), 'TOP SECRET//SI');
});

test('US Classification//FGI', (t) => {
  const classification = new Classification();

  classification.setClassificationLevel(4);
  classification.addFgi({ owner: 'CAN' });
  t.is(classification.toString(), 'TOP SECRET//FGI CAN');
});

test('US Classification//Codewords//FGI', (t) => {
  const classification = new Classification();

  classification.setClassificationLevel(4);
  classification.addCodeword('SI');
  classification.addCodeword('TK');
  classification.addFgi({ owner: 'CAN' });
  classification.addFgi({ owner: 'GBR' });
  t.is(classification.toString(), 'TOP SECRET//SI/TK//FGI CAN GBR');
});

test('US Classification//Dissemination', (t) => {
  const classification = new Classification();

  classification.setClassificationLevel(4);
  classification.setRsen(true);
  classification.addRel('CAN');
  t.is(classification.toString(), 'TOP SECRET//RSEN,REL TO USA and CAN');
});

test('US Classification//Codewords//Dissemination', (t) => {
  const classification = new Classification();

  classification.setClassificationLevel(4);
  classification.addCodeword('SI');
  classification.addCodeword('TK');
  classification.setRsen(true);
  classification.addRel('CAN');
  t.is(classification.toString(), 'TOP SECRET//SI/TK//RSEN,REL TO USA and CAN');
});

test('US Classification//FGI//Dissemination', (t) => {
  const classification = new Classification();

  classification.setClassificationLevel(4);
  classification.addFgi({ owner: 'CAN' });
  classification.addFgi({ owner: 'GBR' });
  classification.setRsen(true);
  classification.addRel('CAN');
  t.is(classification.toString(), 'TOP SECRET//FGI CAN GBR//RSEN,REL TO USA and CAN');
});

test('US Classification//Codewords//FGI//Dissemination', (t) => {
  const classification = new Classification();

  classification.setClassificationLevel(4);
  classification.addFgi({ owner: 'CAN' });
  classification.addFgi({ owner: 'GBR' });
  classification.addCodeword('SI');
  classification.addCodeword('TK');
  classification.setRsen(true);
  classification.addRel('CAN');
  t.is(classification.toString(), 'TOP SECRET//SI/TK//FGI CAN GBR//RSEN,REL TO USA and CAN');
});
