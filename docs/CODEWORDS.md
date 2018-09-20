# SCI Control Systems and Codewords

An SCI Control System is the system of procedural protective mechanisms used
to regulate or guide each program established by the Director of Central
Intelligence as Sensitive Compartmentalized Information (SCI). A control system
provides the ability to exercise restraint, direction, or influence over or
provide that degree of access control or physical protection necessary to
regulate, handle or manage information or items within an approved program.
Multiple entries may be chosen from the SCI Control System if the entries
are applicable.

## Instantiating with codewords

A Classification object can be instantiated with codewords by using the
`codewords: string[]` property:

```javascript
const classification = new Classification({
  level: Classification.levels.UNCLASSIFIED,
  codewords: [ 'SI', 'TK' ],
});
```

## Add new codewords

Codewords can be added to a classification using the `addCodeword(...string)`
method:

```javascript
const classification = new Classification({ level: 4 });
classification.addCodeword('SI', 'TK');

classification.toString(); // TOP SECRET//SI/TK
```

