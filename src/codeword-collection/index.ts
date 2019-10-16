/**
 * The Codeword Collection class is used to group multiple codewords together
 * into one container. This is mostly a convenience function; it is used to
 * centralize managing codewords for easier maintenance in the long-term.
 */

import { Codeword } from "../codeword";
import { ICodeword } from "../codeword/interface";
import { ICodewordCollection } from "./interface";

export class CodewordCollection implements ICodewordCollection {
  private readonly mCodewords: Array<ICodeword | null>;

  constructor(codewords: string[] = []) {
    this.mCodewords = [];
    codewords.forEach(this.add.bind(this));
  }

  public toArray(): string[] {
    const array: string[] = [];
    this.forEach((codeword: string) => {
      array.push(codeword);
    });
    return array;
  }

  public toJSON(): string[] {
    const json: string[] = [];

    for (const iCodeword of this.mCodewords) {
      if (iCodeword) {
        json.push(iCodeword.toJSON());
      }
    }

    return json;
  }

  public toString(): string {
    return this.mCodewords
      .filter(Boolean)
      .sort()
      .join("/");
  }

  public clear(): void {
    this.mCodewords.length = 0;
  }

  /** Add a new codeword to the collection. */
  public add(codeword: string): number {
    let index = this.find(codeword);
    if (-1 === index) {
      index = this.mCodewords.push(new Codeword(codeword)) - 1;
    }
    return index;
  }

  /** Check if a codeword exists in this collection. */
  public has(codeword: string): boolean {
    return -1 !== this.find(codeword);
  }

  /** Get a codeword string, if it exists. */
  public get(index: number): string | null {
    if (this.mCodewords[index]) {
      return `${this.mCodewords[index]}`;
    }
    return null;
  }

  /** Remove a codeword at a given index. */
  public rem(index: number): boolean {
    if (this.get(index)) {
      this.mCodewords[index] = null;
      return true;
    }
    return false;
  }

  /** Find the codeword that matches the given string */
  public find(codeword: string): number {
    let index = -1;
    const uCodeword = `${codeword}`.toUpperCase();
    this.forEach((iCodeword: string, iIndex: number, terminate: () => void) => {
      if (iCodeword === uCodeword) {
        index = iIndex;
        terminate();
      }
    });
    return index;
  }

  /** Return the number of valid elements in this collection. */
  public count(): number {
    let count = 0;
    this.forEach(() => {
      ++count;
    });
    return count;
  }

  /** Iterate the valid elements in this collection. */
  public forEach(
    callback: (c: string, i: number, t: () => void) => void
  ): void {
    let terminate = false;
    const terminator = (): void => {
      terminate = true;
    };
    for (
      let iIndex = 0;
      !terminate && iIndex < this.mCodewords.length;
      ++iIndex
    ) {
      const codeword = this.mCodewords[iIndex];
      if (codeword) {
        callback(codeword.toString(), iIndex, terminator);
      }
    }
  }
}
