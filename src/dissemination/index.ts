import { CLASSIFICATION_LEVEL } from "../classification-level/enum";
import { IClassification } from "../classification/interface";
import { TetragraphCollection } from "../tetragraph-collection";
import { ITetragraph } from "../tetragraph/interface";
import { IDissemination, IDisseminationConstruct } from "./interface";

const sortTetragraphs = (
  rel: string[]
): { tetragraphs: string[]; trigraphs: string[] } => {
  const tc = TetragraphCollection.getSingleton();
  const tetragraphs: string[] = [];
  const trigraphs: string[] = [];

  // Categorize everything as "tetragraph" or "non-tetragraph"
  for (const item of rel) {
    (tc.hasName(item) ? tetragraphs : trigraphs).push(item);
  }

  // Strip out everything that is part of a tetragraph
  for (const nTetragraph of tetragraphs) {
    const tetragraph = tc.get(tc.findName(nTetragraph)) as ITetragraph;
    for (let iItem = 0; iItem < trigraphs.length; ++iItem) {
      if (tetragraph.hasTrigraph(trigraphs[iItem])) {
        trigraphs.splice(iItem--, 1);
      }
    }
  }

  return { tetragraphs, trigraphs };
};

const reduceEyes = (rel: string[], eyes: string[]): string => {
  const result: string[] = eyes.slice();
  if (rel.length) {
    for (let iResult = 0; iResult < result.length; ++iResult) {
      if (-1 === rel.indexOf(result[iResult])) {
        result.splice(iResult--, 1);
      }
    }
  }

  const {
    tetragraphs,
    trigraphs
  }: { tetragraphs: string[]; trigraphs: string[] } = sortTetragraphs(result);

  return `USA/${[...tetragraphs, ...trigraphs].join("/")} EYES ONLY`;
};

const reduceRel = (rel: string[]): string => {
  const {
    tetragraphs,
    trigraphs
  }: { tetragraphs: string[]; trigraphs: string[] } = sortTetragraphs(rel);
  const result = ["USA", ...tetragraphs, ...trigraphs];
  const last = result.pop();
  return `REL TO ${result.join(", ")} and ${last}`;
};

const reduceReleasability = (
  noforn: boolean,
  rel: string[],
  eyes: string[]
): string => {
  if (noforn) {
    return "NOFORN";
  }

  if (eyes.length) {
    return reduceEyes(rel, eyes);
  }

  if (rel.length) {
    return reduceRel(rel);
  }

  return "";
};

const reduceFouo = (level: number, fouo: boolean): string => {
  if (level !== CLASSIFICATION_LEVEL.UNCLASSIFIED) {
    return "";
  }
  return fouo ? "FOR OFFICIAL USE ONLY" : "";
};
const reduceRsen = (rsen: boolean): string => (rsen ? "RSEN" : "");
const reduceOrcon = (orcon: boolean): string => (orcon ? "ORCON" : "");
const reducePropin = (propin: boolean): string => (propin ? "PROPIN" : "");
const reduceDsen = (dsen: boolean): string => (dsen ? "DEA SENSITIVE" : "");
const reduceRelido = (relido: boolean): string => (relido ? "RELIDO" : "");
const reduceImcon = (imcon: boolean): string => (imcon ? "IMCON" : "");
const reduceFisa = (fisa: boolean): string => (fisa ? "FISA" : "");

const combineRels = (aRel: string[], bRel: string[]): string[] => {
  // Sort the Dissemination and This REL TOs
  const tGroups = sortTetragraphs(aRel);
  const cGroups = sortTetragraphs(bRel);

  // Deduplicate the trigraphs, but check against the tetragraphs
  const trigraphs = cGroups.trigraphs.filter((trigraph: string): boolean => {
    if (tGroups.trigraphs.includes(trigraph)) {
      return true;
    }
    for (const tetragraph of [...cGroups.tetragraphs, ...tGroups.tetragraphs]) {
      const tc = TetragraphCollection.getSingleton();
      if (
        (tc.get(tc.findName(tetragraph)) as ITetragraph).hasTrigraph(trigraph)
      ) {
        return true;
      }
    }
    return false;
  });

  // Deduplicate the tetragraphs
  const tetragraphs = cGroups.tetragraphs.filter(
    (tetragraph: string): boolean => {
      return tGroups.tetragraphs.includes(tetragraph);
    }
  );

  return [...tetragraphs, ...trigraphs];
};

export class Dissemination implements IDissemination {
  private readonly mEyes: string[] = [];
  private readonly mRel: string[] = [];

  private mDsen: boolean = false;
  private mFouo: boolean = false;
  private mNoforn: boolean = false;
  private mOrcon: boolean = false;
  private mPropin: boolean = false;
  private mRsen: boolean = false;
  private mRelido: boolean = false;
  private mImcon: boolean = false;
  private mFisa: boolean = false;

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
    eyes = []
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
      reduceReleasability(this.mNoforn, this.mRel.sort(), this.mEyes.sort())
    ];
    return result.filter(Boolean).join(",");
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

      eyes: this.mEyes.slice(),
      rel: this.mRel.slice()
    };
  }

  public combine(...dissemination: IDissemination[]): void {
    for (const disseminate of dissemination) {
      this.setDsen(this.isDsen() || disseminate.isDsen());
      this.setFouo(this.isFouo() || disseminate.isFouo());
      this.setNoforn(this.isNoforn() || disseminate.isNoforn());
      this.setOrcon(this.isOrcon() || disseminate.isOrcon());
      this.setPropin(this.isPropin() || disseminate.isPropin());
      this.setRelido(this.isRelido() || disseminate.isRelido());
      this.setRsen(this.isRsen() || disseminate.isRsen());

      const aRel = this.getRel();
      const bRel = disseminate.getRel();

      this.mRel.length = 0;
      this.mRel.push(...combineRels(aRel, bRel));

      const aEyes = this.getEyes();
      const bEyes = disseminate.getEyes();

      this.mEyes.length = 0;
      this.mEyes.push(...combineRels(aEyes, bEyes));
    }
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
  public isOrcon(): boolean {
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
