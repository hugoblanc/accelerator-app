export interface PromptDto {
  id: string;
  text: string;
  name: string;
  promptVariables: PromptVariable[]
}


interface PromptVariable {
  id: string;
  promptId: string;
  value: string;
}
