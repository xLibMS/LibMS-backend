import { ModelBase } from '../model.base.interface';

export interface Image extends ModelBase {
  imageName: string;
  imageType: string;
  imageSize: number;
}
