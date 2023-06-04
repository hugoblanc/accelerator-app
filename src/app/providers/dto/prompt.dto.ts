export interface PromptDto {
  id: string;
  text: string;
  name: string;
  promptVariables?: Variable[]
  categories?: Category[]

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
  longText = 'longText'
}
