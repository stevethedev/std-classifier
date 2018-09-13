/**
 * The Classification Collection is a specialization of the Collection
 * interface, and is used to group many classification instances in
 * a way that lets us generate a new, aggregate classification.
 */

import { Classification } from '../classification/index';
import { IClassification } from '../classification/interface';
import { IClassificationCollection } from './interface';

export class ClassificationCollection implements IClassificationCollection {
  private mClassifications: Array<IClassification | null> = [];

  /** Get the number of Classification elements within this collection. */
  public count(): number {
    let count = 0;
    this.forEach(() => { ++count; });
    return count;
  }

  /** Add a new classification object to the collection. */
  public add(classification: IClassification): number {
    return this.mClassifications.push(classification);
  }

  /** Get the classification instance at the given index. */
  public get(index: number): IClassification | null {
    return this.mClassifications[index]
      ? this.mClassifications[index]
      : null;
  }

  /** Find the first index of an object that matches the given classification object. */
  public find(classification: IClassification): number {
    if (classification) {
      for (let iClassification = 0; iClassification < this.mClassifications.length; ++iClassification) {
        const oClassification = this.mClassifications[iClassification];
        if (oClassification && oClassification.serialize() === oClassification.serialize()) {
          return iClassification;
        }
      }
    }
    return -1;
  }

  /** Check whether this collection has a classification that matches the given one. */
  public has(classification: IClassification): boolean {
    return -1 !== this.find(classification);
  }

  /** Remove the classification at the given index. */
  public rem(index: number): boolean {
    if (this.get(index)) {
      this.mClassifications[index] = null;
      return true;
    }
    return false;
  }

  /** Iterate the classifications within the collection. */
  public forEach(callback: (c: IClassification, i: number, t: () => void) => void): void {
    let terminate = false;
    const terminator = (): void => { terminate = true; };

    for (let iClassification = 0; !terminate && iClassification < this.mClassifications.length; ++iClassification) {
      const classification = this.mClassifications[iClassification];

      if (null !== classification) {
        callback(classification, iClassification, terminator);
      }
    }
  }

  /** Reduce the contained classifications into one new classification. */
  public reduce(): Classification {
    const result = new Classification();

    this.forEach((classification: IClassification) => {
      result.setClassificationLevel(Math.max(
        result.getClassificationLevel(),
        classification.getClassificationLevel(),
      ));

      result.addNonIC(...classification.getNonIC());

      result.setDsen(result.isDsen() || classification.isDsen());
      result.setFouo(result.isFouo() || classification.isFouo());
      result.setNoforn(result.isNoforn() || classification.isNoforn());
      result.setOrcon(result.isOrcon() || classification.isOrcon());
      result.setPropin(result.isPropin() || classification.isPropin());
      result.setRelido(result.isRelido() || classification.isRelido());
      result.setRsen(result.isRsen() || classification.isRsen());
      result.addRel(...[...result.getRel(), ...classification.getRel()]);
      result.addEyes(...[...result.getEyes(), ...classification.getEyes()]);

      result.addCodeword(...classification.getCodewords());
      result.addFgi(...classification.getFgi());
    });
    return result;
  }
}
