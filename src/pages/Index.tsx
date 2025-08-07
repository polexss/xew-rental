import { useState, useMemo } from "react";
import { VehicleCard } from "@/components/VehicleCard";
import { RentalModal } from "@/components/RentalModal";
import { PlayerStats } from "@/components/PlayerStats";
import { VehicleFilters } from "@/components/VehicleFilters";
import { useToast } from "@/hooks/use-toast";
import heroCarImage from "@/assets/hero-car.jpg";
import carCardImage from "@/assets/car-card.jpg";
import bikeCardImage from "@/assets/bike-card.jpg";
import boatCardImage from "@/assets/boat-card.jpg";

interface Vehicle {
  id: string;
  name: string;
  category: string;
  image: string;
  price: number;
  maxSpeed: number;
  available: boolean;
}

const mockVehicles: Vehicle[] = [
  {
    id: "1",
    name: "Adder Supercar",
    category: "car",
    image: carCardImage,
    price: 150,
    maxSpeed: 250,
    available: true,
  },
  {
    id: "2",
    name: "Akuma Sport",
    category: "motorcycle",
    image: bikeCardImage,
    price: 75,
    maxSpeed: 180,
    available: true,
  },
  {
    id: "3",
    name: "Marquis Yacht",
    category: "boat",
    image: boatCardImage,
    price: 200,
    maxSpeed: 85,
    available: false,
  },
  {
    id: "4",
    name: "Zentorno",
    category: "car",
    image: carCardImage,
    price: 180,
    maxSpeed: 245,
    available: true,
  },
  {
    id: "5",
    name: "Hakuchou Drag",
    category: "motorcycle",
    image: bikeCardImage,
    price: 90,
    maxSpeed: 200,
    available: true,
  },
  {
    id: "6",
    name: "Speeder",
    category: "boat",
    image: boatCardImage,
    price: 120,
    maxSpeed: 95,
    available: true,
  },
];

const Index = () => {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [playerData] = useState({
    name: "xX_Player_Xx",
    balance: 25000,
    activeRentals: 1,
    totalRentals: 47,
  });
  const { toast } = useToast();

  const filteredVehicles = useMemo(() => {
    return mockVehicles.filter((vehicle) => {
      const matchesSearch = vehicle.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all" || vehicle.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const vehicleCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    mockVehicles.forEach((vehicle) => {
      counts[vehicle.category] = (counts[vehicle.category] || 0) + 1;
    });
    return counts;
  }, []);

  const handleRentVehicle = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setIsModalOpen(true);
  };

  const handleConfirmRental = (vehicleId: string, duration: number) => {
    const vehicle = mockVehicles.find(v => v.id === vehicleId);
    if (vehicle) {
      toast({
        title: "Rental Confirmed!",
        description: `You've rented the ${vehicle.name} for ${duration} hour${duration > 1 ? 's' : ''}.`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-600 flex items-center justify-center p-4">
      {/* Tablet Frame - 1650x880 */}
      <div className="relative w-[1650px] h-[880px]">
        {/* Tablet Bezel */}
        <div className="bg-slate-800 rounded-tablet shadow-tablet p-8 relative w-full h-full">
          {/* Home Button */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center shadow-inner">
            <div className="w-6 h-6 bg-slate-600 rounded-full"></div>
          </div>
          
          {/* Camera */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-slate-900 rounded-full"></div>
          
          {/* Screen */}
          <div className="bg-background rounded-lg overflow-hidden shadow-inner w-full h-full">
            <div className="w-full h-full bg-background overflow-auto">
      {/* Hero Section */}
      <div className="relative h-80 overflow-hidden">
        <img
          src={heroCarImage}
          alt="Hero Car"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-start">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="max-w-2xl">
              <h1 className="text-5xl font-bold text-foreground mb-4">
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  FiveM
                </span>{" "}
                Vehicle Rentals
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                Rent the fastest cars, bikes, boats, and aircraft in Los Santos. 
                Your adventure starts here.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <PlayerStats
              playerName={playerData.name}
              balance={playerData.balance}
              activeRentals={playerData.activeRentals}
              totalRentals={playerData.totalRentals}
            />
            
            <VehicleFilters
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              vehicleCounts={vehicleCounts}
            />
          </div>

          {/* Vehicle Grid */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-foreground">
                Available Vehicles
              </h2>
              <div className="text-muted-foreground">
                {filteredVehicles.length} vehicle{filteredVehicles.length !== 1 ? 's' : ''} found
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredVehicles.map((vehicle) => (
                <VehicleCard
                  key={vehicle.id}
                  vehicle={vehicle}
                  onRent={handleRentVehicle}
                />
              ))}
            </div>

            {filteredVehicles.length === 0 && (
              <div className="text-center py-12">
                <p className="text-xl text-muted-foreground">
                  No vehicles found matching your criteria.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

            </div>
          </div>
        </div>
      </div>

      <RentalModal
        vehicle={selectedVehicle}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmRental}
      />
    </div>
  );
};

export default Index;