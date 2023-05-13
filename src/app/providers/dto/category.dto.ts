export interface CategoryDto {
  id: string;
  name: string;
}

export const categoriesList: CategoryDto[] = [
  { id: '1', name: 'Business' },
  { id: '2', name: 'Talent Acquisition' },
  { id: '3', name: 'IT Development' },
  { id: '4', name: 'Project Management' },
];
