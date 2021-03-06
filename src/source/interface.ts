export interface ISourceConstruct {
  name?: null | string;
  authors?: string[];
}

export interface ISource {
  toJSON(): ISourceConstruct;
  getName(): string | null;
  getAuthors(): string[];
}
