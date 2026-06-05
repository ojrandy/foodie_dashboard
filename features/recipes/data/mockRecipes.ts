import { RecipeFormData } from "../schemas/recipe.schema";

export interface Recipe extends Omit<RecipeFormData, "ingredients" | "instructions"> {
  id: string;
  ingredients: { name: string; amount: string; sub?: string }[];
  instructions: string[];
}

export const MOCK_RECIPES: Recipe[] = [
  {
    id: "rec-1",
    name: "Egusi Soup supreme",
    category: "Traditional",
    difficulty: "Medium",
    duration: 45,
    calories: 520,
    protein: 28,
    carbs: 12,
    fats: 42,
    costEstimate: 4500,
    thumbnailUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2000&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/embed/U3_hxO0x6nU",
    views: 12450,
    orders: 3200,
    isTrending: true,
    description: "Rich, aromatic West African melon seed soup packed with spinach, dried fish, and premium Cameroonian spices.",
    ingredients: [
      { name: "Egusi seeds (ground)", amount: "2 cups", sub: "Pumpkin seeds" },
      { name: "Spinach / Pumpkin leaves", amount: "3 cups (chopped)" },
      { name: "Beef & Tripe (cooked)", amount: "500g" },
      { name: "Dried fish / Stockfish", amount: "2 pieces" },
      { name: "Palm oil", amount: "1/2 cup" },
      { name: "Crayfish (ground)", amount: "2 tbsp" }
    ],
    instructions: [
      "Mix ground Egusi with a tiny bit of water to form thick paste clumps.",
      "Heat palm oil in a pot and sauté sliced onions for 3 minutes.",
      "Add the Egusi paste clumps and fry gently for 10 minutes until golden.",
      "Pour in beef stock, dried fish, and cooked beef. Simmer for 15 minutes.",
      "Fold in chopped spinach and ground crayfish. Cover and steam for 5 minutes.",
      "Serve hot with yellow Garri or Fufu."
    ]
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
    thumbnailUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2000&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/embed/5a2253L8wQc",
    views: 18900,
    orders: 4500,
    isTrending: true,
    description: "The crown jewel of Cameroonian cuisine. Stewed bitterleaf nuts enriched with peanuts, shrimp, and premium beef.",
    ingredients: [
      { name: "Bitterleaf (washed clean)", amount: "3 cups" },
      { name: "Raw peanuts (boiled & paste)", amount: "2 cups" },
      { name: "Fresh shrimp / prawns", amount: "200g" },
      { name: "Beef pieces (boiled)", amount: "300g" },
      { name: "Onions (sliced)", amount: "2 medium" },
      { name: "Garlic & Ginger paste", amount: "1 tbsp" }
    ],
    instructions: [
      "Boil raw peanuts for 15 minutes, drain, and blend into a smooth cream.",
      "Heat a large pot, add beef, blended garlic/ginger, and boil until tender.",
      "Add peanut cream to the beef stock and simmer on low heat for 15 minutes, stirring constantly.",
      "Stir in washed bitterleaf and cook for another 10 minutes.",
      "In a separate pan, heat vegetable oil, sauté remaining onions, and fry shrimp until pink.",
      "Pour hot oil, onions, and shrimp over the pot of Ndole. Mix gently and serve."
    ]
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
    thumbnailUrl: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=2000&auto=format&fit=crop",
    views: 5600,
    orders: 1200,
    isTrending: false,
    description: "Traditional delicacy from the Northwest region. Smooth pounded coco-yams served with rich, aromatic yellow limestone soup.",
    ingredients: [
      { name: "Coco-yams (taro)", amount: "6 large" },
      { name: "Achu soup spices (traditional)", amount: "3 tbsp" },
      { name: "Limestone / Kanwa powder", amount: "1 tsp" },
      { name: "Red Palm oil", amount: "1 cup" },
      { name: "Smoked cow skin (Canda)", amount: "200g" }
    ],
    instructions: [
      "Boil unpeeled coco-yams until completely soft, peel, and pound in a mortar until smooth.",
      "Heat palm oil slightly in a bowl, mix Kanwa with warm water, and strain into the oil, stirring to emulsify into a yellow soup.",
      "Add Achu spices and stock to the yellow mixture and stir thoroughly.",
      "Plate the pounded coco-yam paste with a central well filled with warm yellow soup, cow skin, and smoked fish."
    ]
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
    thumbnailUrl: "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=2000&auto=format&fit=crop",
    views: 22400,
    orders: 8900,
    isTrending: true,
    description: "Extremely affordable, rapid-fuel student rice combo prepared with sliced tomatoes, eggs, and dynamic localized spices.",
    ingredients: [
      { name: "Parboiled Rice", amount: "1.5 cups" },
      { name: "Fresh eggs", amount: "2 units", sub: "Fried tofu" },
      { name: "Tomatoes & Pepper", amount: "2 chopped" },
      { name: "Vegetable oil", amount: "2 tbsp" }
    ],
    instructions: [
      "Parboil rice for 10 minutes and drain.",
      "Heat vegetable oil, fry onions and tomatoes for 3 minutes, then crack in eggs to scramble.",
      "Stir in rice and cook for 5 minutes until fluffy."
    ]
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
    thumbnailUrl: "https://images.unsplash.com/photo-1552611052-33e04de081de?q=80&w=2000&auto=format&fit=crop",
    views: 14500,
    orders: 4100,
    isTrending: false,
    description: "Highly energetic Molyko student staple consisting of stewed spaghetti, local seasoning, and egg strips.",
    ingredients: [
      { name: "Spaghetti noodles", amount: "1 pack" },
      { name: "Egg (scrambled)", amount: "1 unit" },
      { name: "Tomato paste", amount: "1 tbsp" }
    ],
    instructions: [
      "Boil spaghetti for 8 minutes and drain.",
      "Sauté tomato paste and onions in oil, mix in scrambled egg and spaghetti. Serve hot."
    ]
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
    thumbnailUrl: "https://images.unsplash.com/photo-1515516969-d4008cc6241a?q=80&w=2000&auto=format&fit=crop",
    views: 8900,
    orders: 2100,
    isTrending: false,
    description: "Budget-friendly steamed black-eyed pea pudding enriched with palm oil, wrapped beautifully in banana leaves.",
    ingredients: [
      { name: "Black-eyed beans", amount: "2 cups" },
      { name: "Palm oil", amount: "1/2 cup" },
      { name: "Cocoyam leaves (young)", amount: "5 leaves" }
    ],
    instructions: [
      "Soak beans, peel skins, and blend into a thick, smooth paste.",
      "Stir palm oil into paste until bright orange-yellow and fluffy.",
      "Wrap paste in banana leaves with cocoyam leaves, steam for 40 minutes."
    ]
  },
  {
    id: "rec-7",
    name: "Eru Supreme",
    category: "Traditional",
    difficulty: "Medium",
    duration: 55,
    calories: 560,
    protein: 30,
    carbs: 10,
    fats: 45,
    costEstimate: 5000,
    thumbnailUrl: "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?q=80&w=2000&auto=format&fit=crop",
    views: 31000,
    orders: 12000,
    isTrending: true,
    description: "Delicious finely sliced wild Okok leaves cooked with waterleaf, palm oil, smoked fish, and beef.",
    ingredients: [
      { name: "Eru/Okok leaves", amount: "4 cups" },
      { name: "Waterleaf", amount: "6 cups" },
      { name: "Beef & Cow skin", amount: "400g" },
      { name: "Smoked fish", amount: "2 pieces" },
      { name: "Palm oil", amount: "1 cup" }
    ],
    instructions: [
      "Boil beef and cow skin until tender.",
      "In a large pot, add chopped waterleaf and cook until water reduces.",
      "Add palm oil, boiled meat, and smoked fish to the waterleaf.",
      "Stir in the washed Eru leaves and cook gently for 15 minutes.",
      "Serve hot with Water Fufu or Garri."
    ]
  },
  {
    id: "rec-8",
    name: "Roasted Fish & Plantains",
    category: "Family",
    difficulty: "Medium",
    duration: 60,
    calories: 620,
    protein: 45,
    carbs: 50,
    fats: 20,
    costEstimate: 8000,
    thumbnailUrl: "https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?q=80&w=2000&auto=format&fit=crop",
    views: 24500,
    orders: 6700,
    isTrending: true,
    description: "Classic Cameroonian street-style roasted fish served with fried plantains and spicy pepper sauce.",
    ingredients: [
      { name: "Whole Fish (Croaker)", amount: "1 large" },
      { name: "Ripe Plantains", amount: "4 pieces" },
      { name: "Garlic, Ginger, White Pepper paste", amount: "3 tbsp" },
      { name: "Oil", amount: "For frying" }
    ],
    instructions: [
      "Clean fish and make deep cuts. Marinate with the spice paste and leave for 30 minutes.",
      "Roast the fish over a grill or in an oven until cooked through and slightly charred.",
      "Peel plantains, slice, and fry in hot oil until golden brown.",
      "Serve fish and plantains with a side of hot pepper sauce."
    ]
  }
];
