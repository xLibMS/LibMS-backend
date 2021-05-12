import { ModelBase } from '../model.base.interface';

export interface Image extends ModelBase {
  name: string;
  mimeType: string;
  size: number;
}
