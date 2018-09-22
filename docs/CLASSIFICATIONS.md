# Classifications

From [DoD Manual 5200.01 Volume 1]:
~~~
Information identified as requiring protection against unauthorized disclosure
in the interest of national security shall be classified Top Secret, Secret, or
Confidential. Except as otherwise provided by statue, no other terms shall be
used to identify U.S. classified information.
~~~

In accordance with this guidance, this library serves content as being
Unclassified (Level 0), Confidential (Level 2), Secret (Level 3), or Top Secret
(Level 4). Level 1, "Restricted", is not a valid  classification level for U.S.
documents, but is included because it may be included with classified
information from other nations or multinational organizations (e.g. NATO).

In the instances where a classification reduces to a U.S. Level 1, it will be
reported as "U.S. Confidential". In the instances where a classification
reduces to a non-U.S. Level 1, it will be reported as an FGI Restriction.


## Instantiate with a classification

Classification instances can be created with the classification level already
in place by setting the `level` property in the constructor parameter. If this
property is not set, then the classification level is presumed to be Level 0.

```javascript
import { Classification } from 'classification-manager';
const classification = new Classification({ level: 4 });
console.log(classification.toString()); // "TOP SECRET"
```

## Set classification after instantiation

Classification instances can have their classification level set using the
`setClassificationLevel(int)` method.

```javascript
import { Classification } from 'classification-manager';
const classification = new Classification();
classification.setClassificationLevel(3);
console.log(classification.toString()); // "SECRET"
```

# References

1. [DoD Manual 5200.01 Volume 1]

[DoD Manual 5200.01 Volume 1]: http://www.esd.whs.mil/Portals/54/Documents/DD/issuances/dodm/520001_vol1.pdf
