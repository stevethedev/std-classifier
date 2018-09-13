import { CLASSIFICATION_LEVEL } from '../classification-level/enum';
import { IFgi, IFgiConstruct } from './interface';

export class Fgi implements IFgi {
  private readonly mFgi: string;
  private readonly mLevel: CLASSIFICATION_LEVEL;

  constructor({ owner, level = 0 }: IFgiConstruct) {
    this.mFgi = owner;
    this.mLevel = level;
  }

  public getOwner(): string {
    return this.mFgi;
  }

  public getLevel(): CLASSIFICATION_LEVEL {
    return this.mLevel;
  }

  public toString(): string {
    const result = [this.mFgi];
    switch (true) {
      case this.mLevel === CLASSIFICATION_LEVEL.UNCLASSIFIED:
        result.push('UNCLASSIFIED');
        break;
      case this.mLevel === CLASSIFICATION_LEVEL.RESTRICTED:
        result.push('RESTRICTED');
        break;
      case this.mLevel === CLASSIFICATION_LEVEL.CONFIDENTIAL:
        result.push('CONFIDENTIAL');
        break;
      case this.mLevel === CLASSIFICATION_LEVEL.SECRET:
        result.push('SECRET');
        break;
      case this.mLevel === CLASSIFICATION_LEVEL.TOP_SECRET:
        result.push('TOP SECRET');
        break;
      default:
        break;
    }
    return result.join(' ');
  }

  public toJSON(): IFgiConstruct {
    return {
      level: this.getLevel(),
      owner: this.getOwner(),
    };
  }
}
