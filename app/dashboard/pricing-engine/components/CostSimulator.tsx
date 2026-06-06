import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calculator, Trash2, ArrowRight, Percent, CheckCircle2, Save, FileText, Edit2 } from "lucide-react";
import { CommodityPrice } from "../types";

interface CostSimulatorProps {
  commodities: CommodityPrice[];
}

export function CostSimulator({ commodities }: CostSimulatorProps) {
  const [selectedItems, setSelectedItems] = useState<{ id: string; qty: number; unit: string }[]>([]);
  const [selectedMarketId, setSelectedMarketId] = useState<string>("Buea Central Market");
  const [addedItem, setAddedItem] = useState<string | null>(null);
  const [listName, setListName] = useState("");
  const [savedLists, setSavedLists] = useState<{ id: string; name: string; cost: number; salePrice: number; items: number; market: string; itemsData: { id: string; qty: number; unit: string }[] }[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [editingListId, setEditingListId] = useState<string | null>(null);

  const marketMap: Record<string, "bueaPrice" | "doualaPrice" | "yaoundePrice"> = {
    "Buea Central Market": "bueaPrice",
    "Mokolo Market": "yaoundePrice",
    "Sandaga Market": "doualaPrice",
    "Bamenda Main Market": "bueaPrice",
    "Bafoussam Market": "doualaPrice",
    "Garoua Market": "yaoundePrice",
    "Maroua Market": "yaoundePrice",
    "Ebolowa Market": "doualaPrice",
    "Ngaoundere Market": "yaoundePrice",
    "Bertoua Market": "yaoundePrice"
  };

  const targetMarket = marketMap[selectedMarketId];

  const handleAddItem = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    if (!id) return;
    
    const com = commodities.find(c => c.id === id);
    if (!selectedItems.find(i => i.id === id)) {
      setSelectedItems([...selectedItems, { id, qty: 1, unit: "Unit" }]);
      
      setAddedItem(com?.name || "Ingredient");
      setTimeout(() => setAddedItem(null), 2000);
    }
    e.target.value = ""; // reset
  };

  const updateQty = (id: string, qty: number) => {
    setSelectedItems(prev => prev.map(item => item.id === id ? { ...item, qty } : item));
  };

  const removeItem = (id: string) => {
    setSelectedItems(prev => prev.filter(i => i.id !== id));
  };

  const { totalCost, itemBreakdown } = useMemo(() => {
    const breakdown = selectedItems.map(item => {
      const com = commodities.find(c => c.id === item.id);
      if (!com) return null;
      const unitPrice = com[targetMarket];
      const itemTotal = unitPrice * item.qty;
      return { ...com, qty: item.qty, itemTotal, unitPrice };
    }).filter(Boolean) as (CommodityPrice & { qty: number; itemTotal: number; unitPrice: number })[];

    const total = breakdown.reduce((acc, curr) => acc + curr.itemTotal, 0);

    return { totalCost: total, itemBreakdown: breakdown };
  }, [selectedItems, commodities, targetMarket]);

  const familyCost = totalCost * 1.5; // Estimated multiplier for family
  const suggestedSellingPrice = totalCost * 2.5; // Standard restaurant margin 150%

  const handleSaveList = () => {
    if (!listName.trim() || selectedItems.length === 0) return;
    
    setIsSaving(true);
    // Simulate API delay
    setTimeout(() => {
      if (editingListId) {
        setSavedLists(prev => prev.map(list => list.id === editingListId ? {
          ...list,
          name: listName,
          cost: totalCost,
          salePrice: suggestedSellingPrice,
          items: selectedItems.length,
          market: selectedMarketId,
          itemsData: selectedItems
        } : list));
      } else {
        setSavedLists(prev => [
          {
            id: `list-${Date.now()}`,
            name: listName,
            cost: totalCost,
            salePrice: suggestedSellingPrice,
            items: selectedItems.length,
            market: selectedMarketId,
            itemsData: selectedItems
          },
          ...prev
        ]);
      }
      
      // Reset form
      setListName("");
      setSelectedItems([]);
      setEditingListId(null);
      setIsSaving(false);
    }, 500);
  };

  const handleEditList = (list: { id: string; name: string; cost: number; salePrice: number; items: number; market: string; itemsData: { id: string; qty: number; unit: string }[] }) => {
    setListName(list.name);
    setSelectedItems(list.itemsData);
    setSelectedMarketId(list.market);
    setEditingListId(list.id);
  };

  const handleDeleteList = (id: string) => {
    setSavedLists(prev => prev.filter(l => l.id !== id));
    if (editingListId === id) {
      setListName("");
      setSelectedItems([]);
      setEditingListId(null);
    }
  };

  const handleCancelEdit = () => {
    setListName("");
    setSelectedItems([]);
    setEditingListId(null);
  };

  return (
    <div className="space-y-6">
      <Card className="glass border-primary/20">
      <CardHeader className="border-b border-border/40 bg-muted/10 pb-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-xl font-bold flex items-center gap-2">
              <Calculator className="h-6 w-6 text-primary" /> Smart Pricing Engine
            </CardTitle>
            <p className="text-xs text-muted-foreground mt-1">Build, calculate, and manage market shopping lists.</p>
          </div>
          <select 
            value={selectedMarketId}
            onChange={(e) => setSelectedMarketId(e.target.value)}
            className="bg-background border border-border/40 rounded-lg p-2 text-sm focus:ring-1 focus:ring-primary/30 font-semibold"
          >
            {Object.keys(marketMap).map(m => (
              <option key={m} value={m}>{m} Pricing</option>
            ))}
          </select>
        </div>
      </CardHeader>
      
      <CardContent className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Ingredient Selection */}
        <div className="lg:col-span-7 space-y-4">
          <div className="space-y-2 mb-6">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">List Name</label>
              {editingListId && (
                <Badge variant="outline" className="bg-warning/10 text-warning border-warning/30 flex items-center gap-1 cursor-pointer hover:bg-warning/20" onClick={handleCancelEdit}>
                  <Edit2 className="h-3 w-3" /> Editing Mode (Click to cancel)
                </Badge>
              )}
            </div>
            <input 
              type="text"
              value={listName}
              onChange={(e) => setListName(e.target.value)}
              placeholder="e.g. Monthly Restock, Wedding Catering..."
              className="w-full bg-background border border-border/40 rounded-lg p-3 text-sm focus:ring-1 focus:ring-primary/30 font-bold placeholder:text-muted-foreground/50"
            />
          </div>

          <div className="flex gap-2">
            <select 
              onChange={handleAddItem}
              className={`w-full bg-muted/30 border border-border/40 rounded-lg p-3 text-sm focus:ring-1 focus:ring-primary/30 transition-colors ${addedItem ? 'text-success font-bold bg-success/5 border-success/30' : ''}`}
            >
              <option value="">{addedItem ? `✅ Added ${addedItem}! Search for next...` : "+ Search and Add Ingredient..."}</option>
              {commodities.map(c => (
                <option key={c.id} value={c.id}>{c.name} ({c[targetMarket]} XAF / {c.unit})</option>
              ))}
            </select>
          </div>

          <div className="space-y-3 mt-4">
            {itemBreakdown.length === 0 ? (
              <div className="text-center p-8 border border-dashed border-border/50 rounded-xl bg-muted/10">
                <p className="text-sm text-muted-foreground">No ingredients added to the simulator yet.</p>
              </div>
            ) : (
              itemBreakdown.map(item => (
                <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-lg border border-border/40 bg-card hover:bg-muted/10 transition-colors">
                  <div>
                    <h4 className="text-sm font-bold">{item.name}</h4>
                    <p className="text-[10px] text-muted-foreground uppercase">{item.unitPrice.toLocaleString()} XAF per {item.unit}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center bg-muted/30 rounded-md border border-border/40 overflow-hidden">
                      <Button variant="ghost" size="sm" className="h-8 rounded-none px-2" onClick={() => updateQty(item.id, Math.max(0.5, item.qty - 0.5))}>-</Button>
                      <span className="text-xs font-bold w-8 text-center">{item.qty}</span>
                      <Button variant="ghost" size="sm" className="h-8 rounded-none px-2" onClick={() => updateQty(item.id, item.qty + 0.5)}>+</Button>
                    </div>
                    <div className="w-24 text-right">
                      <span className="font-bold text-primary">{item.itemTotal.toLocaleString()} XAF</span>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive" onClick={() => removeItem(item.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Cost Analysis Output */}
        <div className="lg:col-span-5">
          <div className="bg-card border border-border/40 rounded-xl p-6 shadow-xl sticky top-4 space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground border-b border-border/40 pb-2">Simulation Output</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-xs text-muted-foreground">Raw Ingredient Cost</p>
                  <p className="text-3xl font-extrabold text-foreground">{totalCost.toLocaleString()} <span className="text-sm text-muted-foreground">XAF</span></p>
                </div>
                <div className="bg-muted p-2 rounded-lg text-center">
                  <p className="text-[10px] uppercase text-muted-foreground font-bold">Items</p>
                  <p className="font-extrabold">{selectedItems.length}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/40">
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
                  <p className="text-[10px] uppercase text-muted-foreground font-bold flex items-center gap-1"><ArrowRight className="h-3 w-3" /> Family Meal (x1.5)</p>
                  <p className="text-lg font-bold text-primary mt-1">{familyCost.toLocaleString()} XAF</p>
                </div>
                <div className="bg-success/5 border border-success/20 rounded-lg p-3">
                  <p className="text-[10px] uppercase text-muted-foreground font-bold flex items-center gap-1"><Percent className="h-3 w-3" /> Target Sale Price</p>
                  <p className="text-lg font-bold text-success mt-1">{suggestedSellingPrice.toLocaleString()} XAF</p>
                </div>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4 mt-2">
                <h4 className="text-xs font-bold text-emerald-500 flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4" /> AI Margin Assessment</h4>
                <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">
                  Selling this list at the target price yields a <span className="font-bold text-foreground">{(suggestedSellingPrice - totalCost).toLocaleString()} XAF</span> gross profit per serving (60% margin). This is highly competitive for the {selectedMarketId.replace(" Market", "")} market.
                </p>
              </div>

              <Button 
                className={`w-full mt-2 transition-all duration-300 ${editingListId ? 'bg-warning hover:bg-warning/90 text-warning-foreground' : ''}`} 
                size="lg"
                disabled={!listName.trim() || selectedItems.length === 0 || isSaving}
                onClick={handleSaveList}
              >
                {isSaving ? (
                  <span className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" /> Saving List...</span>
                ) : (
                  <span className="flex items-center gap-2"><Save className="h-4 w-4" /> {editingListId ? "Update Market List" : "Save Market List"}</span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>

    {/* Saved Lists Archive */}
    {savedLists.length > 0 && (
      <Card className="glass border-border/40">
        <CardHeader className="pb-3 border-b border-border/40">
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            <FileText className="h-5 w-5 text-accent" /> Saved Market Lists
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-muted/10">
          {savedLists.map(list => (
            <div key={list.id} className={`bg-card border ${editingListId === list.id ? 'border-warning shadow-warning/20 shadow-lg' : 'border-border/40 shadow-sm'} rounded-xl p-4 transition-all group relative overflow-hidden`}>
              {editingListId === list.id && (
                <div className="absolute top-0 right-0 left-0 h-1 bg-warning" />
              )}
              <div className="flex justify-between items-start mb-3">
                <div className="pr-12">
                  <h4 className="font-extrabold text-foreground">{list.name}</h4>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">{list.market}</p>
                </div>
                <div className="bg-muted p-1.5 rounded-lg text-center min-w-[36px]">
                  <p className="font-bold text-xs">{list.items}</p>
                  <p className="text-[8px] uppercase text-muted-foreground font-bold">Items</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 border-t border-border/40 py-3">
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase font-bold">Raw Cost</p>
                  <p className="text-sm font-bold">{list.cost.toLocaleString()} XAF</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-muted-foreground uppercase font-bold">Target Sale</p>
                  <p className="text-sm font-bold text-success">{list.salePrice.toLocaleString()} XAF</p>
                </div>
              </div>

              {/* CRUD Actions */}
              <div className="flex justify-between items-center pt-2 border-t border-border/40 mt-1">
                <Button variant="ghost" size="sm" className="h-7 text-xs text-muted-foreground hover:text-warning" onClick={() => handleEditList(list)}>
                  <Edit2 className="h-3 w-3 mr-1" /> Edit
                </Button>
                <Button variant="ghost" size="sm" className="h-7 text-xs text-muted-foreground hover:text-destructive" onClick={() => handleDeleteList(list.id)}>
                  <Trash2 className="h-3 w-3 mr-1" /> Delete
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    )}
    </div>
  );
}
