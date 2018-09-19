import test from 'ava';
import { Classification } from '../src/main';
import { SourceCollection } from '../src/source-collection';

test('The Source Collection class reports a count based on how many valid values there are', (t) => {
  const sources = new SourceCollection();

  t.is(sources.count(), 0);

  sources.add({ authors: [ 'Author A' ] });
  t.is(sources.count(), 1);

  sources.add({ name: 'Source B', authors: [ 'Author B', 'Author C' ] });
  t.is(sources.count(), 2);

  sources.add({ name: 'Source C' });
  t.is(sources.count(), 3);

  sources.rem(sources.find({ name: 'Source B', authors: [ 'Author A' ] }));
  t.is(sources.count(), 3);

  sources.rem(sources.find({ authors: [ 'Author B'] }));
  t.is(sources.count(), 2);

  sources.rem(sources.find({ name: 'Source C' }));
  t.is(sources.count(), 1);
});
test('The Source Collection is able to find sources by name', (t) => {
  const sources = new SourceCollection();

  t.is(sources.count(), 0);

  sources.add({ name: 'Source A', authors: [ 'Author A' ] });
  sources.add({ name: 'Source B', authors: [ 'Author B' ] });
  sources.add({ name: 'Source C', authors: [ 'Author C' ] });

  t.is(sources.find({ name: 'Source B' }), 1);
});
test('The Source Collection is able to find sources by author', (t) => {
  const sources = new SourceCollection();

  t.is(sources.count(), 0);

  sources.add({ name: 'Source A', authors: [ 'Author A' ] });
  sources.add({ name: 'Source B', authors: [ 'Author B' ] });
  sources.add({ name: 'Source C', authors: [ 'Author C' ] });

  t.is(sources.find({ authors: [ 'Author B' ] }), 1);
});
test('The Source Collection can find sources by name/author intersection', (t) => {
  const sources = new SourceCollection();

  sources.add({ name: 'Source' });
  sources.add({ name: 'Source', authors: [ 'Author A', 'Author B' ] });
  sources.add({ authors: [ 'Author B' ] });

  t.is(sources.find({ name: 'Source', authors: [ 'Author B' ] }), 1);
});
test('The Source Collection finder returns -1 if no source can be found', (t) => {
  const sources = new SourceCollection();

  t.is(sources.count(), 0);

  sources.add({ name: 'Source A' });
  sources.add({ name: 'Source B' });
  sources.add({ name: 'Source C' });

  t.is(sources.find({ authors: [ 'Author B' ] }), -1);
});
test('The Source Collection does not find sources with mismatch name/authors', (t) => {
  const sources = new SourceCollection();

  sources.add({ name: 'Source' });
  sources.add({ authors: [ 'Author' ] });

  t.is(sources.find({ name: 'Source', authors: [ 'Author' ] }), -1);
});
test('The Source Collection can check whether an author is present', (t) => {
  const sources = new SourceCollection();

  sources.add({ authors: ['Author'] });

  t.is(sources.has({ authors: ['Author'] }), true);
});
test('The Source Collection can grab multiple authors', (t) => {
  const sources = new SourceCollection();

  sources.add({ authors: [ 'A' ] });
  sources.add({ authors: [ 'B' ] });
  sources.add({ authors: [ 'A', 'B' ] });

  t.is(sources.find({ authors: ['A', 'B'] }), 2);
});
test('The Source Collection can check whether a source is present', (t) => {
  const sources = new SourceCollection();

  sources.add({ name: 'A' });

  t.is(sources.has({ name: 'A' }), true);
});
test('The Source Collection can check whether a source/author combo is present', (t) => {
  const sources = new SourceCollection();

  sources.add({ name: 'Source' });
  sources.add({ authors: [ 'Author' ] });
  sources.add({ name: 'Source', authors: [ 'Author', 'Name' ] });

  t.is(sources.find({ name: 'Source', authors: ['Author'] }), 2);
});
test('The Source Collection ignores source/author mismatches', (t) => {
  const sources = new SourceCollection();

  sources.add({ name: 'Source', authors: [ 'Author' ] });

  t.is(sources.has({ name: 'Source', authors: [] }), false);
});
test('The source collection iterator can be stopped prematurely', (t) => {
  const sources = new SourceCollection();

  sources.add({});
  sources.add({});
  sources.add({});
  sources.add({});

  let counter = 0;
  sources.forEach((source, index, terminator) => { terminator(); ++counter; });

  t.is(counter, 1);
});
