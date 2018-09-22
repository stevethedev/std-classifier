# Steve the Dev's Classification Manager

[![Build Status][build-status-image]][build-status-url]
[![Build status][appveyor-status-image]][appveyor-status-url]
[![Codacy Badge][codacy-image]][codacy-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![Coverage Status][coverage-image]][coverage-url]

JavaScript library for managing DoD Classifications. This library uses the
Department of Defense Manual 5200.01 Volume 1 and Executive Order 12958
Section 1.5 to manage and aggregate classifications.

```bash
npm install classification-manager
```

## Trello Board

https://trello.com/b/vlPEyG99

## Test

Run the Ava test suite to verify that the classification manager passes the
test suites.

```javascript
npm run test
```

## Serialized Classification Schema

```json
{
  "codewords": [ /* codewords as strings */ ],
  /* Declassification information */
  "declassification": {
    /* the date the classification was created. Default: new Date() */
    "created": "2018-01-01",
    /* A minimum declassification date, or "null" if none is declared */
    "date": null,
    /* The list of declassification exemptions */
    "exemptions": [ /* Declassification exemptions, such as "25X1" */ ]
  },
  /* Disseminiation controls */
  "dissemination": {
    /* Whether to apply DSEN to the classification. Default: false */
    "dsen": false,
    /* Whether to apply FOUO to the classification. Default: false */
    "fouo": false,
    /* Whether to apply IMCON to the classification. Default: false */
    "imcon": false,
    /* Whether to apply NOFORN to the classification. Default: false */
    "noforn": false,
    /* Whether to apply ORCON to the classification. Default: false */
    "orcon": false,
    /* Whether to apply PROPIN to the classification. Default: false */
    "propin": false,
    /* Whether to apply RELIDO to the classification. Default: false */
    "relido": false,
    /* Whether to apply RSEN to the classification. Default: false */
    "rsen": false,
    /* The list of EYES ONLY nations and organizations */
    "eyes": [ /* trigraphs and tetragraphs */ ],
    /* The list of REL TO nations and organizations */
    "rel": [ /* trigraphs and tetragraphs */ ]
  },
  /* Foreign government intelligence */
  "fgi": [
    /* The classification level (number) and owner (trigraph or tetragraph) */
    { "level": 1, "owner": "CAN" }
  ],
  /* The basic classification level. Default: 0 (UNCLASSIFIED) */
  "level": 0,
  /* Non-Intelligence Community Markings */
  "nonic": [ /* Array of strings */ ],
  /* The reasons for classification, according to the most recent EO guidance */
  "reasons": [ /* Array of strings */ ],
  /* The classification sources and authors */
  "sources": [
    /* Source name (string) and authors (string[]) */
    { "name": "Source", "authors": [ "Person A", "Person B" ] }
  ]
}
```

[appveyor-status-image]: https://ci.appveyor.com/api/projects/status/8i82xnlptwxas7vh/branch/master?svg=true
[appveyor-status-url]: https://ci.appveyor.com/project/stevethedev/std-classifier/branch/master
[build-status-image]: https://travis-ci.org/stevethedev/std-classifier.svg?branch=master
[build-status-url]: https://travis-ci.org/stevethedev/std-classifier
[codacy-image]: https://api.codacy.com/project/badge/Grade/9418a567fab1480c8a11df559b048445
[codacy-url]: https://www.codacy.com/app/stevethedev/std-classifier?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=stevethedev/std-classifier&amp;utm_campaign=Badge_Grade
[coverage-image]: https://coveralls.io/repos/github/stevethedev/std-classifier/badge.svg?branch=master
[coverage-url]: https://coveralls.io/github/stevethedev/std-classifier?branch=master
[license-url]: http://opensource.org/licenses/MIT
[snyk-image]: https://snyk.io/test/github/stevethedev/std-classifier/badge.svg?targetFile=package.json
[snyk-url]: https://snyk.io/test/github/stevethedev/std-classifier?targetFile=package.json
[wiki-url]: https://github.com/stevethedev/std-classifier/wiki
