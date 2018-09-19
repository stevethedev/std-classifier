# Classification Reasons

Executive Order 12958 and its successors require classified information to be
clearly marked with the reason the information was classified. This library
does this with the "reason" methods.

## Instantiation

Classification reasons simply marked as strings within this library. To
instantiate a classification object with a reason for classification, the
`reason` property needs to be filled out with an array of strings:

```javascript
const classification = new Classification({ reasons: [ '1.4(a)' ] });
```

## Dynamically managing the reasons

Classification reasons may also be dynamically added or removed using the
`addReason(...string[])` and `remReason(string)` methods:

```javascript
const classification = new Classification();

classification.hasReason('1.4(a)'); // false
classification.addReason('1.4(a)');
classification.hasReason('1.4(a)'); // true
classification.remReason('1.4(a)');
classification.hasReason('1.4(a)'); // false
```
