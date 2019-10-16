export interface IDeclassificationConstruct {
  created?: Date | string | number;
  date?: Date | string | number | null;
  exemptions?: string[];
}

export interface IDeclassification {
  toJSON(): IDeclassificationConstruct;
  combine(...declassification: IDeclassification[]): void;

  /**
   * Get the declassification exemption rule name, if applicable.
   *
   * @return The exemption name, or else null.
   */
  getExemption(): null | string;

  getExemptionList(): string[];

  /**
   * @return Get the date the source was classified.
   */
  getClassificationDate(): Date;

  /**
   * Set the classification date.
   */
  setClassificationDate(date: Date | string | number): void;

  /**
   * Get the applicable declassification date.
   *
   * @return Returns the declassification date, if applicable, or else null.
   */
  getDate(): null | Date;

  setDate(date: Date | string | number): void;

  getRawDate(): null | Date;

  /**
   * Add a new exemption rule to the structure.
   */
  addExemption(name: string): void;
}
