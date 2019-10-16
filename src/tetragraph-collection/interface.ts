import { ICollection } from "../collection/interface";
import { ITetragraph, ITetragraphConstruct } from "../tetragraph/interface";

export interface ITetragraphCollection extends ICollection<ITetragraph> {
  emplace(construct: ITetragraphConstruct): number;
  hasName(name: string): boolean;
  findName(name: string): number;
}
