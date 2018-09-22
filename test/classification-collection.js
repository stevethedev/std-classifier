import test from 'ava';
import { Classification, ClassificationCollection } from '../src/main';

test('Classification Collection returns UNCLASSIFIED when empty', (t) => {
  const cc = new ClassificationCollection();

  t.is(cc.reduce().toString(), 'UNCLASSIFIED');
});

test('Classification Collection returns highest classification level from the collection', (t) => {
  const cc = new ClassificationCollection();

  cc.add(new Classification({ level: 2 }));
  cc.add(new Classification({ level: 3 }));
  cc.add(new Classification({ level: 1 }));
  t.is(cc.reduce().toString(), 'SECRET');
});

test('Classification Collection returns the aggregate  of all codewords', (t) => {
  const cc = new ClassificationCollection();

  cc.add(new Classification({ level: 4, codewords: ['PINE'] }));
  cc.add(new Classification({ level: 4, codewords: ['NEEDLE'] }));
  t.is(cc.reduce().toString(), 'TOP SECRET//NEEDLE/PINE');
});

test('Classification Collection returns the aggregate of all FGIs', (t) => {
  const cc = new ClassificationCollection();

  cc.add(new Classification({ level: 4, fgi: [ { owner: 'AUS' } ] }));
  cc.add(new Classification({ level: 4, fgi: [ { owner: 'GBR' } ] }));
  cc.add(new Classification({ level: 4, fgi: [ { owner: 'CAN' } ] }));
  t.is(cc.reduce().toString(), 'TOP SECRET//FGI AUS CAN GBR');
});

test('Classification Collection returns the aggregate of all dissemination control markings', (t) => {
  const cc = new ClassificationCollection();

  cc.add(new Classification({ level: 4, dissemination: { propin: true } }));
  cc.add(new Classification({ level: 4, dissemination: { orcon: true } }));
  t.is(cc.reduce().toString(), 'TOP SECRET//ORCON,PROPIN');
});

test('Classification Collection returns the aggregate of all Non-Intelligence Community Markings', (t) => {
  const cc = new ClassificationCollection();

  cc.add(new Classification({ level: 4, nonic: ['LES'] }));
  cc.add(new Classification({ level: 4, nonic: ['COMSEC'] }));
  t.is(cc.reduce().toString(), 'TOP SECRET//COMSEC,LES');
});

test('Classification Collection count reflects the number of valid records', (t) => {
  const cc = new ClassificationCollection();

  t.is(cc.count(), 0);

  cc.add(new Classification());
  t.is(cc.count(), 1);

  cc.add(new Classification());
  t.is(cc.count(), 2);

  cc.rem(0);
  t.is(cc.count(), 1);

  cc.rem(0);
  t.is(cc.count(), 1);

  cc.rem(1);
  t.is(cc.count(), 0);
});

test('Classification Collection allows fetching classifications by index', (t) => {
  const cc = new ClassificationCollection();

  t.is(cc.get(0), null);

  const classification = new Classification();

  cc.add(classification);
  t.is(cc.get(0), classification);
});

test('Classification Collection allows removing classifications by index', (t) => {
  const cc = new ClassificationCollection();

  const classification = new Classification();
  cc.add(classification);
  t.is(cc.get(0), classification);

  cc.rem(0);
  t.is(cc.get(0), null);
});

test('Classification Collection allows looking up classifications', (t) => {
  const cc = new ClassificationCollection();

  const class1 = new Classification();
  const class2 = new Classification();

  cc.add(class1);

  class1.addFgi({ owner: 'CAN' });
  class1.addFgi({ owner: 'AUS' });

  class2.addFgi({ owner: 'AUS' });
  class2.addFgi({ owner: 'CAN' });

  t.is(cc.find(class2.toJSON()), 0);
  t.is(cc.find({ foo: 'bar' }), -1);
});

test('Classification Collection accepts an array of classifications as the parameter', (t) => {
  const cc = new ClassificationCollection([
    new Classification({ level: 0 }),
    new Classification({ level: 1 }),
    new Classification({ level: 2 }),
  ]);

  t.is(cc.get(0).getClassificationLevel(), 0);
  t.is(cc.get(1).getClassificationLevel(), 1);
  t.is(cc.get(2).getClassificationLevel(), 2);
});
test('Classification Collection may be serialized into an array of serialized classifications', (t) => {
  const cc = new ClassificationCollection([
    new Classification({ level: 0 }),
    new Classification({ level: 1 }),
    new Classification({ level: 2 }),
  ]);

  const json = cc.toJSON();

  t.is(json.classifications[0].level, 0);
  t.is(json.classifications[1].level, 1);
  t.is(json.classifications[2].level, 2);
});
test('Classification Collection may be deserialized from an array of serialized classifications', (t) => {
  const cc = ClassificationCollection.deserialize(JSON.stringify({
    classifications: [
      { level: 0 },
      { level: 1 },
      { level: 2 },
    ]
  }));

  t.is(cc.get(0).getClassificationLevel(), 0);
  t.is(cc.get(1).getClassificationLevel(), 1);
  t.is(cc.get(2).getClassificationLevel(), 2);
});
test('Classification Collection may count the number of child classifications', (t) => {
  const cc = new ClassificationCollection();

  t.is(cc.count(), 0);

  cc.add(new  Classification());
  t.is(cc.count(), 1);

  cc.add(new Classification());
  t.is(cc.count(), 2);
});
