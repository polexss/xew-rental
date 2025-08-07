import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, DollarSign, Settings } from "lucide-react";

interface Vehicle {
  id: string;
  name: string;
  category: string;
  image: string;
  price: number;
  maxSpeed: number;
  available: boolean;
}

interface VehicleCardProps {
  vehicle: Vehicle;
  onRent: (vehicle: Vehicle) => void;
}

export const VehicleCard = ({ vehicle, onRent }: VehicleCardProps) => {
  return (
    <Card className="bg-gradient-card border-border hover:bg-gradient-hover hover:shadow-card transition-smooth group">
      <CardContent className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={vehicle.image}
            alt={vehicle.name}
            className="w-full h-48 object-cover group-hover:scale-110 transition-smooth"
          />
          <div className="absolute top-3 right-3">
            <Badge variant={vehicle.available ? "default" : "secondary"}>
              {vehicle.available ? "Available" : "Rented"}
            </Badge>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
        </div>
        
        <div className="p-6 space-y-4">
          <div>
            <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-smooth">
              {vehicle.name}
            </h3>
            <p className="text-muted-foreground capitalize">{vehicle.category}</p>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-secondary">
              <Settings className="w-4 h-4" />
              <span>{vehicle.maxSpeed} mph</span>
            </div>
            <div className="flex items-center gap-2 text-primary">
              <DollarSign className="w-4 h-4" />
              <span className="font-semibold">${vehicle.price}/hr</span>
            </div>
          </div>
          
          <Button
            variant="gaming"
            className="w-full"
            onClick={() => onRent(vehicle)}
            disabled={!vehicle.available}
          >
            <Clock className="w-4 h-4" />
            {vehicle.available ? "Rent Now" : "Not Available"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};