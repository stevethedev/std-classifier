import { ICollection } from '../collection/interface';
import { ITetragraph } from '../tetragraph/interface';

export interface ITetragraphCollection extends ICollection<ITetragraph> {
  hasName(name: string): boolean;
  findName(name: string): number;
}
