import { Classification, ClassificationCollection } from '../../src/main';
import test from 'ava';

test('Classification objects may hold source names', (t) => {
  const source = { name: 'some source name' };
  const classification = new Classification({
    sources: [ source ]
  });

  t.is(classification.getSource(0).name, source.name);
});
test('Classification objects may add source names', (t) => {
  const source = { name: 'some source name' };
  const classification = new Classification();

  classification.addSource(source);

  t.is(classification.getSource(0).name, source.name);
});
test('Aggregated classifications hold all of the source names', (t) => {
  const sources = [ { name: 'Source A' }, { name: 'Source B' } ];
  const cc = new ClassificationCollection();

  cc.add(new Classification({ sources: [ sources[0] ] }));
  cc.add(new Classification({ sources: [ sources[1] ] }));

  const classification = cc.reduce();

  t.is(classification.getSource(0).name, sources[0].name);
  t.is(classification.getSource(1).name, sources[1].name);
});
test('Classification objects may hold the identity of the OCA', (t) => {
  const source = { authors: [ 'Author 1', 'Author 2' ] };
  const classification = new Classification({ sources: [ source ] });

  t.is(classification.getAuthor(0, 0), source.authors[0]);
  t.is(classification.getAuthor(0, 1), source.authors[1]);
});
test('Aggregated classifications hold all of the OCA identities', (t) => {
  const sources = [
    { authors: [ 'Author 1' ] },
    { authors: [ 'Author 2' ] },
  ];
  const cc = new ClassificationCollection();
  cc.add(new Classification({ sources: [ sources[0] ] }));
  cc.add(new Classification({ sources: [ sources[1] ] }));

  const classification = cc.reduce();

  t.is(classification.getAuthor(0, 0), sources[0].authors[0]);
  t.is(classification.getAuthor(1, 0), sources[1].authors[0]);
});
test('Classification serialization creates a valid sources parameter', (t) => {
  const source = {
    name: 'Source A',
    authors: [
      'Author 1',
      'Author 2',
    ],
  };

  const classification = new Classification({ sources: [ source ] });
  const json = classification.toJSON().sources[0];

  t.is(json.name, source.name);
  t.is(json.authors[0], source.authors[0]);
  t.is(json.authors[1], source.authors[1]);
});
