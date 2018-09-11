/**
 * The Codeword Interface defines the contract for how the Codeword class will
 * interact with the rest of the code-base. This fulfills a similar function
 * as a header file in C; it separates class definition & implementation.
 */

export interface ICodeword {
  // This method is used to convert the codeword from its internal
  // representation (a class instance) to the more familiar text
  // based representation that humans are used to in practice.
  toString(): string;
  toJSON(): string;

  getCodeword(): string;
  setCodeword(codeword: string): ICodeword;
}
