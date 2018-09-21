export interface ITetragraphConstruct {
  name: string;
  trigraphs: string[];
}

export interface ITetragraph {
  getName(): string;
  setName(name: string): void;

  hasTrigraph(trigraph: string): boolean;
  addTrigraph(trigraph: string): boolean;
  remTrigraph(trigraph: string): boolean;
  getTrigraphs(): string[];
}
