/**
 * The Classification Collection is a specialization of the Collection
 * interface, and is used to group many classification instances in
 * a way that lets us generate a new, aggregate classification.
 */

import { Classification } from "../classification";
import {
  IClassification,
  IClassificationConstructor
} from "../classification/interface";
import {
  IClassificationCollection,
  IClassificationCollectionConstruct,
  IClassificationCollectionJson
} from "./interface";

export class ClassificationCollection implements IClassificationCollection {
  public static deserialize(serialized: string): ClassificationCollection {
    const json = JSON.parse(serialized) as IClassificationCollectionJson;
    return new ClassificationCollection(
      json.classifications.map(
        (classification: IClassificationConstructor) =>
          new Classification(classification)
      )
    );
  }

  private readonly mClassifications: Array<IClassification | null> = [];

  public constructor(classifications: IClassificationCollectionConstruct = []) {
    for (const classification of classifications) {
      this.add(classification);
    }
  }

  public toJSON(): IClassificationCollectionJson {
    const classifications = (this.mClassifications.filter(
      Boolean
    ) as IClassification[]).map(
      (classification: IClassification): IClassificationConstructor =>
        classification.toJSON()
    );
    return { classifications };
  }

  /** Get the number of Classification elements within this collection. */
  public count(): number {
    let count = 0;
    this.forEach(() => {
      ++count;
    });
    return count;
  }

  /** Add a new classification object to the collection. */
  public add(classification: IClassification): number {
    return this.mClassifications.push(classification) - 1;
  }

  /** Get the classification instance at the given index. */
  public get(index: number): IClassification | null {
    return this.mClassifications[index] ? this.mClassifications[index] : null;
  }

  /** Find the first index of an object that matches the given classification object. */
  public find(
    classification: IClassification | IClassificationConstructor
  ): number {
    const classificationObject =
      classification instanceof Classification
        ? classification
        : new Classification(classification as IClassificationConstructor);

    if (classification) {
      for (
        let iClassification = 0;
        iClassification < this.mClassifications.length;
        ++iClassification
      ) {
        const oClassification = this.mClassifications[iClassification];
        if (
          oClassification &&
          classificationObject.serialize() === oClassification.serialize()
        ) {
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
  public forEach(
    callback: (c: IClassification, i: number, t: () => void) => void
  ): void {
    let terminate = false;
    const terminator = (): void => {
      terminate = true;
    };

    for (
      let iClassification = 0;
      !terminate && iClassification < this.mClassifications.length;
      ++iClassification
    ) {
      const classification = this.mClassifications[iClassification];

      if (null !== classification) {
        callback(classification, iClassification, terminator);
      }
    }
  }

  /** Reduce the contained classifications into one new classification. */
  public reduce(): Classification {
    const classifications = this.mClassifications.filter(
      Boolean
    ) as Classification[];
    const classification = Boolean(classifications[0])
      ? classifications[0].clone()
      : new Classification();
    classification.combine(...classifications.slice(1));
    return classification;
  }
}
