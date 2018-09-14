import { Classification } from '../src/main';
import test from 'ava';

test('US Classifications allow UNCLASSIFIED markings', (t) => {
  const classification = new Classification({ level: Classification.levels.UNCLASSIFIED });

  t.is(classification.toString(), 'UNCLASSIFIED');
});
test('US Classifications convert RESTRICTED markings to CONFIDENTIAL', (t) => {
  const classification = new Classification({ level: Classification.levels.RESTRICTED });

  t.is(classification.toString(), 'CONFIDENTIAL');
});
test('US Classifications allow CONFIDENTIAL markings', (t) => {
  const classification = new Classification({ level: Classification.levels.CONFIDENTIAL });

  t.is(classification.toString(), 'CONFIDENTIAL');
});
test('US Classifications allow SECRET markings', (t) => {
  const classification = new Classification({ level: Classification.levels.SECRET });

  t.is(classification.toString(), 'SECRET');
});
test('US Classifications allow TOP SECRET markings', (t) => {
  const classification = new Classification({ level: Classification.levels.TOP_SECRET });

  t.is(classification.toString(), 'TOP SECRET');
});
