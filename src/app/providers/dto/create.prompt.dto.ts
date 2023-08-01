import { GPTModel } from '../../contribute/gtp-model.enum';

export interface CreatePromptDto {
  text: string;
  description: string;
  name: string;
  model: GPTModel;
  opened: boolean;
  categoryIds: string[];
  categoryNamesToCreate: string[];
  lang: string;
  teamId: string | null;
}

export interface EditPromptDto extends CreatePromptDto { id: string };
