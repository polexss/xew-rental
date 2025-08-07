import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Clock, DollarSign, CreditCard } from "lucide-react";

interface Vehicle {
  id: string;
  name: string;
  category: string;
  image: string;
  price: number;
  maxSpeed: number;
  available: boolean;
}

interface RentalModalProps {
  vehicle: Vehicle | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (vehicleId: string, duration: number) => void;
}

const durations = [
  { value: 1, label: "1 Hour", multiplier: 1 },
  { value: 3, label: "3 Hours", multiplier: 2.8 },
  { value: 6, label: "6 Hours", multiplier: 5.5 },
  { value: 12, label: "12 Hours", multiplier: 10.8 },
  { value: 24, label: "24 Hours", multiplier: 20 },
];

export const RentalModal = ({ vehicle, isOpen, onClose, onConfirm }: RentalModalProps) => {
  const [selectedDuration, setSelectedDuration] = useState<number>(1);
  
  if (!vehicle) return null;

  const duration = durations.find(d => d.value === selectedDuration);
  const totalPrice = duration ? Math.round(vehicle.price * duration.multiplier) : vehicle.price;

  const handleConfirm = () => {
    onConfirm(vehicle.id, selectedDuration);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gradient-card border-border max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center bg-gradient-primary bg-clip-text text-transparent">
            Rent Vehicle
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="relative">
            <img
              src={vehicle.image}
              alt={vehicle.name}
              className="w-full h-40 object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card/60 to-transparent rounded-lg" />
            <div className="absolute bottom-4 left-4">
              <h3 className="text-xl font-bold text-foreground">{vehicle.name}</h3>
              <Badge variant="secondary" className="mt-1">
                {vehicle.category}
              </Badge>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label className="text-foreground font-medium">Rental Duration</Label>
              <Select
                value={selectedDuration.toString()}
                onValueChange={(value) => setSelectedDuration(Number(value))}
              >
                <SelectTrigger className="bg-input border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  {durations.map((duration) => (
                    <SelectItem key={duration.value} value={duration.value.toString()}>
                      <div className="flex items-center justify-between w-full">
                        <span>{duration.label}</span>
                        <span className="text-primary font-semibold ml-4">
                          ${Math.round(vehicle.price * duration.multiplier)}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="bg-muted/20 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>Duration</span>
                </div>
                <span className="font-semibold">{duration?.label}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <DollarSign className="w-4 h-4" />
                  <span>Base Rate</span>
                </div>
                <span className="font-semibold">${vehicle.price}/hr</span>
              </div>
              
              <div className="border-t border-border pt-3">
                <div className="flex items-center justify-between text-lg">
                  <div className="flex items-center gap-2 text-primary">
                    <CreditCard className="w-5 h-5" />
                    <span className="font-bold">Total Cost</span>
                  </div>
                  <span className="text-2xl font-bold text-primary">${totalPrice}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button variant="rent" onClick={handleConfirm} className="flex-1">
              Confirm Rental
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};