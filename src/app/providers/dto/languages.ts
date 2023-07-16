export class Language {
  value!: string;
  name!: string;
  flag!: string;
}

export const languagesList: Language[] = [
  {value: 'en', name: 'English', flag: 'gb'},
  {value: 'de', name: 'German', flag: 'de'},
  {value: 'fr', name: 'French', flag: 'fr'},
  {value: 'it', name: 'Italian', flag: 'it'},
  {value: 'es', name: 'Spanish', flag: 'es'},
  {value: 'pl', name: 'Polish', flag: 'pl'},
  {value: 'nl', name: 'Dutch', flag: 'nl'},
  {value: 'ro', name: 'Romanian', flag: 'ro'},
  {value: 'hu', name: 'Hungarian', flag: 'hu'},
]

export function getFlagByLanguage(language: string): string | undefined {
  return languagesList.find(item => item.value === language)?.flag;
}
