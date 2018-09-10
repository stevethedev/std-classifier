import { IClassification } from '../classification/interface';

export interface IDisseminationConstruct {
  dsen ?: boolean;
  fouo ?: boolean;
  imcon ?: boolean;
  noforn ?: boolean;
  orcon ?: boolean;
  propin ?: boolean;
  relido ?: boolean;
  rsen ?: boolean;

  rel ?: string[];
  eyes ?: string[];
}

export interface IDissemination {
  toString(classification: IClassification): string;
  toJSON(): IDisseminationConstruct;

  setRsen(rsen: boolean): IDissemination;
  isRsen(): boolean;

  setImcon(imcon: boolean): IDissemination;
  isImcon(): boolean;

  setRelido(relido: boolean): IDissemination;
  isRelido(): boolean;

  setFouo(fouo: boolean): IDissemination;
  isFouo(): boolean;

  setOrcon(orcon: boolean): IDissemination;
  isOrcon(): boolean;

  setNoforn(noforn: boolean): IDissemination;
  isNoforn(): boolean;

  setPropin(propin: boolean): IDissemination;
  isPropin(): boolean;

  setDsen(dsen: boolean): IDissemination;
  isDsen(): boolean;

  getRel(): string[];
  addRel(nation: string): IDissemination;
  hasRel(nation: string): boolean;
  remRel(nation: string): boolean;

  getEyes(): string[];
  addEyes(nation: string): IDissemination;
  hasEyes(nation: string): boolean;
  remEyes(nation: string): boolean;
}
