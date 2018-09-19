import test from 'ava';
import { Classification, ClassificationCollection } from '../../src/main';
import { ReasonCollection } from '../../src/reason-collection';

/* Most of EO 12958 is covered by the DoD Manual tests */

test('Information must be marked with the reason for classification', (t) => {
  const classification = new Classification({ reasons: [ '1.5(a)', '1.5(b)' ] });

  t.is(classification.hasReason('1.5(a)'), true);
  t.is(classification.hasReason('1.4(a)'), false);
});
test('Classification Collections should reduce to hold all reasons', (t) => {
  const cc = new ClassificationCollection();

  cc.add(new Classification({ reasons: [ '1.5(a)' ] }));
  cc.add(new Classification({ reasons: [ '1.5(b)' ] }));

  const classification = cc.reduce();

  t.is(classification.hasReason('1.5(a)'), true);
  t.is(classification.hasReason('1.5(b)'), true);
  t.is(classification.hasReason('1.4(a)'), false);
});
test('Classifications should not serialize duplicate reasons', (t) => {
  const classification = new Classification({ reasons: [ '1.5(a)', '1.5(a)' ] });

  t.is(classification.toJSON().reasons.length, 1);
  t.is(classification.toJSON().reasons[0], '1.5(a)');
});
test('Reasons should be gettable by index', (t) => {
  const classification = new Classification({ reasons: [ '1.5(a)', '1.5(a)' ] });

  t.is(classification.getReason(0), '1.5(a)');
});
test('Reasons should be removable', (t) => {
  const classification = new Classification({ reasons: [ '1.5(a)', '1.5(a)' ] });

  t.is(classification.remReason('1.5(a)'), true);
  t.is(classification.remReason('1.5(a)'), false);
  t.is(classification.toJSON().reasons.length, 0);
});
test('Reasons should track their count', (t) => {
  const reasons = new ReasonCollection([ '1.5(a)', '1.5(a)' ]);

  t.is(reasons.count(), 1);
});
test('Reasons should be iterable', (t) => {
  const reasons = new ReasonCollection([ '1.5(a)', '1.5(b)' ]);

  let count = 0;
  reasons.forEach((reason, index, terminate) => { ++count; terminate(); });

  t.is(count, 1);

  count = 0;
  reasons.forEach((reason, index, terminate) => { ++count; });
  t.is(count, 2);
});
