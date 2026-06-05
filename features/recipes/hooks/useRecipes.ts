import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Recipe, MOCK_RECIPES } from "../data/mockRecipes";
import { RecipeFormData } from "../schemas/recipe.schema";
import { toast } from "sonner";

// Simulated network delay
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

const LOCAL_STORAGE_KEY = "foodops_recipes_db";

const getDB = (): Recipe[] => {
  if (typeof window === "undefined") return MOCK_RECIPES;
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return MOCK_RECIPES;
    }
  }
  return MOCK_RECIPES;
};

const saveDB = (db: Recipe[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(db));
  }
};

export const useRecipes = () => {
  return useQuery({
    queryKey: ["recipes"],
    queryFn: async () => {
      await delay(400);
      return getDB();
    }
  });
};

export const useCreateRecipe = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: RecipeFormData) => {
      await delay(600); // Simulate network
      const newRecipe: Recipe = {
        ...data,
        id: `rec-${Date.now()}`,
        // Mapping schema string arrays/objects to exact shapes if needed
        ingredients: data.ingredients,
        instructions: data.instructions.map(i => i.step),
      };
      const db = getDB();
      const updatedDB = [newRecipe, ...db];
      saveDB(updatedDB);
      return newRecipe;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
      toast.success("Recipe published successfully");
    },
    onError: (error) => {
      toast.error("Failed to publish recipe");
      console.error(error);
    }
  });
};

export const useDeleteRecipe = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      await delay(400);
      const db = getDB();
      const updatedDB = db.filter(r => r.id !== id);
      saveDB(updatedDB);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
      toast.success("Recipe archived successfully");
    }
  });
};

export const useUpdateRecipe = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: RecipeFormData }) => {
      await delay(600);
      const db = getDB();
      const index = db.findIndex(r => r.id === id);
      if (index === -1) throw new Error("Recipe not found");
      
      const updatedRecipe: Recipe = {
        ...db[index],
        ...data,
        ingredients: data.ingredients,
        instructions: data.instructions.map(i => i.step),
      };
      
      const newDB = [...db];
      newDB[index] = updatedRecipe;
      saveDB(newDB);
      return updatedRecipe;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
      toast.success("Recipe updated successfully");
    },
    onError: (error) => {
      toast.error("Failed to update recipe");
      console.error(error);
    }
  });
};
