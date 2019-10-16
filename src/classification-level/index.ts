import { CLASSIFICATION_LEVEL } from "./enum";
import { IClassificationLevel } from "./interface";

export { CLASSIFICATION_LEVEL };

export class ClassificationLevel implements IClassificationLevel {
  private mLevel: CLASSIFICATION_LEVEL = CLASSIFICATION_LEVEL.UNCLASSIFIED;

  public constructor(
    level: CLASSIFICATION_LEVEL = CLASSIFICATION_LEVEL.UNCLASSIFIED
  ) {
    this.mLevel = level;
  }

  public setLevel(level: CLASSIFICATION_LEVEL): ClassificationLevel {
    this.mLevel = level;
    return this;
  }

  public getLevel(): CLASSIFICATION_LEVEL {
    return this.mLevel;
  }

  public toString(): string {
    switch (true) {
      case CLASSIFICATION_LEVEL.UNCLASSIFIED === this.mLevel:
        return "UNCLASSIFIED";

      case CLASSIFICATION_LEVEL.RESTRICTED === this.mLevel:
        // US doesn't have a "restricted" level anymore. Guidance is to use
        // "Confidential" instead.
        return "CONFIDENTIAL";

      case CLASSIFICATION_LEVEL.CONFIDENTIAL === this.mLevel:
        return "CONFIDENTIAL";

      case CLASSIFICATION_LEVEL.SECRET === this.mLevel:
        return "SECRET";

      case CLASSIFICATION_LEVEL.TOP_SECRET === this.mLevel:
        return "TOP SECRET";

      default:
        break;
    }

    throw new Error(`Unsupported classification level [${this.mLevel}]`);
  }

  public toJSON(): CLASSIFICATION_LEVEL {
    return this.mLevel;
  }
}
