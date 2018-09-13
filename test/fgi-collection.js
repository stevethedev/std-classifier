import test from 'ava';
import { Classification } from '../src/main';
import { FgiCollection } from '../src/fgi-collection';

test('Collecting multiple FGIs from multiple owners and creating an array sorts by owner-name in ascending order', (t) => {
  const classification = new Classification();

  classification.addFgi({ owner: 'CAN' });
  classification.addFgi({ owner: 'AUS' });
  classification.addFgi({ owner: 'GBR' });

  const fgis = classification.getFgi();
  t.is(fgis.length, 3);
  t.is(fgis[0].owner, 'AUS');
  t.is(fgis[1].owner, 'CAN');
  t.is(fgis[2].owner, 'GBR');
});

test('Collecting multiple FGIs from one owner and creating an array sorts by level', (t) => {
  const classification = new Classification();

  classification.addFgi({ owner: 'CAN', level: 2 });
  classification.addFgi({ owner: 'CAN', level: 0 });
  classification.addFgi({ owner: 'CAN', level: 4 });

  const fgis = classification.getFgi();

  t.is(fgis.length, 3);
  t.is(fgis[0].level, 0);
  t.is(fgis[1].level, 2);
  t.is(fgis[2].level, 4);
});

test('The FGI Collection class reports a count based on how many valid values there are', (t) => {
  const fgis = new FgiCollection();

  t.is(fgis.count(), 0);

  fgis.add({ owner: 'CAN', level: 2 });
  t.is(fgis.count(), 1);

  fgis.add({ owner: 'CAN', level: 0 });
  t.is(fgis.count(), 2);

  fgis.add({ owner: 'CAN', level: 4 });
  t.is(fgis.count(), 3);

  fgis.rem(fgis.find({ owner: 'CAN', level: 2 }));
  t.is(fgis.count(), 2);

  fgis.rem(fgis.find({ owner: 'CAN', level: 3 }));
  t.is(fgis.count(), 2);

  fgis.rem(fgis.find({ owner: 'CAN', level: 2 }));
  t.is(fgis.count(), 2);
});
