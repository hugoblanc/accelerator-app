import { GPTModel } from '../../contribute/gtp-model.enum';

export interface CreatePromptDto {
  text: string;
  description: string;
  name: string;
  model: GPTModel;
  categoryIds: string[];
  categoryNamesToCreate: string[];
}
