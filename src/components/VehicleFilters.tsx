import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Car, Bike, Ship, Plane } from "lucide-react";

interface VehicleFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  vehicleCounts: Record<string, number>;
}

const categories = [
  { id: "all", label: "All Vehicles", icon: Car },
  { id: "car", label: "Cars", icon: Car },
  { id: "motorcycle", label: "Bikes", icon: Bike },
  { id: "boat", label: "Boats", icon: Ship },
  { id: "aircraft", label: "Aircraft", icon: Plane },
];

export const VehicleFilters = ({ 
  searchTerm, 
  onSearchChange, 
  selectedCategory, 
  onCategoryChange,
  vehicleCounts 
}: VehicleFiltersProps) => {
  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Search vehicles..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 bg-input border-border text-foreground placeholder:text-muted-foreground"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const Icon = category.icon;
          const count = category.id === "all" 
            ? Object.values(vehicleCounts).reduce((sum, count) => sum + count, 0)
            : vehicleCounts[category.id] || 0;
          
          return (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "gaming" : "outline"}
              onClick={() => onCategoryChange(category.id)}
              className="flex items-center gap-2"
            >
              <Icon className="w-4 h-4" />
              <span>{category.label}</span>
              <Badge variant="secondary" className="ml-1">
                {count}
              </Badge>
            </Button>
          );
        })}
      </div>
    </div>
  );
};