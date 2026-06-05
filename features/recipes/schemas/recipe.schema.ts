import { z } from "zod";

export const ingredientSchema = z.object({
  name: z.string().min(2, "Ingredient name must be at least 2 characters"),
  amount: z.string().min(1, "Amount is required"),
  sub: z.string().optional(),
});

export const recipeSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3, "Recipe name must be at least 3 characters"),
  category: z.enum([
    "Traditional", 
    "Student", 
    "Budget", 
    "Healthy", 
    "Family", 
    "Breakfast", 
    "Lunch", 
    "Dinner", 
    "Snacks"
  ]),
  difficulty: z.enum(["Easy", "Medium", "Hard"]),
  duration: z.number().min(1, "Duration must be at least 1 minute"),
  calories: z.number().min(0, "Calories cannot be negative"),
  protein: z.number().min(0, "Protein cannot be negative"),
  carbs: z.number().min(0, "Carbs cannot be negative"),
  fats: z.number().min(0, "Fats cannot be negative"),
  costEstimate: z.number().min(0, "Cost must be a positive number"),
  description: z.string().min(10, "Description must be at least 10 characters long"),
  ingredients: z.array(ingredientSchema).min(1, "At least one ingredient is required"),
  instructions: z.array(z.object({ step: z.string().min(3, "Instruction step too short") })).min(1, "At least one instruction step is required"),
  thumbnailUrl: z.string().url("Must be a valid URL").or(z.literal("")).optional(),
  videoUrl: z.string().url("Must be a valid URL").or(z.literal("")).optional(),
  views: z.number().optional(),
  orders: z.number().optional(),
  isTrending: z.boolean().optional(),
});

export type RecipeFormData = z.infer<typeof recipeSchema>;
