export interface CreatePromptDto {
  text: string;
  description: string;
  name: string;
  categoryIds: string[];
  categoryNamesToCreate: string[];
}
