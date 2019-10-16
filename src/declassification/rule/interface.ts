/**
 * The Declassification Offset Interface is a standardized container that
 * expresses what kind of timeline should be added to a date object for
 * a particular declassification rule. It is passed in constructors.
 */
export interface IDeclassificationOffset {
  // Is this rule deprecated?
  deprecated?: boolean;

  // The number of years after classification this should use
  years?: number;
}

/**
 * The Declassification Rule Interface is an internal representation of the
 * combination of an IC declassification exemption name and the rules it
 * represents. It is internal and is not exposed outside the library.
 */
export interface IDeclassificationRule {
  id: string;
  offset: IDeclassificationOffset;
  deprecated: boolean;

  /**
   * Apply the offset rules to a Date object.
   *
   * @param date The date to apply a rule against
   * @return The new date object.
   */
  apply(date: Date): Date;
}
