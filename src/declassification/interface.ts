export interface IDeclassificationConstruct {
  created ?: Date | string | number;
  date    ?: Date | string | number | null;
  rules   ?: string[];
}

export interface IDeclassification {
  /**
   * Get the declassification exemption rule name, if applicable.
   *
   * @return The exemption name, or else null.
   */
  getExemption(): null | string;

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

  /**
   * Add a new exemption rule to the structure.
   */
  addExemption(name: string): void;
}
