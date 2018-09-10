import { Classification } from '.';

export class ClassificationCollection
{
  private mClassifications: Array<Classification|null> = [];

  public add(classification: Classification) {
    return this.mClassifications.push(classification);
  }

  public get(index: number): Classification|null {
    return this.mClassifications[index]
      ? this.mClassifications[index]
      : null;
  }

  public rem(index: number): boolean {
    if (this.get(index)) {
      this.mClassifications[index] = null;
      return true;
    }
    return false;
  }

  public reduce(): Classification {
    const result = new Classification();
    const { mClassifications } = this;

    for (let iClassification = 0; iClassification < mClassifications.length; ++iClassification) {
      const classification = mClassifications[iClassification];
      if (!classification) {
        continue;
      }

      result.setClassificationLevel(Math.max(
        result.getClassificationLevel(),
        classification.getClassificationLevel(),
      ));

      result.addNonIC(...classification.getNonIC());

      result.setDsen(result.isDsen() || classification.isDsen());
      result.setFouo(result.isFouo() || classification.isFouo());
      result.setNoforn(result.isNoforn() || classification.isNoforn());
      result.setOrcon(result.isOrcon() || classification.isOrcon());
      result.setPropin(result.isPropin() || classification.isPropin());
      result.setRelido(result.isRelido() || classification.isRelido());
      result.setRsen(result.isRsen() || classification.isRsen());
      result.addRel(...[...result.getRel(), ...classification.getRel()]);
      result.addEyes(...[...result.getEyes(), ...classification.getEyes()]);

      result.addCodeword(...classification.getCodewords());
      result.addFgi(...classification.getFgi());
    }

    return result;
  }
};
