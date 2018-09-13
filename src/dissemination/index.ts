import { CLASSIFICATION_LEVEL } from '../classification-level/enum';
import { IClassification } from '../classification/interface';
import { IDissemination, IDisseminationConstruct } from './interface';

const reduceReleasability = (noforn: boolean, rel: string[], eyes: string[]): string => {
  if (noforn) {
    return 'NOFORN';
  }

  if (eyes.length) {
    const result: string[] = eyes.slice();
    if (rel.length) {
      for (let iResult = 0; iResult < result.length; ++iResult) {
        if (-1 === rel.indexOf(result[iResult])) {
          result.splice(iResult--, 1);
        }
      }
    }
    return `USA/${result.join('/')} EYES ONLY`;
  }

  if (rel.length) {
    let result = 'REL TO USA';
    for (let iRel = 1; iRel < rel.length; ++iRel) {
      result += `, ${rel[iRel - 1]}`;
    }
    return `${result} and ${rel[rel.length - 1]}`;
  }

  return '';
};

const reduceFouo = (level: number, fouo: boolean): string => {
  if (level !== CLASSIFICATION_LEVEL.UNCLASSIFIED) {
    return '';
  }
  return (fouo ? 'FOR OFFICIAL USE ONLY' : '');
};
const reduceRsen = (rsen: boolean): string => (rsen ? 'RSEN' : '');
const reduceOrcon = (orcon: boolean): string => (orcon ? 'ORCON' : '');
const reducePropin = (propin: boolean): string => (propin ? 'PROPIN' : '');
const reduceDsen = (dsen: boolean): string => (dsen ? 'DEA SENSITIVE' : '');
const reduceRelido = (relido: boolean): string => (relido ? 'RELIDO' : '');
const reduceImcon = (imcon: boolean): string => (imcon ? 'IMCON' : '');
const reduceFisa = (fisa: boolean): string => (fisa ? 'FISA' : '');

export class Dissemination implements IDissemination {
  private readonly mEyes:   string[] = [];
  private readonly mRel:    string[] = [];

  private mDsen:   boolean = false;
  private mFouo:   boolean = false;
  private mNoforn: boolean = false;
  private mOrcon:  boolean = false;
  private mPropin: boolean = false;
  private mRsen:   boolean = false;
  private mRelido: boolean = false;
  private mImcon:  boolean = false;
  private mFisa:   boolean = false;

  constructor({
    dsen = false,
    fouo = false,
    imcon = false,
    noforn = false,
    orcon = false,
    propin = false,
    relido = false,
    rsen = false,
    rel = [],
    eyes = [],
  }: IDisseminationConstruct = {}) {
    this.setDsen(dsen);
    this.setFouo(fouo);
    this.setImcon(imcon);
    this.setNoforn(noforn);
    this.setOrcon(orcon);
    this.setPropin(propin);
    this.setRelido(relido);
    this.setRsen(rsen);

    rel.forEach(this.addRel.bind(this));
    eyes.forEach(this.addEyes.bind(this));
  }

  public toString(classification: IClassification): string {
    const result: string[] = [
      reduceFouo(classification.getClassificationLevel(), this.mFouo),
      reduceRsen(this.mRsen),
      reduceOrcon(this.mOrcon),
      reducePropin(this.mPropin),
      reduceDsen(this.mDsen),
      reduceRelido(this.mRelido),
      reduceImcon(this.mImcon),
      reduceFisa(this.mFisa),
      reduceReleasability(this.mNoforn, this.mRel.sort(), this.mEyes.sort()),
    ];
    return result.filter((x) => x).join(',');
  }

  public toJSON(): IDisseminationConstruct {
    return {
      dsen: this.isDsen(),
      fouo: this.isFouo(),
      imcon: this.isImcon(),
      noforn: this.isNoforn(),
      orcon: this.isOrcon(),
      propin: this.isPropin(),
      relido: this.isRelido(),
      rsen: this.isRsen(),

      eyes: this.mEyes.map((eye: string) => eye),
      rel: this.mRel.map((rel: string) => rel),
    };
  }

  public setRsen(rsen: boolean): Dissemination {
    this.mRsen = rsen;
    return this;
  }
  public isRsen(): boolean {
    return this.mRsen;
  }

  public setFisa(fisa: boolean): Dissemination {
    this.mFisa = fisa;
    return this;
  }
  public isFisa(): boolean {
    return this.mFisa;
  }

  public setImcon(imcon: boolean): Dissemination {
    this.mImcon = imcon;
    return this;
  }
  public isImcon(): boolean {
    return this.mImcon;
  }

  public setRelido(relido: boolean): Dissemination {
    this.mRelido = relido;
    return this;
  }
  public isRelido(): boolean {
    return this.mRelido;
  }

  public setFouo(fouo: boolean): Dissemination {
    this.mFouo = fouo;
    return this;
  }
  public isFouo(): boolean {
    return this.mFouo;
  }

  public setOrcon(orcon: boolean): Dissemination {
    this.mOrcon = orcon;
    return this;
  }
  public isOrcon(): boolean  {
    return this.mOrcon;
  }

  public setNoforn(noforn: boolean): Dissemination {
    this.mNoforn = noforn;
    return this;
  }
  public isNoforn(): boolean {
    return this.mNoforn;
  }

  public setPropin(propin: boolean): Dissemination {
    this.mPropin = propin;
    return this;
  }
  public isPropin(): boolean {
    return this.mPropin;
  }

  public setDsen(dsen: boolean): Dissemination {
    this.mDsen = dsen;
    return this;
  }
  public isDsen(): boolean {
    return this.mDsen;
  }

  public getRel(): string[] {
    return this.mRel.slice();
  }
  public addRel(nation: string): Dissemination {
    if (!this.hasRel(nation)) {
      this.mRel.push(nation.toUpperCase());
    }
    return this;
  }
  public hasRel(nation: string): boolean {
    for (const rel of this.mRel) {
      if (rel.toUpperCase() === nation.toUpperCase()) {
        return true;
      }
    }
    return false;
  }
  public remRel(nation: string): boolean {
    const { mRel }: Dissemination = this;
    const { length }: string[] = mRel;
    for (let iRel = 0; iRel < mRel.length; ++iRel) {
      if (mRel[iRel].toUpperCase() === nation.toUpperCase()) {
        mRel.splice(iRel--, 1);
      }
    }
    return length !== mRel.length;
  }

  public getEyes(): string[] {
    return this.mEyes.slice();
  }
  public addEyes(nation: string): Dissemination {
    if (!this.hasEyes(nation)) {
      this.mEyes.push(nation.toUpperCase());
    }
    return this;
  }
  public hasEyes(nation: string): boolean {
    for (const eye of this.mEyes) {
      if (eye.toUpperCase() === nation.toUpperCase()) {
        return true;
      }
    }
    return false;
  }
  public remEyes(nation: string): boolean {
    const { mEyes }: Dissemination = this;
    const { length }: string[] = mEyes;
    for (let iEyes = 0; iEyes < mEyes.length; ++iEyes) {
      if (mEyes[iEyes].toUpperCase() === nation.toUpperCase()) {
        mEyes.splice(iEyes--, 1);
      }
    }
    return length !== mEyes.length;
  }
}
