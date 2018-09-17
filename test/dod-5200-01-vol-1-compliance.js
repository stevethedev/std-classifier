import { Classification, ClassificationCollection } from '../src/main';
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
    declassification: { created: '20081202' },
  });

  t.is(classification.toString(), 'TOP SECRET');
  t.is(classification.getDeclassificationExemption(), null);
  t.is(classification.getDeclassificationDate().getFullYear(), 2018);
  t.is(classification.getDeclassificationDate().getMonth(), 11);
  t.is(classification.getDeclassificationDate().getDate(), 2);
});
test('US Classifications default to a 10-year declassification date if none is provided', (t) => {
  const today = new Date();
  const classification = new Classification({ level: Classification.levels.TOP_SECRET });

  t.is(classification.toString(), 'TOP SECRET');
  t.is(classification.getDeclassificationExemption(), null);
  t.is(classification.getDeclassificationDate().getFullYear(), today.getFullYear() + 10);
  t.is(classification.getDeclassificationDate().getMonth(), today.getMonth());
  t.is(classification.getDeclassificationDate().getDate(), today.getDate());
});
test('US Classifications with a declassification exemption of X1 are converted to 25 years from the current date', (t) => {
  const today = new Date();
  const classification = new Classification({
    level: Classification.levels.TOP_SECRET,
    declassification: { rules: ['X1'] }
  });

  t.is(classification.toString(), 'TOP SECRET');
  t.is(classification.getDeclassificationExemption(), null);
  t.is(classification.getDeclassificationDate().getFullYear(), today.getFullYear() + 25);
  t.is(classification.getDeclassificationDate().getMonth(), today.getMonth());
  t.is(classification.getDeclassificationDate().getDate(), today.getDate());
});
test('US Classifications with a declassification exemption of X2 are converted to 25 years from the current date', (t) => {
  const today = new Date();
  const classification = new Classification({
    level: Classification.levels.TOP_SECRET,
    declassification: { rules: ['X2'] },
  });

  t.is(classification.toString(), 'TOP SECRET');
  t.is(classification.getDeclassificationExemption(), null);
  t.is(classification.getDeclassificationDate().getFullYear(), today.getFullYear() + 25);
  t.is(classification.getDeclassificationDate().getMonth(), today.getMonth());
  t.is(classification.getDeclassificationDate().getDate(), today.getDate());
});
test('US Classifications with a declassification exemption of X3 are converted to 25 years from the current date', (t) => {
  const today = new Date();
  const classification = new Classification({
    level: Classification.levels.TOP_SECRET,
    declassification: { rules: ['X3'] }
  });

  t.is(classification.toString(), 'TOP SECRET');
  t.is(classification.getDeclassificationExemption(), null);
  t.is(classification.getDeclassificationDate().getFullYear(), today.getFullYear() + 25);
  t.is(classification.getDeclassificationDate().getMonth(), today.getMonth());
  t.is(classification.getDeclassificationDate().getDate(), today.getDate());
});
test('US Classifications with a declassification exemption of X4 are converted to 25 years from the current date', (t) => {
  const today = new Date();
  const classification = new Classification({
    level: Classification.levels.TOP_SECRET,
    declassification: { rules: ['X4'] }
  });

  t.is(classification.toString(), 'TOP SECRET');
  t.is(classification.getDeclassificationExemption(), null);
  t.is(classification.getDeclassificationDate().getFullYear(), today.getFullYear() + 25);
  t.is(classification.getDeclassificationDate().getMonth(), today.getMonth());
  t.is(classification.getDeclassificationDate().getDate(), today.getDate());
});
test('US Classifications with a declassification exemption of X5 are converted to 25 years from the current date', (t) => {
  const today = new Date();
  const classification = new Classification({
    level: Classification.levels.TOP_SECRET,
    declassification: { rules: ['X5'] }
  });

  t.is(classification.toString(), 'TOP SECRET');
  t.is(classification.getDeclassificationExemption(), null);
  t.is(classification.getDeclassificationDate().getFullYear(), today.getFullYear() + 25);
  t.is(classification.getDeclassificationDate().getMonth(), today.getMonth());
  t.is(classification.getDeclassificationDate().getDate(), today.getDate());
});
test('US Classifications with a declassification exemption of X6 are converted to 25 years from the current date', (t) => {
  const today = new Date();
  const classification = new Classification({
    level: Classification.levels.TOP_SECRET,
    declassification: { rules: ['X6'] }
  });

  t.is(classification.toString(), 'TOP SECRET');
  t.is(classification.getDeclassificationExemption(), null);
  t.is(classification.getDeclassificationDate().getFullYear(), today.getFullYear() + 25);
  t.is(classification.getDeclassificationDate().getMonth(), today.getMonth());
  t.is(classification.getDeclassificationDate().getDate(), today.getDate());
});
test('US Classifications with a declassification exemption of X7 are converted to 25 years from the current date', (t) => {
  const today = new Date();
  const classification = new Classification({
    level: Classification.levels.TOP_SECRET,
    declassification: { rules: ['X7'] }
  });

  t.is(classification.toString(), 'TOP SECRET');
  t.is(classification.getDeclassificationExemption(), null);
  t.is(classification.getDeclassificationDate().getFullYear(), today.getFullYear() + 25);
  t.is(classification.getDeclassificationDate().getMonth(), today.getMonth());
  t.is(classification.getDeclassificationDate().getDate(), today.getDate());
});
test('US Classifications with a declassification exemption of X8 are converted to 25 years from the current date', (t) => {
  const today = new Date();
  const classification = new Classification({
    level: Classification.levels.TOP_SECRET,
    declassification: { rules: ['X8'] }
  });

  t.is(classification.toString(), 'TOP SECRET');
  t.is(classification.getDeclassificationExemption(), null);
  t.is(classification.getDeclassificationDate().getFullYear(), today.getFullYear() + 25);
  t.is(classification.getDeclassificationDate().getMonth(), today.getMonth());
  t.is(classification.getDeclassificationDate().getDate(), today.getDate());
});
test('US Classifications with a declassification exemption of 25X1 retains the classification exemption', (t) => {
  const today = new Date();
  const classification = new Classification({
    level: Classification.levels.TOP_SECRET,
    declassification: { rules: ['25X1'] },
  });

  t.is(classification.toString(), 'TOP SECRET');
  t.is(classification.getDeclassificationExemption(), '25X1');
  t.is(classification.getDeclassificationDate().getFullYear(), today.getFullYear() + 50);
  t.is(classification.getDeclassificationDate().getMonth(), today.getMonth());
  t.is(classification.getDeclassificationDate().getDate(), today.getDate());
});
test('US Classifications with a declassification exemption of 25X2 retains the classification exemption', (t) => {
  const today = new Date();
  const classification = new Classification({
    level: Classification.levels.TOP_SECRET,
    declassification: { rules: ['25X2'] },
  });

  t.is(classification.toString(), 'TOP SECRET');
  t.is(classification.getDeclassificationExemption(), '25X2');
  t.is(classification.getDeclassificationDate().getFullYear(), today.getFullYear() + 50);
  t.is(classification.getDeclassificationDate().getMonth(), today.getMonth());
  t.is(classification.getDeclassificationDate().getDate(), today.getDate());
});
test('US Classifications with a declassification exemption of 25X3 retains the classification exemption', (t) => {
  const today = new Date();
  const classification = new Classification({
    level: Classification.levels.TOP_SECRET,
    declassification: { rules: ['25X3'] },
  });

  t.is(classification.toString(), 'TOP SECRET');
  t.is(classification.getDeclassificationExemption(), '25X3');
  t.is(classification.getDeclassificationDate().getFullYear(), today.getFullYear() + 50);
  t.is(classification.getDeclassificationDate().getMonth(), today.getMonth());
  t.is(classification.getDeclassificationDate().getDate(), today.getDate());
});
test('US Classifications with a declassification exemption of 25X4 retains the classification exemption', (t) => {
  const today = new Date();
  const classification = new Classification({
    level: Classification.levels.TOP_SECRET,
    declassification: { rules: ['25X4'] },
  });

  t.is(classification.toString(), 'TOP SECRET');
  t.is(classification.getDeclassificationExemption(), '25X4');
  t.is(classification.getDeclassificationDate().getFullYear(), today.getFullYear() + 50);
  t.is(classification.getDeclassificationDate().getMonth(), today.getMonth());
  t.is(classification.getDeclassificationDate().getDate(), today.getDate());
});
test('US Classifications with a declassification exemption of 25X5 retains the classification exemption', (t) => {
  const today = new Date();
  const classification = new Classification({
    level: Classification.levels.TOP_SECRET,
    declassification: { rules: ['25X5'] },
  });

  t.is(classification.toString(), 'TOP SECRET');
  t.is(classification.getDeclassificationExemption(), '25X5');
  t.is(classification.getDeclassificationDate().getFullYear(), today.getFullYear() + 50);
  t.is(classification.getDeclassificationDate().getMonth(), today.getMonth());
  t.is(classification.getDeclassificationDate().getDate(), today.getDate());
});
test('US Classifications with a declassification exemption of 25X6 retains the classification exemption', (t) => {
  const today = new Date();
  const classification = new Classification({
    level: Classification.levels.TOP_SECRET,
    declassification: { rules: ['25X6'] },
  });

  t.is(classification.toString(), 'TOP SECRET');
  t.is(classification.getDeclassificationExemption(), '25X6');
  t.is(classification.getDeclassificationDate().getFullYear(), today.getFullYear() + 50);
  t.is(classification.getDeclassificationDate().getMonth(), today.getMonth());
  t.is(classification.getDeclassificationDate().getDate(), today.getDate());
});
test('US Classifications with a declassification exemption of 25X7 retains the classification exemption', (t) => {
  const today = new Date();
  const classification = new Classification({
    level: Classification.levels.TOP_SECRET,
    declassification: { rules: ['25X7'] },
  });

  t.is(classification.toString(), 'TOP SECRET');
  t.is(classification.getDeclassificationExemption(), '25X7');
  t.is(classification.getDeclassificationDate().getFullYear(), today.getFullYear() + 50);
  t.is(classification.getDeclassificationDate().getMonth(), today.getMonth());
  t.is(classification.getDeclassificationDate().getDate(), today.getDate());
});
test('US Classifications with a declassification exemption of 25X8 retains the classification exemption', (t) => {
  const today = new Date();
  const classification = new Classification({
    level: Classification.levels.TOP_SECRET,
    declassification: { rules: ['25X8'] },
  });

  t.is(classification.toString(), 'TOP SECRET');
  t.is(classification.getDeclassificationExemption(), '25X8');
  t.is(classification.getDeclassificationDate().getFullYear(), today.getFullYear() + 50);
  t.is(classification.getDeclassificationDate().getMonth(), today.getMonth());
  t.is(classification.getDeclassificationDate().getDate(), today.getDate());
});
test('US Classifications with a declassification exemption of 25X9 retains the classification exemption', (t) => {
  const today = new Date();
  const classification = new Classification({
    level: Classification.levels.TOP_SECRET,
    declassification: { rules: ['25X9'] },
  });

  t.is(classification.toString(), 'TOP SECRET');
  t.is(classification.getDeclassificationExemption(), '25X9');
  t.is(classification.getDeclassificationDate().getFullYear(), today.getFullYear() + 50);
  t.is(classification.getDeclassificationDate().getMonth(), today.getMonth());
  t.is(classification.getDeclassificationDate().getDate(), today.getDate());
});
test('US Classifications with a declassification exemption of 50X1-HUM retains the classification exemption', (t) => {
  const today = new Date();
  const classification = new Classification({
    level: Classification.levels.TOP_SECRET,
    declassification: { rules: ['50X1-HUM'] },
  });

  t.is(classification.toString(), 'TOP SECRET');
  t.is(classification.getDeclassificationExemption(), '50X1-HUM');
  t.is(classification.getDeclassificationDate().getFullYear(), today.getFullYear() + 75);
  t.is(classification.getDeclassificationDate().getMonth(), today.getMonth());
  t.is(classification.getDeclassificationDate().getDate(), today.getDate());
});
test('US Classifications with a declassification exemption of 50X2-WMD retains the classification exemption', (t) => {
  const today = new Date();
  const classification = new Classification({
    level: Classification.levels.TOP_SECRET,
    declassification: { rules: ['50X2-WMD'] },
  });

  t.is(classification.toString(), 'TOP SECRET');
  t.is(classification.getDeclassificationExemption(), '50X2-WMD');
  t.is(classification.getDeclassificationDate().getFullYear(), today.getFullYear() + 75);
  t.is(classification.getDeclassificationDate().getMonth(), today.getMonth());
  t.is(classification.getDeclassificationDate().getDate(), today.getDate());
});
test('US Classifications with a declassification exemption of 50X1 retains the classification exemption', (t) => {
  const today = new Date();
  const classification = new Classification({
    level: Classification.levels.TOP_SECRET,
    declassification: { rules: ['50X1'] },
  });

  t.is(classification.toString(), 'TOP SECRET');
  t.is(classification.getDeclassificationExemption(), '50X1');
  t.is(classification.getDeclassificationDate().getFullYear(), today.getFullYear() + 75);
  t.is(classification.getDeclassificationDate().getMonth(), today.getMonth());
  t.is(classification.getDeclassificationDate().getDate(), today.getDate());
});
test('US Classifications with a declassification exemption of 50X2 retains the classification exemption', (t) => {
  const today = new Date();
  const classification = new Classification({
    level: Classification.levels.TOP_SECRET,
    declassification: { rules: ['50X2'] },
  });

  t.is(classification.toString(), 'TOP SECRET');
  t.is(classification.getDeclassificationExemption(), '50X2');
  t.is(classification.getDeclassificationDate().getFullYear(), today.getFullYear() + 75);
  t.is(classification.getDeclassificationDate().getMonth(), today.getMonth());
  t.is(classification.getDeclassificationDate().getDate(), today.getDate());
});
test('US Classifications with a declassification exemption of 50X3 retains the classification exemption', (t) => {
  const today = new Date();
  const classification = new Classification({
    level: Classification.levels.TOP_SECRET,
    declassification: { rules: ['50X3'] },
  });

  t.is(classification.toString(), 'TOP SECRET');
  t.is(classification.getDeclassificationExemption(), '50X3');
  t.is(classification.getDeclassificationDate().getFullYear(), today.getFullYear() + 75);
  t.is(classification.getDeclassificationDate().getMonth(), today.getMonth());
  t.is(classification.getDeclassificationDate().getDate(), today.getDate());
});
test('US Classifications with a declassification exemption of 50X4 retains the classification exemption', (t) => {
  const today = new Date();
  const classification = new Classification({
    level: Classification.levels.TOP_SECRET,
    declassification: { rules: ['50X4'] },
  });

  t.is(classification.toString(), 'TOP SECRET');
  t.is(classification.getDeclassificationExemption(), '50X4');
  t.is(classification.getDeclassificationDate().getFullYear(), today.getFullYear() + 75);
  t.is(classification.getDeclassificationDate().getMonth(), today.getMonth());
  t.is(classification.getDeclassificationDate().getDate(), today.getDate());
});
test('US Classifications with a declassification exemption of 50X5 retains the classification exemption', (t) => {
  const today = new Date();
  const classification = new Classification({
    level: Classification.levels.TOP_SECRET,
    declassification: { rules: ['50X5'] },
  });

  t.is(classification.toString(), 'TOP SECRET');
  t.is(classification.getDeclassificationExemption(), '50X5');
  t.is(classification.getDeclassificationDate().getFullYear(), today.getFullYear() + 75);
  t.is(classification.getDeclassificationDate().getMonth(), today.getMonth());
  t.is(classification.getDeclassificationDate().getDate(), today.getDate());
});
test('US Classifications with a declassification exemption of 50X6 retains the classification exemption', (t) => {
  const today = new Date();
  const classification = new Classification({
    level: Classification.levels.TOP_SECRET,
    declassification: { rules: ['50X6'] },
  });

  t.is(classification.toString(), 'TOP SECRET');
  t.is(classification.getDeclassificationExemption(), '50X6');
  t.is(classification.getDeclassificationDate().getFullYear(), today.getFullYear() + 75);
  t.is(classification.getDeclassificationDate().getMonth(), today.getMonth());
  t.is(classification.getDeclassificationDate().getDate(), today.getDate());
});
test('US Classifications with a declassification exemption of 50X7 retains the classification exemption', (t) => {
  const today = new Date();
  const classification = new Classification({
    level: Classification.levels.TOP_SECRET,
    declassification: { rules: ['50X7'] },
  });

  t.is(classification.toString(), 'TOP SECRET');
  t.is(classification.getDeclassificationExemption(), '50X7');
  t.is(classification.getDeclassificationDate().getFullYear(), today.getFullYear() + 75);
  t.is(classification.getDeclassificationDate().getMonth(), today.getMonth());
  t.is(classification.getDeclassificationDate().getDate(), today.getDate());
});
test('US Classifications with a declassification exemption of 50X8 retains the classification exemption', (t) => {
  const today = new Date();
  const classification = new Classification({
    level: Classification.levels.TOP_SECRET,
    declassification: { rules: ['50X8'] },
  });

  t.is(classification.toString(), 'TOP SECRET');
  t.is(classification.getDeclassificationExemption(), '50X8');
  t.is(classification.getDeclassificationDate().getFullYear(), today.getFullYear() + 75);
  t.is(classification.getDeclassificationDate().getMonth(), today.getMonth());
  t.is(classification.getDeclassificationDate().getDate(), today.getDate());
});
test('US Classifications with a declassification exemption of 50X9 retains the classification exemption', (t) => {
  const today = new Date();
  const classification = new Classification({
    level: Classification.levels.TOP_SECRET,
    declassification: { rules: ['50X9'] },
  });

  t.is(classification.toString(), 'TOP SECRET');
  t.is(classification.getDeclassificationExemption(), '50X9');
  t.is(classification.getDeclassificationDate().getFullYear(), today.getFullYear() + 75);
  t.is(classification.getDeclassificationDate().getMonth(), today.getMonth());
  t.is(classification.getDeclassificationDate().getDate(), today.getDate());
});

test('US Classifications with a declassification exemption of 75X1 retains the classification exemption', (t) => {
  const today = new Date();
  const classification = new Classification({
    level: Classification.levels.TOP_SECRET,
    declassification: { rules: ['75X1'] },
  });

  t.is(classification.toString(), 'TOP SECRET');
  t.is(classification.getDeclassificationExemption(), '75X1');
  t.is(classification.getDeclassificationDate().getFullYear(), today.getFullYear() + 100);
  t.is(classification.getDeclassificationDate().getMonth(), today.getMonth());
  t.is(classification.getDeclassificationDate().getDate(), today.getDate());
});
test('US Classifications with a declassification exemption of 75X2 retains the classification exemption', (t) => {
  const today = new Date();
  const classification = new Classification({
    level: Classification.levels.TOP_SECRET,
    declassification: { rules: ['75X2'] },
  });

  t.is(classification.toString(), 'TOP SECRET');
  t.is(classification.getDeclassificationExemption(), '75X2');
  t.is(classification.getDeclassificationDate().getFullYear(), today.getFullYear() + 100);
  t.is(classification.getDeclassificationDate().getMonth(), today.getMonth());
  t.is(classification.getDeclassificationDate().getDate(), today.getDate());
});
test('US Classifications with a declassification exemption of 75X3 retains the classification exemption', (t) => {
  const today = new Date();
  const classification = new Classification({
    level: Classification.levels.TOP_SECRET,
    declassification: { rules: ['75X3'] },
  });

  t.is(classification.toString(), 'TOP SECRET');
  t.is(classification.getDeclassificationExemption(), '75X3');
  t.is(classification.getDeclassificationDate().getFullYear(), today.getFullYear() + 100);
  t.is(classification.getDeclassificationDate().getMonth(), today.getMonth());
  t.is(classification.getDeclassificationDate().getDate(), today.getDate());
});
test('US Classifications with a declassification exemption of 75X4 retains the classification exemption', (t) => {
  const today = new Date();
  const classification = new Classification({
    level: Classification.levels.TOP_SECRET,
    declassification: { rules: ['75X4'] },
  });

  t.is(classification.toString(), 'TOP SECRET');
  t.is(classification.getDeclassificationExemption(), '75X4');
  t.is(classification.getDeclassificationDate().getFullYear(), today.getFullYear() + 100);
  t.is(classification.getDeclassificationDate().getMonth(), today.getMonth());
  t.is(classification.getDeclassificationDate().getDate(), today.getDate());
});
test('US Classifications with a declassification exemption of 75X5 retains the classification exemption', (t) => {
  const today = new Date();
  const classification = new Classification({
    level: Classification.levels.TOP_SECRET,
    declassification: { rules: ['75X5'] },
  });

  t.is(classification.toString(), 'TOP SECRET');
  t.is(classification.getDeclassificationExemption(), '75X5');
  t.is(classification.getDeclassificationDate().getFullYear(), today.getFullYear() + 100);
  t.is(classification.getDeclassificationDate().getMonth(), today.getMonth());
  t.is(classification.getDeclassificationDate().getDate(), today.getDate());
});
test('US Classifications with a declassification exemption of 75X6 retains the classification exemption', (t) => {
  const today = new Date();
  const classification = new Classification({
    level: Classification.levels.TOP_SECRET,
    declassification: { rules: ['75X6'] },
  });

  t.is(classification.toString(), 'TOP SECRET');
  t.is(classification.getDeclassificationExemption(), '75X6');
  t.is(classification.getDeclassificationDate().getFullYear(), today.getFullYear() + 100);
  t.is(classification.getDeclassificationDate().getMonth(), today.getMonth());
  t.is(classification.getDeclassificationDate().getDate(), today.getDate());
});
test('US Classifications with a declassification exemption of 75X7 retains the classification exemption', (t) => {
  const today = new Date();
  const classification = new Classification({
    level: Classification.levels.TOP_SECRET,
    declassification: { rules: ['75X7'] },
  });

  t.is(classification.toString(), 'TOP SECRET');
  t.is(classification.getDeclassificationExemption(), '75X7');
  t.is(classification.getDeclassificationDate().getFullYear(), today.getFullYear() + 100);
  t.is(classification.getDeclassificationDate().getMonth(), today.getMonth());
  t.is(classification.getDeclassificationDate().getDate(), today.getDate());
});
test('US Classifications with a declassification exemption of 75X8 retains the classification exemption', (t) => {
  const today = new Date();
  const classification = new Classification({
    level: Classification.levels.TOP_SECRET,
    declassification: { rules: ['75X8'] },
  });

  t.is(classification.toString(), 'TOP SECRET');
  t.is(classification.getDeclassificationExemption(), '75X8');
  t.is(classification.getDeclassificationDate().getFullYear(), today.getFullYear() + 100);
  t.is(classification.getDeclassificationDate().getMonth(), today.getMonth());
  t.is(classification.getDeclassificationDate().getDate(), today.getDate());
});
test('US Classifications with a declassification exemption of 75X9 retains the classification exemption', (t) => {
  const today = new Date();
  const classification = new Classification({
    level: Classification.levels.TOP_SECRET,
    declassification: { rules: ['75X9'] },
  });

  t.is(classification.toString(), 'TOP SECRET');
  t.is(classification.getDeclassificationExemption(), '75X9');
  t.is(classification.getDeclassificationDate().getFullYear(), today.getFullYear() + 100);
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
test('Classifications should track the classification date provided', (t) => {
  const DATE = '20000101';
  const classification = new Classification({
    level: Classification.levels.TOP_SECRET,
    declassification: { created: DATE },
  });

  t.is(classification.getClassificationDate().getFullYear(), 2000);
  t.is(classification.getClassificationDate().getMonth(), 0);
  t.is(classification.getClassificationDate().getDate(), 1);
});
test('Classifications should track the most restrictive declassification date', (t) => {
  const DATE = '30000101';
  const classification = new Classification({
    level: Classification.levels.TOP_SECRET,
    declassification: { date: DATE, rules: ['X1', 'X2', '75X1'] }
  });

  t.is(classification.getDeclassificationDate().getFullYear(), 3000);
});
test('Classifications should drop a rule if it is less restrictive than a date', (t) => {
  const DATE = '30000101';
  const classification = new Classification({
    level: Classification.levels.TOP_SECRET,
    declassification: { date: DATE, rules: ['X1', 'X2', '75X1'] }
  });

  t.is(classification.getDeclassificationExemption(), null);
});
test('Classifications should throw an error if they have an unrecognized exemption', (t) => {
  const classification = new Classification({
    level: Classification.levels.TOP_SECRET,
    declassification: { rules: ['ABCDEFG'] }
  });

  t.throws(() => classification.getDeclassificationExemption());
  t.throws(() => classification.getDeclassificationDate());
});
test('Classifications should have mutable classification dates', (t) => {
  const classification = new Classification();
  const today = new Date();

  t.is(classification.getClassificationDate().getFullYear(), today.getFullYear());

  classification.setClassificationDate('2000-01-01');
  t.is(classification.getClassificationDate().getFullYear(), 2000);
});
test('Classification should use the first declassification exemption with the highest exemption', (t) => {
  const classification = new Classification({
    level: Classification.levels.TOP_SECRET,
    declassification: {
      rules: [
        '75X1', '75X2', '75X3', '75X4', '75X5', '75X6', '75X7', '75X8', '75X9',
        'X1', 'X2', 'X3', 'X4', 'X5', 'X6', 'X7', 'X8',
        '25X1', '25X2', '25X3', '25X4', '25X5', '25X6', '25X7', '25X8', '25X9',
        '50X1-HUM', '50X2-WMD',
        '50X1', '50X2', '50X3', '50X4', '50X5', '50X6', '50X7', '50X8', '50X9',
      ]
    }
  });

  t.is(classification.getDeclassificationExemption(), '75X1');
});
test('Serialized classifications should record the declassification rules', (t) => {
  const classification = new Classification({
    declassification: {
      rules: [ '75X1', '75X2' ]
    }
  });

  const { declassification } = classification.toJSON();

  t.is(declassification.rules[0], '75X1');
  t.is(declassification.rules[1], '75X2');
});
test('Serialized classifications should record the declassification date', (t) => {
  const classification = new Classification({
    declassification: { date: '20180101' }
  });

  const { declassification } = classification.toJSON();
  const date = new Date(declassification.date);

  t.is(date.getFullYear(), 2018);
  t.is(date.getMonth(), 0);
  t.is(date.getDate(), 1);
});
test('Serialized classifications should record the creation date', (t) =>{
  const classification = new Classification({
    declassification: { created: '20180101' }
  });

  const { declassification } = classification.toJSON();
  const date = new Date(declassification.created);

  t.is(date.getFullYear(), 2018);
  t.is(date.getMonth(), 0);
  t.is(date.getDate(), 1);
});
test('Derivative classifications should combine the declassification exemptions', (t) => {
  const cc = new ClassificationCollection();

  cc.add(new Classification({ declassification: { rules: ['25X3'] } }));
  cc.add(new Classification({ declassification: { rules: ['25X1'] } }));
  cc.add(new Classification({ declassification: { rules: ['25X2'] } }));

  const classification = cc.reduce();

  t.is(classification.getDeclassificationExemption(), '25X1');
});
test('Derivative classifications should use the biggest declassification date', (t) => {
  const cc = new ClassificationCollection();

  cc.add(new Classification({ declassification: { date: '20000101' } }));
  cc.add(new Classification({ declassification: { date: '20100101' } }));
  cc.add(new Classification({ declassification: { date: '20050101' } }));

  const classification = cc.reduce();

  t.is(classification.getDeclassificationRawDate().getFullYear(), 2010);
});
test('Derivative classifications should use the biggest classification date', (t) => {
  const cc = new ClassificationCollection();

  cc.add(new Classification({ declassification: { created: '20000101' } }));
  cc.add(new Classification({ declassification: { created: '20100101' } }));
  cc.add(new Classification({ declassification: { created: '20050101' } }));

  const classification = cc.reduce();

  t.is(classification.getClassificationDate().getFullYear(), 2010);
});
