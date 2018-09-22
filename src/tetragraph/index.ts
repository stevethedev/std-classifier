import { ITetragraph, ITetragraphConstruct } from './interface';

export class Tetragraph implements ITetragraph {
  private mName: string = '';
  private readonly mTrigraphs: string[] = [];

  constructor({ name, trigraphs = [] }: ITetragraphConstruct) {
    this.setName(name);
    trigraphs.forEach((trigraph: string) => this.addTrigraph(trigraph));
  }

  public getName(): string {
    return this.mName;
  }

  public setName(name: string): void {
    this.mName = name;
  }

  public hasTrigraph(trigraph: string): boolean {
    return this.mTrigraphs.includes(`${trigraph}`.toUpperCase());
  }

  public addTrigraph(trigraph: string): boolean {
    if (!this.hasTrigraph(trigraph)) {
      this.mTrigraphs.push(`${trigraph}`.toUpperCase());
      return true;
    }

    return false;
  }

  public remTrigraph(trigraph: string): boolean {
    const ucTrigraph = `${trigraph}`.toUpperCase();
    for (let iTrigraph = 0; iTrigraph < this.mTrigraphs.length; ++iTrigraph) {
      if (ucTrigraph === this.mTrigraphs[iTrigraph]) {
        this.mTrigraphs.splice(iTrigraph, 1);
        return true;
      }
    }
    return false;
  }

  public getTrigraphs(): string[] {
    return this.mTrigraphs.slice().sort();
  }
}
