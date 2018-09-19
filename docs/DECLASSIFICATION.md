# Declassification

Per [DoD Manual 5200.01 Volume 1], classified information shall be declassified
as soon as it no longer meets the standards for classification. The rules for
declassification are often arcane and inconsistent, so this library does not
provide any automatic declassification functionality. However, it will track
declassification dates, declassification codes, and publication dates in order
to calculate aggregate (derivative) classifications.

## Instantiation

Classification instances can be created with the declassification information
already filled in by filling out the `declassification` property.

```javascript
import { Classification } from 'std-classifier';
const classification = new Classification({
  declassification: {
    date: '20180101',     // Set an explicit minimum declassification date.
    rules: [ 'X1' ],      // Set the X1 declassification exemption.
    created: '20180101',  // Set the classification creation date
  }
});
```

## Set the declassification date after instantiation

Classification instances may have their declassification date set using the
`setDeclassificationDate(int | string | Date | null)` method.

```javascript
import { Classification } from 'std-classifier';
const classification = new Classification();
classification.setDeclassificationDate('20180101');
```

## Set the classification date after instantiation

Classification instances may have their classification date set using the
`setClassificationDate(int | string | Date)` method.

```javascript
import { Classification } from 'std-classifier';
const classification = new Classification();
classification.setClassificationDate(new Date());
```

## Add exemption codes

Classification instances may have additional exemption codes added by using the
`addDeclassificationExemption(...string)` method.

```javascript
import { Classification } from 'std-classifier';
const classification = new Classification();
classification.addDeclassificationExemption('25X1', '25X2', '25X3');
```

### Missing exemption codes

When processing declassification information, an exemption may not be
registered with the library. If this happens when you try to pull
declassification information that must account for these rules, then an error
will be thrown. This is deliberate, since it prevents the library from ignoring
potentially important declassification rules and provides some typo-checking.
To register new exemptions, call the static method `Classification.addDeclassificationRule(string, { year (string), deprecated (boolean) })`.

```javascript
import { Classification } from 'std-classifier';

const classification = new Classification({
  declassification: {
    exemptions: ['500-YEAR-EXEMPT']
  }
});

classification.getDeclassificationDate(); // Throws an error
Classification.addDeclassificationRule('500-YEAR-EXEMPT', { year: 500 });
classification.getDeclassificationDate(); // Returns 500 years in the future.
```

## Exemptions

* **Foreign Government Intelligence (FGI)** is exempt from the
  declassification dates.

### Get the
  getClassificationDate(): Date;
  setClassificationDate(date: Date | string | number): void;
  getDeclassificationDate(): Date | null;
  setDeclassificationDate(date: Date | string | number | null): void;
  getDeclassificationRawDate(): Date | null;
  getDeclassificationExemption(): string | null;
  getDeclassificationExemptions(): string[];
  addDeclassificationExemptions(...exemptions: string[]): void;

[DoD Manual 5200.01 Volume 1]: http://www.esd.whs.mil/Portals/54/Documents/DD/issuances/dodm/520001_vol1.pdf
