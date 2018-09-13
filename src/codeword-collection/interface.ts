/**
 * The Codeword Collection Interface is a specialization of the Collection
 * Interface, and is used as a header. This ensures that the collection
 * follows the contract, but simplifies the main class definitions.
 */

import { ICollection } from '../collection/interface';

export interface ICodewordCollection extends ICollection<string> {
  toArray(): string[];

  toJSON(): string[];

  toString(): string;
}
