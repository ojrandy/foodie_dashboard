"use client";

import { useState, useMemo } from "react";
import type { Recipe, RecipeStats } from "../types";

const INITIAL_RECIPES: Recipe[] = [
  {
    id: "rec-1",
    name: "Egusi Soup Supreme",
    category: "Traditional",
    difficulty: "Medium",
    duration: 45,
    calories: 520,
    protein: 28,
    carbs: 12,
    fats: 42,
    costEstimate: 4500,
    description: "Rich, aromatic West African melon seed soup packed with spinach, dried fish, and premium Cameroonian spices.",
    ingredients: [
      { name: "Egusi seeds (ground)", amount: "2 cups", sub: "Pumpkin seeds" },
      { name: "Spinach / Pumpkin leaves", amount: "3 cups (chopped)" },
      { name: "Beef & Tripe (cooked)", amount: "500g" },
      { name: "Dried fish / Stockfish", amount: "2 pieces" },
      { name: "Palm oil", amount: "1/2 cup" },
      { name: "Crayfish (ground)", amount: "2 tbsp" },
    ],
    instructions: [
      "Mix ground Egusi with a tiny bit of water to form thick paste clumps.",
      "Heat palm oil in a pot and sauté sliced onions for 3 minutes.",
      "Add the Egusi paste clumps and fry gently for 10 minutes until golden.",
      "Pour in beef stock, dried fish, and cooked beef. Simmer for 15 minutes.",
      "Fold in chopped spinach and ground crayfish. Cover and steam for 5 minutes.",
      "Serve hot with yellow Garri or Fufu.",
    ],
  },
  {
    id: "rec-2",
    name: "Ndole Supreme Plan",
    category: "Traditional",
    difficulty: "Hard",
    duration: 60,
    calories: 680,
    protein: 34,
    carbs: 18,
    fats: 50,
    costEstimate: 5500,
    description: "The crown jewel of Cameroonian cuisine. Stewed bitterleaf nuts enriched with peanuts, shrimp, and premium beef.",
    ingredients: [
      { name: "Bitterleaf (washed clean)", amount: "3 cups" },
      { name: "Raw peanuts (boiled & paste)", amount: "2 cups" },
      { name: "Fresh shrimp / prawns", amount: "200g" },
      { name: "Beef pieces (boiled)", amount: "300g" },
      { name: "Onions (sliced)", amount: "2 medium" },
      { name: "Garlic & Ginger paste", amount: "1 tbsp" },
    ],
    instructions: [
      "Boil raw peanuts for 15 minutes, drain, and blend into a smooth cream.",
      "Heat a large pot, add beef, blended garlic/ginger, and boil until tender.",
      "Add peanut cream to the beef stock and simmer on low heat for 15 minutes, stirring constantly.",
      "Stir in washed bitterleaf and cook for another 10 minutes.",
      "In a separate pan, heat vegetable oil, sauté remaining onions, and fry shrimp until pink.",
      "Pour hot oil, onions, and shrimp over the pot of Ndole. Mix gently and serve.",
    ],
  },
  {
    id: "rec-3",
    name: "Achu Special",
    category: "Traditional",
    difficulty: "Hard",
    duration: 75,
    calories: 590,
    protein: 22,
    carbs: 70,
    fats: 24,
    costEstimate: 6000,
    description: "Traditional delicacy from the Northwest region. Smooth pounded coco-yams served with rich, aromatic yellow limestone soup.",
    ingredients: [
      { name: "Coco-yams (taro)", amount: "6 large" },
      { name: "Achu soup spices (traditional)", amount: "3 tbsp" },
      { name: "Limestone / Kanwa powder", amount: "1 tsp" },
      { name: "Red Palm oil", amount: "1 cup" },
      { name: "Smoked cow skin (Canda)", amount: "200g" },
    ],
    instructions: [
      "Boil unpeeled coco-yams until completely soft, peel, and pound in a mortar until smooth.",
      "Heat palm oil slightly in a bowl, mix Kanwa with warm water, and strain into the oil, stirring to emulsify into a yellow soup.",
      "Add Achu spices and stock to the yellow mixture and stir thoroughly.",
      "Plate the pounded coco-yam paste with a central well filled with warm yellow soup, cow skin, and smoked fish.",
    ],
  },
  {
    id: "rec-4",
    name: "Student Budget Cup",
    category: "Student",
    difficulty: "Easy",
    duration: 15,
    calories: 340,
    protein: 10,
    carbs: 45,
    fats: 8,
    costEstimate: 800,
    description: "Extremely affordable, rapid-fuel student rice combo prepared with sliced tomatoes, eggs, and dynamic localized spices.",
    ingredients: [
      { name: "Parboiled Rice", amount: "1.5 cups" },
      { name: "Fresh eggs", amount: "2 units", sub: "Fried tofu" },
      { name: "Tomatoes & Pepper", amount: "2 chopped" },
      { name: "Vegetable oil", amount: "2 tbsp" },
    ],
    instructions: [
      "Parboil rice for 10 minutes and drain.",
      "Heat vegetable oil, fry onions and tomatoes for 3 minutes, then crack in eggs to scramble.",
      "Stir in rice and cook for 5 minutes until fluffy.",
    ],
  },
  {
    id: "rec-5",
    name: "Molyko Student Cup",
    category: "Student",
    difficulty: "Easy",
    duration: 12,
    calories: 410,
    protein: 14,
    carbs: 55,
    fats: 10,
    costEstimate: 950,
    description: "Highly energetic Molyko student staple consisting of stewed spaghetti, local seasoning, and egg strips.",
    ingredients: [
      { name: "Spaghetti noodles", amount: "1 pack" },
      { name: "Egg (scrambled)", amount: "1 unit" },
      { name: "Tomato paste", amount: "1 tbsp" },
    ],
    instructions: [
      "Boil spaghetti for 8 minutes and drain.",
      "Sauté tomato paste and onions in oil, mix in scrambled egg and spaghetti. Serve hot.",
    ],
  },
  {
    id: "rec-6",
    name: "Koki Wrap Plan",
    category: "Budget",
    difficulty: "Medium",
    duration: 50,
    calories: 480,
    protein: 18,
    carbs: 40,
    fats: 20,
    costEstimate: 1500,
    description: "Budget-friendly steamed black-eyed pea pudding enriched with palm oil, wrapped beautifully in banana leaves.",
    ingredients: [
      { name: "Black-eyed beans", amount: "2 cups" },
      { name: "Palm oil", amount: "1/2 cup" },
      { name: "Cocoyam leaves (young)", amount: "5 leaves" },
    ],
    instructions: [
      "Soak beans, peel skins, and blend into a thick, smooth paste.",
      "Stir palm oil into paste until bright orange-yellow and fluffy.",
      "Wrap paste in banana leaves with cocoyam leaves, steam for 40 minutes.",
    ],
  },
];

export function useRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>(INITIAL_RECIPES);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortBy, setSortBy] = useState<"name" | "cost" | "duration">("name");

  const filteredRecipes = useMemo(() => {
    return recipes
      .filter((r) => {
        const matchesSearch =
          r.name.toLowerCase().includes(search.toLowerCase()) ||
          r.description.toLowerCase().includes(search.toLowerCase());
        const matchesCategory =
          categoryFilter === "All" || r.category === categoryFilter;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        if (sortBy === "name") return a.name.localeCompare(b.name);
        if (sortBy === "cost") return a.costEstimate - b.costEstimate;
        if (sortBy === "duration") return a.duration - b.duration;
        return 0;
      });
  }, [recipes, search, categoryFilter, sortBy]);

  const stats: RecipeStats = useMemo(() => {
    const total = recipes.length;
    const avgCost = Math.round(
      recipes.reduce((sum, r) => sum + r.costEstimate, 0) / total
    );
    const avgDuration = Math.round(
      recipes.reduce((sum, r) => sum + r.duration, 0) / total
    );
    return { total, avgCost, avgDuration };
  }, [recipes]);

  const handleDelete = (id: string) => {
    setRecipes((prev) => prev.filter((r) => r.id !== id));
  };

  const categories = useMemo(
    () => [...new Set(recipes.map((r) => r.category))],
    [recipes]
  );

  return {
    recipes,
    filteredRecipes,
    stats,
    search,
    setSearch,
    categoryFilter,
    setCategoryFilter,
    sortBy,
    setSortBy,
    handleDelete,
    categories,
  };
}
