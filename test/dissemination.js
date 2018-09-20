import test from 'ava';
import { Classification, ClassificationCollection } from '../src/main';

test('Dissemination controls default to blank', (t) => {
  const classification = new Classification();

  classification.setClassificationLevel(4);
  t.is(classification.toString(), 'TOP SECRET');
});

test('Dissemination controls enables RSEN', (t) => {
  const classification = new Classification();

  classification.setClassificationLevel(4);
  classification.setRsen(true);
  t.is(classification.toString(), 'TOP SECRET//RSEN');
});

test('Dissemination controls disables RSEN', (t) => {
  const classification = new Classification();

  classification.setClassificationLevel(4);
  classification.setRsen(true);
  classification.setRsen(false);
  t.is(classification.toString(), 'TOP SECRET');
});

test('Dissemination controls can fetch RSEN status', (t) => {
  const classification = new Classification();

  classification.setClassificationLevel(4);
  classification.setRsen(true);
  t.is(classification.isRsen(), true);
  classification.setRsen(false);
  t.is(classification.isRsen(), false);
});

test('Dissemination controls enables FOUO', (t) => {
  const classification = new Classification();

  classification.setFouo(true);
  t.is(classification.toString(), 'UNCLASSIFIED//FOR OFFICIAL USE ONLY');
});

test('Dissemination controls only use FOUO when UNCLASSIFIED', (t) => {
  const classification = new Classification();

  classification.setClassificationLevel(4);
  classification.setFouo(true);
  t.is(classification.toString(), 'TOP SECRET');
});

test('Dissemination controls disables FOUO', (t) => {
  const classification = new Classification();

  classification.setFouo(true);
  classification.setFouo(false);
  t.is(classification.toString(), 'UNCLASSIFIED');
});

test('Dissemination controls can fetch FOUO status', (t) => {
  const classification = new Classification();

  classification.setClassificationLevel(4);
  t.is(classification.isFouo(), false);
  classification.setFouo(true);
  t.is(classification.isFouo(), true);
  classification.setFouo(false);
  t.is(classification.isFouo(), false);
});

test('Dissemination controls enables ORCON', (t) => {
  const classification = new Classification();

  classification.setClassificationLevel(4);
  classification.setOrcon(true);
  t.is(classification.toString(), 'TOP SECRET//ORCON');
});

test('Dissemination controls disables ORCON', (t) => {
  const classification = new Classification();

  classification.setClassificationLevel(4);
  classification.setOrcon(true);
  classification.setOrcon(false);
  t.is(classification.toString(), 'TOP SECRET');
});

test('Dissemination controls can fetch ORCON status', (t) => {
  const classification = new Classification();

  t.is(classification.isOrcon(), false);
  t.is(classification.setOrcon(true).isOrcon(), true);
  t.is(classification.setOrcon(false).isOrcon(), false);
});

test('Dissemination controls enables NOFORN', (t) => {
  const classification = new Classification();

  classification.setClassificationLevel(4);
  classification.setNoforn(true);
  t.is(classification.toString(), 'TOP SECRET//NOFORN');
});

test('Dissemination controls disables NOFORN', (t) => {
  const classification = new Classification();

  classification.setClassificationLevel(4);
  classification.setNoforn(true);
  classification.setNoforn(false);
  t.is(classification.toString(), 'TOP SECRET');
});

test('Dissemination controls can fetch NOFORN status', (t) => {
  const classification = new Classification();

  classification.setClassificationLevel(4);
  t.is(classification.isNoforn(), false);
  t.is(classification.setNoforn(true).isNoforn(), true);
  t.is(classification.setNoforn(false).isNoforn(), false);
});

test('Dissemination controls enables DSEN', (t) => {
  const classification = new Classification();

  classification.setClassificationLevel(4);
  t.is(classification.setDsen(true).toString(), 'TOP SECRET//DEA SENSITIVE');
});

test('Dissemination controls disables DSEN', (t) => {
  const classification = new Classification();

  classification.setClassificationLevel(4);
  t.is(classification.setDsen(true).setDsen(false).toString(), 'TOP SECRET');
});

test('Dissemination controls can fetch DSEN status', (t) => {
  const classification = new Classification();

  classification.setClassificationLevel(4);
  t.is(classification.isDsen(), false);
  t.is(classification.setDsen(true).isDsen(), true);
  t.is(classification.setDsen(false).isDsen(), false);
});

test('Dissemination controls can add releasable nations', (t) => {
  const classification = new Classification();

  classification.setClassificationLevel(4);
  t.is(classification.addRel('GBR').toString(), 'TOP SECRET//REL TO USA and GBR');
  t.is(classification.addRel('AUS').toString(), 'TOP SECRET//REL TO USA, AUS and GBR');
  t.is(classification.addRel('CAN').toString(), 'TOP SECRET//REL TO USA, AUS, CAN and GBR');
});

test('Dissemination controls can remove releasable nations', (t) => {
  const classification = new Classification();

  classification.setClassificationLevel(4);
  classification.addRel('GBR');
  classification.addRel('AUS');
  classification.addRel('CAN');
  classification.remRel('GBR');
  classification.remRel('CAN');
  classification.remRel('AUS');
  t.is(classification.toString(), 'TOP SECRET');
});

test('Dissemination controls can check for releasable nations', (t) => {
  const classification = new Classification();

  classification.setClassificationLevel(4);
  t.is(classification.hasRel('GBR'), false);
  t.is(classification.addRel('GBR').hasRel('GBR'), true);
  classification.remRel('GBR');
  t.is(classification.hasRel('GBR'), false);
});

test('Dissemination controls can add EYES ONLY nations', (t) => {
  const classification = new Classification();

  classification.setClassificationLevel(4);
  t.is(classification.addEyes('GBR').toString(), 'TOP SECRET//USA/GBR EYES ONLY');
  t.is(classification.addEyes('AUS').toString(), 'TOP SECRET//USA/AUS/GBR EYES ONLY');
  t.is(classification.addEyes('CAN').toString(), 'TOP SECRET//USA/AUS/CAN/GBR EYES ONLY');
});

test('Dissemination controls can remove EYES ONLY nations', (t) => {
  const classification = new Classification();

  classification.setClassificationLevel(4);
  classification.addEyes('GBR');
  classification.addEyes('AUS');
  classification.addEyes('CAN');
  classification.remEyes('GBR');
  classification.remEyes('CAN');
  classification.remEyes('AUS');
  t.is(classification.toString(), 'TOP SECRET');
});

test('Dissemination controls can check for EYES ONLY nations', (t) => {
  const classification = new Classification();

  classification.setClassificationLevel(4);
  t.is(classification.hasEyes('GBR'), false);
  t.is(classification.addEyes('GBR').hasEyes('GBR'), true);
  classification.remEyes('GBR');
  t.is(classification.hasEyes('GBR'), false);
});

test('Dissemination controls will remove REL TO when NOFORN', (t) => {
  const classification = new Classification();

  classification.setClassificationLevel(4);
  classification.addRel('GBR');
  classification.setNoforn(true);
  classification.addRel('CAN');
  t.is(classification.toString(), 'TOP SECRET//NOFORN');
});

test('Dissemination controls will remove EYES ONLY when NOFORN', (t) => {
  const classification = new Classification();

  classification.setClassificationLevel(4);
  classification.addEyes('GBR');
  classification.setNoforn(true);
  classification.addEyes('CAN');
  t.is(classification.toString(), 'TOP SECRET//NOFORN');
});

test('Dissemination controls will de-duplicate REL TO and EYES ONLY and prioritize EYES ONLY', (t) => {
  const classification = new Classification();

  classification.setClassificationLevel(4);
  classification.addRel('GBR');
  classification.addRel('CAN');
  classification.addEyes('CAN');
  classification.addEyes('AUS');
  t.is(classification.toString(), 'TOP SECRET//USA/CAN EYES ONLY');
});

test('Dissemination controls can combine many controls at once', (t) => {
  const classification = new Classification();

  classification.setClassificationLevel(4);
  classification.setRsen(true);
  classification.setFouo(true);
  classification.setOrcon(true);
  classification.setPropin(true);
  classification.addRel('CAN', 'AUS', 'GBR');
  classification.setDsen(true);
  t.is(
    classification.toString(),
    'TOP SECRET//RSEN,ORCON,PROPIN,DEA SENSITIVE,REL TO USA, AUS, CAN and GBR'
  );
  classification.addEyes('CAN');
  t.is(
    classification.toString(),
    'TOP SECRET//RSEN,ORCON,PROPIN,DEA SENSITIVE,USA/CAN EYES ONLY'
  );
});

test('Combining classification objects removes conflicting REL TO', (t) => {
  const cc = new ClassificationCollection([
    new Classification({ level: 4, dissemination: { rel: [ 'AUS', 'CAN', 'GBR' ] } }),
    new Classification({ level: 4, dissemination: { rel: [ 'CAN' ] } }),
  ]);

  t.deepEqual(cc.reduce().getRel(), ['CAN']);
});
