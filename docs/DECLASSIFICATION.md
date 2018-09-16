# Declassification

Per [DoD Manual 5200.01 Volume 1], classified information shall be declassified
as soon as it no longer meets the standards for classification. The rules for
declassification are often arcane and inconsistent, so this library does not
provide any automatic declassification functionality. However, it will track
declassification dates, declassification codes, and publication dates in order
to calculate aggregate (derivative) classifications.

## Exemptions

* **Foreign Government Intelligence (FGI)** is exempt from the
  declassification dates.

[DoD Manual 5200.01 Volume 1]: http://www.esd.whs.mil/Portals/54/Documents/DD/issuances/dodm/520001_vol1.pdf
