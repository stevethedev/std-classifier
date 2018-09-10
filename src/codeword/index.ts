import { ICodeword } from './interface';

export class Codeword implements ICodeword
{
  private mCodeword: string = '';

  constructor(codeword: string) {
    this.setCodeword(codeword);
  }

  public getCodeword(): string {
    return this.mCodeword;
  }

  public setCodeword(codeword: string): Codeword {
    this.mCodeword = codeword;
    return this;
  }

  public toString(): string {
    return this.mCodeword.toUpperCase();
  }
};
