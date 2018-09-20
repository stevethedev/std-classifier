# Foreign Government Intelligence

Foreign Government Intelligence (FGI) and Non-U.S. Classification Markings are
used to indicate intelligence that is not produced by the United States.

## Instantiation

Classifications can be instantiated using FGI using the
`fgi: [{ owner: string, level: number }]` property:

```javascript
const classification = new Classification({
  fgi: [{ owner: 'CAN', level: Classification.levels.RESTRICTED  }]
});

classification.toString(); // "//CAN RESTRICTED"
```

Whether information is considered "FGI" or  "Non-U.S. Classification" is based
on whether the Classification instance contains any U.S. classified material.
If U.S. classified information is indicated, then all foreign intelligence is
treated as "FGI":

```javascript
const classification = new Classification({
  level: Classification.levels.RESTRICTED,
  fgi: [{ owner: 'CAN', level: Classification.levels.SECRET }]
});

classification.toString(); // "SECRET//FGI CAN"
```

Finally, adding multiple FGI sources together into an otherwise UNCLASSIFIED
document creates a classified marking with FGI, taking on the highest
classification from all of the sources:

```javascript
const classification = new Classification({
  fgi: [
    { owner: 'AUS', level: Classification.levels.CONFIDENTIAL },
    { owner: 'CAN', level: Classification.levels.RESTRICTED },
  ]
});

classification.toString(); // "CONFIDENTIAL//FGI AUS CAN"
```

## Add FGI

Additional FGIs may be dynamically inserted with the
`addFgi(...{ owner: string, level: number })` method:

```javascript
const classification = new Classification();

classification.addFgi(
  { owner: 'CAN', level: Classification.levels.RESTRICTED },
  { owner: 'AUS', level: Classification.levels.CONFIDENTIAL },
);

classification.toString(); // "CONFIDENTIAL//FGI AUS CAN"
```
