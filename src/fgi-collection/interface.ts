/**
 * The FGI Collection Interface is a specialization of the Collection
 * Interface, and is used as a header. This helps to simplify the
 * class definition while ensuring it follows the contract.
 */

import { IClassification } from "../classification/interface";
import { ICollection } from "../collection/interface";
import { IFgiConstruct } from "../fgi/interface";

export interface IFgiCollection extends ICollection<IFgiConstruct> {
  toArray(): IFgiConstruct[];
  toString(classification: IClassification): string;
  toJSON(): IFgiConstruct[];
  getOwners(): string[];
}
