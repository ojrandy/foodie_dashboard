import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { recipeSchema, RecipeFormData } from "../schemas/recipe.schema";
import { useCreateRecipe, useUpdateRecipe } from "../hooks/useRecipes";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sparkles, Plus, Trash2, Save } from "lucide-react";
import { Recipe } from "../data/mockRecipes";

interface RecipeFormProps {
  onSuccess: () => void;
  onCancel: () => void;
  initialData?: Recipe;
}

export function RecipeForm({ onSuccess, onCancel, initialData }: RecipeFormProps) {
  const { mutate: createRecipe, isPending: isCreating } = useCreateRecipe();
  const { mutate: updateRecipe, isPending: isUpdating } = useUpdateRecipe();
  const isPending = isCreating || isUpdating;

  const form = useForm<RecipeFormData>({
    resolver: zodResolver(recipeSchema),
    defaultValues: initialData ? {
      ...initialData,
      instructions: initialData.instructions.map(step => ({ step })),
    } : {
      name: "",
      category: "Traditional",
      difficulty: "Medium",
      duration: 30,
      calories: 400,
      protein: 15,
      carbs: 40,
      fats: 12,
      costEstimate: 1500,
      description: "",
      thumbnailUrl: "",
      videoUrl: "",
      ingredients: [{ name: "", amount: "", sub: "" }],
      instructions: [{ step: "" }],
    },
    mode: "onChange",
  });

  const { fields: ingFields, append: addIng, remove: removeIng } = useFieldArray({
    control: form.control,
    name: "ingredients",
  });

  const { fields: instFields, append: addInst, remove: removeInst } = useFieldArray({
    control: form.control,
    name: "instructions",
  });

  // System Cache Security Logging for Validation Errors
  useEffect(() => {
    const subscription = form.watch(() => {
      const errors = form.formState.errors;
      if (Object.keys(errors).length > 0) {
        // Log to mock system cache / local storage
        localStorage.setItem("foodops_security_log", JSON.stringify({
          timestamp: new Date().toISOString(),
          type: "VALIDATION_ERROR_TRAPPED",
          module: "RecipeIntelligenceCenter",
          errors,
        }, (key, value) => {
          // React Hook Form errors object contains HTML elements in the 'ref' property causing circular JSON
          if (key === 'ref' || value instanceof Element) return undefined;
          return value;
        }));
      }
    });
    return () => subscription.unsubscribe();
  }, [form.watch, form.formState.errors]);

  const onSubmit = (data: RecipeFormData) => {
    if (initialData) {
      updateRecipe({ id: initialData.id, data }, {
        onSuccess: () => {
          form.reset();
          onSuccess();
        }
      });
    } else {
      createRecipe(data, {
        onSuccess: () => {
          form.reset();
          onSuccess();
        }
      });
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 text-sm">
      <div className="grid grid-cols-1 gap-1.5">
        <label className="font-semibold text-muted-foreground uppercase tracking-wide text-xs">Recipe Name *</label>
        <Input 
          {...form.register("name")}
          placeholder="e.g. Ndole Supreme Plan" 
          className="bg-muted/30"
        />
        {form.formState.errors.name && (
          <span className="text-xs text-destructive">{form.formState.errors.name.message}</span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="font-semibold text-muted-foreground uppercase tracking-wide text-xs">Category</label>
          <select 
            {...form.register("category")}
            className="bg-muted/30 border border-border/40 rounded-lg p-2.5 text-foreground focus:outline-none focus:ring-1 focus:ring-accent/30 cursor-pointer"
          >
            {["Traditional", "Student", "Budget", "Healthy", "Family", "Breakfast", "Lunch", "Dinner", "Snacks"].map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          {form.formState.errors.category && <span className="text-xs text-destructive">{form.formState.errors.category.message}</span>}
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="font-semibold text-muted-foreground uppercase tracking-wide text-xs">Difficulty</label>
          <select 
            {...form.register("difficulty")}
            className="bg-muted/30 border border-border/40 rounded-lg p-2.5 text-foreground focus:outline-none focus:ring-1 focus:ring-accent/30 cursor-pointer"
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="font-semibold text-muted-foreground uppercase tracking-wide text-xs">Duration (Mins)</label>
          <Input type="number" {...form.register("duration", { valueAsNumber: true })} className="bg-muted/30" />
          {form.formState.errors.duration && <span className="text-xs text-destructive">{form.formState.errors.duration.message}</span>}
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="font-semibold text-muted-foreground uppercase tracking-wide text-xs">Cost (XAF)</label>
          <Input type="number" {...form.register("costEstimate", { valueAsNumber: true })} className="bg-muted/30" />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="font-semibold text-muted-foreground uppercase tracking-wide text-xs">Description *</label>
        <textarea 
          {...form.register("description")}
          placeholder="Provide a detailed description..." 
          className="bg-muted/30 border border-border/40 rounded-lg p-2.5 text-foreground focus:outline-none focus:ring-1 focus:ring-accent/30 min-h-[80px]"
        />
        {form.formState.errors.description && <span className="text-xs text-destructive">{form.formState.errors.description.message}</span>}
      </div>

      {/* Media & Assets */}
      <div className="space-y-4 p-4 bg-muted/10 border border-border/40 rounded-xl">
        <label className="font-bold text-muted-foreground uppercase tracking-wide text-xs">Media Assets</label>
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] text-muted-foreground uppercase font-semibold">Thumbnail Image URL</label>
          <Input 
            {...form.register("thumbnailUrl")}
            placeholder="https://images.unsplash.com/..." 
            className="bg-muted/30 text-xs"
          />
          {form.formState.errors.thumbnailUrl && <span className="text-xs text-destructive">{form.formState.errors.thumbnailUrl.message}</span>}
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] text-muted-foreground uppercase font-semibold">YouTube Video URL</label>
          <Input 
            {...form.register("videoUrl")}
            placeholder="https://www.youtube.com/embed/..." 
            className="bg-muted/30 text-xs"
          />
          {form.formState.errors.videoUrl && <span className="text-xs text-destructive">{form.formState.errors.videoUrl.message}</span>}
        </div>
      </div>

      {/* Dynamic Ingredients */}
      <div className="space-y-3 p-4 bg-muted/10 border border-border/40 rounded-xl">
        <div className="flex justify-between items-center">
          <label className="font-bold text-muted-foreground uppercase tracking-wide text-xs">Ingredients</label>
          <Button type="button" variant="outline" size="sm" onClick={() => addIng({ name: "", amount: "", sub: "" })}>
            <Plus className="h-3 w-3 mr-1" /> Add
          </Button>
        </div>
        {ingFields.map((field, index) => (
          <div key={field.id} className="grid grid-cols-12 gap-2 items-start">
            <div className="col-span-5">
              <Input {...form.register(`ingredients.${index}.name` as const)} placeholder="Name" className="bg-muted/30" />
              {form.formState.errors.ingredients?.[index]?.name && <span className="text-[10px] text-destructive">{form.formState.errors.ingredients[index]?.name?.message}</span>}
            </div>
            <div className="col-span-3">
              <Input {...form.register(`ingredients.${index}.amount` as const)} placeholder="Amount" className="bg-muted/30" />
            </div>
            <div className="col-span-3">
              <Input {...form.register(`ingredients.${index}.sub` as const)} placeholder="Sub" className="bg-muted/30" />
            </div>
            <div className="col-span-1 flex justify-end">
              <Button type="button" variant="ghost" size="icon" onClick={() => removeIng(index)} disabled={ingFields.length === 1}>
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Dynamic Instructions */}
      <div className="space-y-3 p-4 bg-muted/10 border border-border/40 rounded-xl">
        <div className="flex justify-between items-center">
          <label className="font-bold text-muted-foreground uppercase tracking-wide text-xs">Instructions</label>
          <Button type="button" variant="outline" size="sm" onClick={() => addInst({ step: "" })}>
            <Plus className="h-3 w-3 mr-1" /> Add Step
          </Button>
        </div>
        {instFields.map((field, index) => (
          <div key={field.id} className="flex gap-2 items-start">
            <span className="h-9 w-9 shrink-0 flex items-center justify-center bg-accent/10 text-accent font-bold rounded-lg text-sm">{index + 1}</span>
            <div className="flex-1">
              <textarea 
                {...form.register(`instructions.${index}.step` as const)}
                placeholder="Describe this step..." 
                className="w-full bg-muted/30 border border-border/40 rounded-lg p-2 text-foreground focus:outline-none focus:ring-1 focus:ring-accent/30 min-h-[40px]"
              />
              {form.formState.errors.instructions?.[index]?.step && <span className="text-[10px] text-destructive">{form.formState.errors.instructions[index]?.step?.message}</span>}
            </div>
            <Button type="button" variant="ghost" size="icon" onClick={() => removeInst(index)} disabled={instFields.length === 1}>
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        ))}
      </div>

      <div className="flex gap-3 pt-4 border-t border-border/40">
        <Button type="submit" disabled={isPending || !form.formState.isValid} className="flex-1 gap-2">
          {isPending ? "Saving..." : initialData ? <><Save className="h-4 w-4" /> Save Changes</> : <><Sparkles className="h-4 w-4" /> Publish to Catalog</>}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
