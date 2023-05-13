export interface PromptDto {
  id: string;
  text: string;
  name: string;
  promptVariables?: Variable[]
  categories?: Categorie[]

}

export const promptsList: PromptDto[] = [
  {
    id: '1',
    text: 'You will be able to choose ton, subject and more for a fucking good job offer',
    name: 'Job offer generation',
  },
  {
    id: '2',
    text: 'You will be able to choose ton, subject and more for a fucking good job offer',
    name: 'User Story Generation'
  },
  {
    id: '3',
    text: 'You will be able to choose ton, subject and more for a fucking good job offer',
    name: 'Question for Job Interview'
  },
  {
    id: '4',
    text: 'You will be able to choose ton, subject and more for a fucking good job offer',
    name: 'Real Estate Offer Generation'
  }
];


interface Categorie {
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
