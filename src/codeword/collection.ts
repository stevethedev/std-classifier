/**
 * The Codeword Collection class is used to group multiple codewords together
 * into one container. This is mostly a convenience function; it is used to
 * centralize managing codewords for easier maintenance in the long-term.
 */

import { Codeword } from './index';

export class CodewordCollection {
  private mCodewords: Codeword[];

  constructor(codewords: string[] = []) {
    this.mCodewords = [];
    codewords.forEach(this.add.bind(this));
  }

  public get(): string[] {
    return this.mCodewords.map((codeword: Codeword) => codeword.getCodeword());
  }

  public add(codeword: string): CodewordCollection {
    if (!this.has(codeword)) {
      this.mCodewords.push(new Codeword(codeword));
    }
    return this;
  }

  public has(codeword: string): boolean {
    for (const iCodeword of this.mCodewords) {
      if (iCodeword.toString() === codeword) {
        return true;
      }
    }
    return false;
  }

  public rem(codeword: string): boolean {
    const { mCodewords }: CodewordCollection = this;
    const { length }: Codeword[] = mCodewords;
    for (let iCodeword = 0; iCodeword < mCodewords.length; ++iCodeword) {
      if (mCodewords[iCodeword].toString() === codeword) {
        mCodewords.splice(iCodeword--, 1);
      }
    }
    return length !== mCodewords.length;
  }

  public toString(): string {
    return this.mCodewords.join('/');
  }

  public toJSON(): string[] {
    return this.mCodewords.map((codeword: Codeword) => codeword.toJSON());
  }
}
