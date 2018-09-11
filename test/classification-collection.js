import test from 'ava';
import { Classification, ClassificationCollection } from '../dist/classifier';

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
  t.is(cc.reduce().toString(), 'TOP SECRET//PINE/NEEDLE');
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
