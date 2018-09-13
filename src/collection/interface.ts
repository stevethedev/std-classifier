/**
 * The Collection interface is used to establish the rules by which all other
 * collections will abide. It fills the same role as an abstract function,
 * and the generic pattern to create flexibility. Do not use directly.
 */

export type ICollectionIndex = number;

export interface ICollection<T> {
  /** Add a new element to the collection. */
  add(element: T): ICollectionIndex;

  /** Check whether an element exists. */
  has(element: T): boolean;

  /** Get the element at the given index. */
  get(index: ICollectionIndex): T | null;

  /** Remove the element at the given index. */
  rem(index: ICollectionIndex): boolean;

  /** Find the first index of an element that matches the given description. */
  find(element: T): ICollectionIndex;

  /** Return the number of valid elements in this collection. */
  count(): ICollectionIndex;

  /** Iterate the valid elements in this collection. */
  forEach(callback: (element: T, index: ICollectionIndex, terminator: () => void) => void): void;
}
