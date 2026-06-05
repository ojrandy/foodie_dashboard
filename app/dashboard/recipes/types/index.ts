export interface RecipeIngredient {
  name: string;
  amount: string;
  sub?: string;
}

export interface Recipe {
  id: string;
  name: string;
  category: "Student" | "Family" | "Budget" | "Healthy" | "Traditional";
  difficulty: "Easy" | "Medium" | "Hard";
  duration: number;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  costEstimate: number;
  ingredients: RecipeIngredient[];
  instructions: string[];
  description: string;
}

export interface RecipeStats {
  total: number;
  avgCost: number;
  avgDuration: number;
}
