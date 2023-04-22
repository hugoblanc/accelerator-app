export interface PromptDto {
  id: string;
  text: string;
  name: string;
  promptVariables: Variable[]
  categories: Categorie[]

}


interface Categorie {
  id: string;
  name: string;
}

interface Variable {
  id: string;
  promptId: string;
  value: string;
}
