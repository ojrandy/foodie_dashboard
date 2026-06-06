"use client";

import React, { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { ChefHat, List, Sparkles, BarChart3, Image as ImageIcon, Calendar, Apple } from "lucide-react";
import { RecipeDashboard } from "./components/RecipeDashboard";
import { RecipeManagement } from "./components/RecipeManagement";
import { NutritionIntelligence } from "./components/NutritionIntelligence";
import { IngredientIntelligence } from "./components/IngredientIntelligence";
import { MealPlanning } from "./components/MealPlanning";
import { RecipeAnalytics } from "./components/RecipeAnalytics";
import { MediaLibrary } from "./components/MediaLibrary";

export function RecipesWorkspace() {
  const [activeTab, setActiveTab] = useState<string>("dashboard");

  const TABS = [
    { id: "dashboard", label: "Overview", icon: BarChart3 },
    { id: "management", label: "Recipes", icon: List },
    { id: "nutrition", label: "Nutrition", icon: Apple },
    { id: "ingredients", label: "Ingredients", icon: ChefHat },
    { id: "planning", label: "Meal Plans", icon: Calendar },
    { id: "analytics", label: "Analytics", icon: Sparkles },
    { id: "media", label: "Media", icon: ImageIcon },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <RecipeDashboard />;
      case "management":
        return <RecipeManagement />;
      case "nutrition":
        return <NutritionIntelligence />;
      case "ingredients":
        return <IngredientIntelligence />;
      case "planning":
        return <MealPlanning />;
      case "analytics":
        return <RecipeAnalytics />;
      case "media":
        return <MediaLibrary />;
      default:
        return (
          <div className="flex flex-col items-center justify-center py-24 glass rounded-xl border border-border/40">
            <ChefHat className="h-12 w-12 text-muted-foreground animate-pulse mb-3" />
            <h3 className="text-xl font-bold">Module Under Construction</h3>
            <p className="text-sm text-muted-foreground mt-2">The {activeTab} module is being connected to the new intelligence core.</p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6 flex flex-col h-full min-h-[calc(100vh-100px)]">
      {/* HEADER & HORIZONTAL TABS */}
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-2">
            <ChefHat className="h-8 w-8 text-accent" /> Recipe Intelligence Center
          </h2>
          <p className="text-muted-foreground text-sm mt-1">
            Enterprise-grade food logistics, automated nutrition analysis, and culinary metrics.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="w-full overflow-x-auto pb-2 scrollbar-none">
          <div className="flex gap-2 min-w-max border-b border-border/40 pb-px">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-4 py-2.5 text-sm font-semibold transition-colors flex items-center gap-2 rounded-t-lg
                    ${isActive ? "text-accent bg-accent/5 border-t border-x border-accent/20" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"}
                  `}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                  {isActive && (
                    <motion.div
                      layoutId="active-recipe-tab"
                      className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-accent"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* DYNAMIC CONTENT AREA */}
      <div className="flex-1 w-full relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="w-full h-full"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
