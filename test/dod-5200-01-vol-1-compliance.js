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
test('US Classifications may have a declassification date associated with them', (t) => {
  const classification = new Classification({
    level: Classification.levels.TOP_SECRET,
    declassification: { date: '20181202' },
  });

  t.is(classification.toString(), 'TOP SECRET');
  t.is(classification.getDeclassificationExemption(), null);
  t.is(classification.getDeclassificationDate().getYear(), 2018);
  t.is(classification.getDeclassificationDate().getMonth(), 11);
  t.is(classification.getDeclassificationDate().getDate(), 2);
});
test('US Classifications default to a 10-year declassification date if none is provided', (t) => {
  const today = new Date();
  const classification = new Classification({ level: Classification.levels.TOP_SECRET });

  t.is(classification.toString(), 'TOP SECRET');
  t.is(classification.getDeclassificationExemption(), null);
  t.is(classification.getDeclassificationDate().getYear(), today.getYear() + 10);
  t.is(classification.getDeclassificationDate().getMonth(), today.getMonth());
  t.is(classification.getDeclassificationDate().getDate(), today.getDate());
});
test('US Classifications with a declassification exemption of X1 are converted to 25 years from the current date', (t) => {
  const today = new Date();
  const classification = new Classification({
    level: Classification.levels.TOP_SECRET,
    declassification: { X1: true }
  });

  t.is(classification.toString(), 'TOP SECRET');
  t.is(classification.getDeclassificationExemption(), null);
  t.is(classification.getDeclassificationDate().getYear(), today.getYear() + 25);
  t.is(classification.getDeclassificationDate().getMonth(), today.getMonth());
  t.is(classification.getDeclassificationDate().getDate(), today.getDate());
});
test('US Classifications with a declassification exemption of X2 are converted to 25 years from the current date', (t) => {
  const today = new Date();
  const classification = new Classification({
    level: Classification.levels.TOP_SECRET,
    declassification: { X2: true },
  });

  t.is(classification.toString(), 'TOP SECRET');
  t.is(classification.getDeclassificationExemption(), null);
  t.is(classification.getDeclassificationDate().getYear(), today.getYear() + 25);
  t.is(classification.getDeclassificationDate().getMonth(), today.getMonth());
  t.is(classification.getDeclassificationDate().getDate(), today.getDate());
});
test('US Classifications with a declassification exemption of X3 are converted to 25 years from the current date', (t) => {
  const today = new Date();
  const classification = new Classification({
    level: Classification.levels.TOP_SECRET,
    declassification: { X3: true }
  });

  t.is(classification.toString(), 'TOP SECRET');
  t.is(classification.getDeclassificationExemption(), null);
  t.is(classification.getDeclassificationDate().getYear(), today.getYear() + 25);
  t.is(classification.getDeclassificationDate().getMonth(), today.getMonth());
  t.is(classification.getDeclassificationDate().getDate(), today.getDate());
});
test('US Classifications with a declassification exemption of X4 are converted to 25 years from the current date', (t) => {
  const today = new Date();
  const classification = new Classification({
    level: Classification.levels.TOP_SECRET,
    declassification: { X4: true }
  });

  t.is(classification.toString(), 'TOP SECRET');
  t.is(classification.getDeclassificationExemption(), null);
  t.is(classification.getDeclassificationDate().getYear(), today.getYear() + 25);
  t.is(classification.getDeclassificationDate().getMonth(), today.getMonth());
  t.is(classification.getDeclassificationDate().getDate(), today.getDate());
});
test('US Classifications with a declassification exemption of X5 are converted to 25 years from the current date', (t) => {
  const today = new Date();
  const classification = new Classification({
    level: Classification.levels.TOP_SECRET,
    declassification: { X5: true }
  });

  t.is(classification.toString(), 'TOP SECRET');
  t.is(classification.getDeclassificationExemption(), null);
  t.is(classification.getDeclassificationDate().getYear(), today.getYear() + 25);
  t.is(classification.getDeclassificationDate().getMonth(), today.getMonth());
  t.is(classification.getDeclassificationDate().getDate(), today.getDate());
});
test('US Classifications with a declassification exemption of X6 are converted to 25 years from the current date', (t) => {
  const today = new Date();
  const classification = new Classification({
    level: Classification.levels.TOP_SECRET,
    declassification: { X6: true }
  });

  t.is(classification.toString(), 'TOP SECRET');
  t.is(classification.getDeclassificationExemption(), null);
  t.is(classification.getDeclassificationDate().getYear(), today.getYear() + 25);
  t.is(classification.getDeclassificationDate().getMonth(), today.getMonth());
  t.is(classification.getDeclassificationDate().getDate(), today.getDate());
});
test('US Classifications with a declassification exemption of X7 are converted to 25 years from the current date', (t) => {
  const today = new Date();
  const classification = new Classification({
    level: Classification.levels.TOP_SECRET,
    declassification: { X7: true }
  });

  t.is(classification.toString(), 'TOP SECRET');
  t.is(classification.getDeclassificationExemption(), null);
  t.is(classification.getDeclassificationDate().getYear(), today.getYear() + 25);
  t.is(classification.getDeclassificationDate().getMonth(), today.getMonth());
  t.is(classification.getDeclassificationDate().getDate(), today.getDate());
});
test('US Classifications with a declassification exemption of X8 are converted to 25 years from the current date', (t) => {
  const today = new Date();
  const classification = new Classification({
    level: Classification.levels.TOP_SECRET,
    declassification: { X8: true }
  });

  t.is(classification.toString(), 'TOP SECRET');
  t.is(classification.getDeclassificationExemption(), null);
  t.is(classification.getDeclassificationDate().getYear(), today.getYear() + 25);
  t.is(classification.getDeclassificationDate().getMonth(), today.getMonth());
  t.is(classification.getDeclassificationDate().getDate(), today.getDate());
});
test('US Classifications with a declassification exemption of 25X1 retains the classification exemption', (t) => {
  const today = new Date();
  const classification = new Classification({
    level: Classification.levels.TOP_SECRET,
    declassification: { '25X1': true },
  });

  t.is(classification.toString(), 'TOP SECRET');
  t.is(classification.getDeclassificationExemption(), '25X1');
  t.is(classification.getDeclassificationDate().getYear(), today.getYear() + 50);
  t.is(classification.getDeclassificationDate().getMonth(), today.getMonth());
  t.is(classification.getDeclassificationDate().getDate(), today.getDate());
});
test('US Classifications with a declassification exemption of 25X2 retains the classification exemption', (t) => {
  const today = new Date();
  const classification = new Classification({
    level: Classification.levels.TOP_SECRET,
    declassification: { '25X2': true },
  });

  t.is(classification.toString(), 'TOP SECRET');
  t.is(classification.getDeclassificationExemption(), '25X2');
  t.is(classification.getDeclassificationDate().getYear(), today.getYear() + 50);
  t.is(classification.getDeclassificationDate().getMonth(), today.getMonth());
  t.is(classification.getDeclassificationDate().getDate(), today.getDate());
});
test('US Classifications with a declassification exemption of 25X3 retains the classification exemption', (t) => {
  const today = new Date();
  const classification = new Classification({
    level: Classification.levels.TOP_SECRET,
    declassification: { '25X3': true },
  });

  t.is(classification.toString(), 'TOP SECRET');
  t.is(classification.getDeclassificationExemption(), '25X3');
  t.is(classification.getDeclassificationDate().getYear(), today.getYear() + 50);
  t.is(classification.getDeclassificationDate().getMonth(), today.getMonth());
  t.is(classification.getDeclassificationDate().getDate(), today.getDate());
});
test('US Classifications with a declassification exemption of 25X4 retains the classification exemption', (t) => {
  const today = new Date();
  const classification = new Classification({
    level: Classification.levels.TOP_SECRET,
    declassification: { '25X4': true },
  });

  t.is(classification.toString(), 'TOP SECRET');
  t.is(classification.getDeclassificationExemption(), '25X4');
  t.is(classification.getDeclassificationDate().getYear(), today.getYear() + 50);
  t.is(classification.getDeclassificationDate().getMonth(), today.getMonth());
  t.is(classification.getDeclassificationDate().getDate(), today.getDate());
});
test('US Classifications with a declassification exemption of 25X5 retains the classification exemption', (t) => {
  const today = new Date();
  const classification = new Classification({
    level: Classification.levels.TOP_SECRET,
    declassification: { '25X5': true },
  });

  t.is(classification.toString(), 'TOP SECRET');
  t.is(classification.getDeclassificationExemption(), '25X5');
  t.is(classification.getDeclassificationDate().getYear(), today.getYear() + 50);
  t.is(classification.getDeclassificationDate().getMonth(), today.getMonth());
  t.is(classification.getDeclassificationDate().getDate(), today.getDate());
});
test('US Classifications with a declassification exemption of 25X6 retains the classification exemption', (t) => {
  const today = new Date();
  const classification = new Classification({
    level: Classification.levels.TOP_SECRET,
    declassification: { '25X6': true },
  });

  t.is(classification.toString(), 'TOP SECRET');
  t.is(classification.getDeclassificationExemption(), '25X6');
  t.is(classification.getDeclassificationDate().getYear(), today.getYear() + 50);
  t.is(classification.getDeclassificationDate().getMonth(), today.getMonth());
  t.is(classification.getDeclassificationDate().getDate(), today.getDate());
});
test('US Classifications with a declassification exemption of 25X7 retains the classification exemption', (t) => {
  const today = new Date();
  const classification = new Classification({
    level: Classification.levels.TOP_SECRET,
    declassification: { '25X7': true },
  });

  t.is(classification.toString(), 'TOP SECRET');
  t.is(classification.getDeclassificationExemption(), '25X7');
  t.is(classification.getDeclassificationDate().getYear(), today.getYear() + 50);
  t.is(classification.getDeclassificationDate().getMonth(), today.getMonth());
  t.is(classification.getDeclassificationDate().getDate(), today.getDate());
});
test('US Classifications with a declassification exemption of 25X8 retains the classification exemption', (t) => {
  const today = new Date();
  const classification = new Classification({
    level: Classification.levels.TOP_SECRET,
    declassification: { '25X8': true },
  });

  t.is(classification.toString(), 'TOP SECRET');
  t.is(classification.getDeclassificationExemption(), '25X8');
  t.is(classification.getDeclassificationDate().getYear(), today.getYear() + 50);
  t.is(classification.getDeclassificationDate().getMonth(), today.getMonth());
  t.is(classification.getDeclassificationDate().getDate(), today.getDate());
});
test('US Classifications with a declassification exemption of 25X9 retains the classification exemption', (t) => {
  const today = new Date();
  const classification = new Classification({
    level: Classification.levels.TOP_SECRET,
    declassification: { '25X9': true },
  });

  t.is(classification.toString(), 'TOP SECRET');
  t.is(classification.getDeclassificationExemption(), '25X9');
  t.is(classification.getDeclassificationDate().getYear(), today.getYear() + 50);
  t.is(classification.getDeclassificationDate().getMonth(), today.getMonth());
  t.is(classification.getDeclassificationDate().getDate(), today.getDate());
});
test('US Classifications with a declassification exemption of 50X1-HUM retains the classification exemption', (t) => {
  const today = new Date();
  const classification = new Classification({
    level: Classification.levels.TOP_SECRET,
    declassification: { '50X1-HUM': true },
  });

  t.is(classification.toString(), 'TOP SECRET');
  t.is(classification.getDeclassificationExemption(), '50X1-HUM');
  t.is(classification.getDeclassificationDate().getYear(), today.getYear() + 75);
  t.is(classification.getDeclassificationDate().getMonth(), today.getMonth());
  t.is(classification.getDeclassificationDate().getDate(), today.getDate());
});
test('US Classifications with a declassification exemption of 50X2-WMD retains the classification exemption', (t) => {
  const today = new Date();
  const classification = new Classification({
    level: Classification.levels.TOP_SECRET,
    declassification: { '50X2-WMD': true },
  });

  t.is(classification.toString(), 'TOP SECRET');
  t.is(classification.getDeclassificationExemption(), '50X2-WMD');
  t.is(classification.getDeclassificationDate().getYear(), today.getYear() + 75);
  t.is(classification.getDeclassificationDate().getMonth(), today.getMonth());
  t.is(classification.getDeclassificationDate().getDate(), today.getDate());
});
test('US Classifications with a declassification exemption of 50X1 retains the classification exemption', (t) => {
  const today = new Date();
  const classification = new Classification({
    level: Classification.levels.TOP_SECRET,
    declassification: { '50X1': true },
  });

  t.is(classification.toString(), 'TOP SECRET');
  t.is(classification.getDeclassificationExemption(), '50X1');
  t.is(classification.getDeclassificationDate().getYear(), today.getYear() + 75);
  t.is(classification.getDeclassificationDate().getMonth(), today.getMonth());
  t.is(classification.getDeclassificationDate().getDate(), today.getDate());
});
test('US Classifications with a declassification exemption of 50X2 retains the classification exemption', (t) => {
  const today = new Date();
  const classification = new Classification({
    level: Classification.levels.TOP_SECRET,
    declassification: { '50X2': true },
  });

  t.is(classification.toString(), 'TOP SECRET');
  t.is(classification.getDeclassificationExemption(), '50X2');
  t.is(classification.getDeclassificationDate().getYear(), today.getYear() + 75);
  t.is(classification.getDeclassificationDate().getMonth(), today.getMonth());
  t.is(classification.getDeclassificationDate().getDate(), today.getDate());
});
test('US Classifications with a declassification exemption of 50X3 retains the classification exemption', (t) => {
  const today = new Date();
  const classification = new Classification({
    level: Classification.levels.TOP_SECRET,
    declassification: { '50X3': true },
  });

  t.is(classification.toString(), 'TOP SECRET');
  t.is(classification.getDeclassificationExemption(), '50X3');
  t.is(classification.getDeclassificationDate().getYear(), today.getYear() + 75);
  t.is(classification.getDeclassificationDate().getMonth(), today.getMonth());
  t.is(classification.getDeclassificationDate().getDate(), today.getDate());
});
test('US Classifications with a declassification exemption of 50X4 retains the classification exemption', (t) => {
  const today = new Date();
  const classification = new Classification({
    level: Classification.levels.TOP_SECRET,
    declassification: { '50X4': true },
  });

  t.is(classification.toString(), 'TOP SECRET');
  t.is(classification.getDeclassificationExemption(), '50X4');
  t.is(classification.getDeclassificationDate().getYear(), today.getYear() + 75);
  t.is(classification.getDeclassificationDate().getMonth(), today.getMonth());
  t.is(classification.getDeclassificationDate().getDate(), today.getDate());
});
test('US Classifications with a declassification exemption of 50X5 retains the classification exemption', (t) => {
  const today = new Date();
  const classification = new Classification({
    level: Classification.levels.TOP_SECRET,
    declassification: { '50X5': true },
  });

  t.is(classification.toString(), 'TOP SECRET');
  t.is(classification.getDeclassificationExemption(), '50X5');
  t.is(classification.getDeclassificationDate().getYear(), today.getYear() + 75);
  t.is(classification.getDeclassificationDate().getMonth(), today.getMonth());
  t.is(classification.getDeclassificationDate().getDate(), today.getDate());
});
test('US Classifications with a declassification exemption of 50X6 retains the classification exemption', (t) => {
  const today = new Date();
  const classification = new Classification({
    level: Classification.levels.TOP_SECRET,
    declassification: { '50X6': true },
  });

  t.is(classification.toString(), 'TOP SECRET');
  t.is(classification.getDeclassificationExemption(), '50X6');
  t.is(classification.getDeclassificationDate().getYear(), today.getYear() + 75);
  t.is(classification.getDeclassificationDate().getMonth(), today.getMonth());
  t.is(classification.getDeclassificationDate().getDate(), today.getDate());
});
test('US Classifications with a declassification exemption of 50X7 retains the classification exemption', (t) => {
  const today = new Date();
  const classification = new Classification({
    level: Classification.levels.TOP_SECRET,
    declassification: { '50X7': true },
  });

  t.is(classification.toString(), 'TOP SECRET');
  t.is(classification.getDeclassificationExemption(), '50X7');
  t.is(classification.getDeclassificationDate().getYear(), today.getYear() + 75);
  t.is(classification.getDeclassificationDate().getMonth(), today.getMonth());
  t.is(classification.getDeclassificationDate().getDate(), today.getDate());
});
test('US Classifications with a declassification exemption of 50X8 retains the classification exemption', (t) => {
  const today = new Date();
  const classification = new Classification({
    level: Classification.levels.TOP_SECRET,
    declassification: { '50X8': true },
  });

  t.is(classification.toString(), 'TOP SECRET');
  t.is(classification.getDeclassificationExemption(), '50X8');
  t.is(classification.getDeclassificationDate().getYear(), today.getYear() + 75);
  t.is(classification.getDeclassificationDate().getMonth(), today.getMonth());
  t.is(classification.getDeclassificationDate().getDate(), today.getDate());
});
test('US Classifications with a declassification exemption of 50X9 retains the classification exemption', (t) => {
  const today = new Date();
  const classification = new Classification({
    level: Classification.levels.TOP_SECRET,
    declassification: { '50X9': true },
  });

  t.is(classification.toString(), 'TOP SECRET');
  t.is(classification.getDeclassificationExemption(), '50X9');
  t.is(classification.getDeclassificationDate().getYear(), today.getYear() + 75);
  t.is(classification.getDeclassificationDate().getMonth(), today.getMonth());
  t.is(classification.getDeclassificationDate().getDate(), today.getDate());
});

test('US Classifications with a declassification exemption of 75X1 retains the classification exemption', (t) => {
  const today = new Date();
  const classification = new Classification({
    level: Classification.levels.TOP_SECRET,
    declassification: { '75X1': true },
  });

  t.is(classification.toString(), 'TOP SECRET');
  t.is(classification.getDeclassificationExemption(), '75X1');
  t.is(classification.getDeclassificationDate().getYear(), today.getYear() + 100);
  t.is(classification.getDeclassificationDate().getMonth(), today.getMonth());
  t.is(classification.getDeclassificationDate().getDate(), today.getDate());
});
test('US Classifications with a declassification exemption of 75X2 retains the classification exemption', (t) => {
  const today = new Date();
  const classification = new Classification({
    level: Classification.levels.TOP_SECRET,
    declassification: { '75X2': true },
  });

  t.is(classification.toString(), 'TOP SECRET');
  t.is(classification.getDeclassificationExemption(), '75X2');
  t.is(classification.getDeclassificationDate().getYear(), today.getYear() + 100);
  t.is(classification.getDeclassificationDate().getMonth(), today.getMonth());
  t.is(classification.getDeclassificationDate().getDate(), today.getDate());
});
test('US Classifications with a declassification exemption of 75X3 retains the classification exemption', (t) => {
  const today = new Date();
  const classification = new Classification({
    level: Classification.levels.TOP_SECRET,
    declassification: { '75X3': true },
  });

  t.is(classification.toString(), 'TOP SECRET');
  t.is(classification.getDeclassificationExemption(), '75X3');
  t.is(classification.getDeclassificationDate().getYear(), today.getYear() + 100);
  t.is(classification.getDeclassificationDate().getMonth(), today.getMonth());
  t.is(classification.getDeclassificationDate().getDate(), today.getDate());
});
test('US Classifications with a declassification exemption of 75X4 retains the classification exemption', (t) => {
  const today = new Date();
  const classification = new Classification({
    level: Classification.levels.TOP_SECRET,
    declassification: { '75X4': true },
  });

  t.is(classification.toString(), 'TOP SECRET');
  t.is(classification.getDeclassificationExemption(), '75X4');
  t.is(classification.getDeclassificationDate().getYear(), today.getYear() + 100);
  t.is(classification.getDeclassificationDate().getMonth(), today.getMonth());
  t.is(classification.getDeclassificationDate().getDate(), today.getDate());
});
test('US Classifications with a declassification exemption of 75X5 retains the classification exemption', (t) => {
  const today = new Date();
  const classification = new Classification({
    level: Classification.levels.TOP_SECRET,
    declassification: { '75X5': true },
  });

  t.is(classification.toString(), 'TOP SECRET');
  t.is(classification.getDeclassificationExemption(), '75X5');
  t.is(classification.getDeclassificationDate().getYear(), today.getYear() + 100);
  t.is(classification.getDeclassificationDate().getMonth(), today.getMonth());
  t.is(classification.getDeclassificationDate().getDate(), today.getDate());
});
test('US Classifications with a declassification exemption of 75X6 retains the classification exemption', (t) => {
  const today = new Date();
  const classification = new Classification({
    level: Classification.levels.TOP_SECRET,
    declassification: { '75X6': true },
  });

  t.is(classification.toString(), 'TOP SECRET');
  t.is(classification.getDeclassificationExemption(), '75X6');
  t.is(classification.getDeclassificationDate().getYear(), today.getYear() + 100);
  t.is(classification.getDeclassificationDate().getMonth(), today.getMonth());
  t.is(classification.getDeclassificationDate().getDate(), today.getDate());
});
test('US Classifications with a declassification exemption of 75X7 retains the classification exemption', (t) => {
  const today = new Date();
  const classification = new Classification({
    level: Classification.levels.TOP_SECRET,
    declassification: { '75X7': true },
  });

  t.is(classification.toString(), 'TOP SECRET');
  t.is(classification.getDeclassificationExemption(), '75X7');
  t.is(classification.getDeclassificationDate().getYear(), today.getYear() + 100);
  t.is(classification.getDeclassificationDate().getMonth(), today.getMonth());
  t.is(classification.getDeclassificationDate().getDate(), today.getDate());
});
test('US Classifications with a declassification exemption of 75X8 retains the classification exemption', (t) => {
  const today = new Date();
  const classification = new Classification({
    level: Classification.levels.TOP_SECRET,
    declassification: { '75X8': true },
  });

  t.is(classification.toString(), 'TOP SECRET');
  t.is(classification.getDeclassificationExemption(), '75X8');
  t.is(classification.getDeclassificationDate().getYear(), today.getYear() + 100);
  t.is(classification.getDeclassificationDate().getMonth(), today.getMonth());
  t.is(classification.getDeclassificationDate().getDate(), today.getDate());
});
test('US Classifications with a declassification exemption of 75X9 retains the classification exemption', (t) => {
  const today = new Date();
  const classification = new Classification({
    level: Classification.levels.TOP_SECRET,
    declassification: { '75X9': true },
  });

  t.is(classification.toString(), 'TOP SECRET');
  t.is(classification.getDeclassificationExemption(), '75X9');
  t.is(classification.getDeclassificationDate().getYear(), today.getYear() + 100);
  t.is(classification.getDeclassificationDate().getMonth(), today.getMonth());
  t.is(classification.getDeclassificationDate().getDate(), today.getDate());
});
test('FGI information is exempt from declassification dates', (t) =>{
  const classification = new Classification({
    level: Classification.levels.TOP_SECRET,
    declassification: { date: '20200101' },
    fgi: [{ owner: 'CAN' }],
  });

  t.is(classification.getDeclassificationExemption(), null);
  t.is(classification.getDeclassificationDate(), null);
});
