import test from 'ava';
import { TetragraphCollection } from '../src/tetragraph-collection';
import { Tetragraph } from '../src/tetragraph';

test('Tetragraph Collections can be constructed with a singleton', (t) => {
  t.is(TetragraphCollection.getSingleton(), TetragraphCollection.getSingleton());
});

test('Tetragraph Collections can emplace new tetragraphs', (t) => {
  const tc = new TetragraphCollection();
  t.is(tc.emplace({ name: 'ACGU', trigraphs: ['AUS', 'CAN', 'GBR', 'USA'] }), 0);
});

test('Tetragraph Collections can only have one copy of each tetragraph', (t) => {
  const tc = new TetragraphCollection();
  t.is(tc.emplace({ name: 'ACGU' }), tc.emplace({ name: 'ACGU' }));
});

test('Tetragraph Collections can remove a tetragraph from the list', (t) => {
  const tc = new TetragraphCollection();
  tc.emplace({ name: 'ACGU', trigraphs: ['AUS', 'CAN', 'GBR', 'USA'] });

  t.is(tc.count(), 1);
  t.is(tc.rem(tc.findName('ACGU')), true);
  t.is(tc.count(), 0);
  t.is(tc.rem(tc.findName('ACGU')), false);
  t.is(tc.count(), 0);
});

test('Tetragraphs can remove trigraphs from their list', (t) => {
  const tetragraph = new Tetragraph({ name: 'ACGU', trigraphs: ['AUS', 'CAN', 'GBR', 'USA', 'AAA'] });

  t.deepEqual(tetragraph.getTrigraphs(), [ 'AAA', 'AUS', 'CAN', 'GBR', 'USA' ]);
  t.is(tetragraph.remTrigraph('AAA'), true);
  t.is(tetragraph.remTrigraph('AAA'), false);
  t.deepEqual(tetragraph.getTrigraphs(), [ 'AUS', 'CAN', 'GBR', 'USA' ]);
});
