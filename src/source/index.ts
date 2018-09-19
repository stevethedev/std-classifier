import { ISource, ISourceConstruct } from './interface';

export class Source implements ISource {
  private mName: string | null;
  private mAuthors: string[] = [];

  constructor({ name = null, authors = [] }: ISourceConstruct) {
    this.mName = name;
    this.mAuthors.splice(0, 0, ...authors);
  }

  public toJSON(): ISourceConstruct {
    return {
      authors: this.getAuthors().sort(),
      name: this.mName,
    };
  }

  public getName(): string | null {
    return this.mName;
  }

  public getAuthors(): string[] {
    return this.mAuthors.slice(0);
  }
}
