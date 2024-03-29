import { GPTModel } from '../../contribute/gtp-model.enum';

export interface PromptDto {
  id: string;
  text: string;
  description: string;
  name: string;
  promptVariables?: Variable[]
  categories?: Category[]
  lang: string;
  userId: string;
  opened: boolean;
}

export interface PromptToEditDto {
  id: string;
  text: string;
  model: GPTModel;
  description: string;
  name: string;
  categories: Category[]
  lang: string;
  opened: boolean;
  teamId: string;
}


interface Category {
  id: string;
  name: string;
}

interface Variable {
  id: string;
  promptId: string;
  value: string;
  key: string;
  type: VariableType;
}

export enum VariableType {
  text = 'text',
  longText = 'longText',
  pdf = 'pdf'
}
