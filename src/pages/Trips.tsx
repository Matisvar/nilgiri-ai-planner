import { Link } from "react-router-dom";
import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Trip {
  id: string;
  name: string;
  destination: string;
  startDate: string;
  endDate: string;
  days: number;
  image: string;
}

const mockTrips: Trip[] = [
  {
    id: "1",
    name: "Ooty Weekend Getaway",
    destination: "Ooty, Nilgiris",
    startDate: "2024-12-15",
    endDate: "2024-12-17",
    days: 3,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"
  },
  {
    id: "2",
    name: "Coonoor Tea Estate Tour",
    destination: "Coonoor, Nilgiris",
    startDate: "2024-11-20",
    endDate: "2024-11-22",
    days: 2,
    image: "https://images.unsplash.com/photo-1564824279795-e80097c80791?w=800&h=600&fit=crop"
  }
];

export default function Trips() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-6xl mx-auto mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">My Trips</h1>
          <p className="text-muted-foreground text-lg">
            View and manage your planned adventures in the Nilgiris
          </p>
        </div>

        {/* Trips Grid */}
        <div className="max-w-6xl mx-auto">
          {mockTrips.length === 0 ? (
            <Card className="p-12 text-center bg-card border-border shadow-card">
              <div className="max-w-md mx-auto">
                <div className="w-20 h-20 rounded-full bg-muted mx-auto mb-6 flex items-center justify-center">
                  <MapPin className="w-10 h-10 text-muted-foreground" />
                </div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">No trips yet</h2>
                <p className="text-muted-foreground mb-6">
                  Start planning your first Nilgiris adventure with Tripzy AI
                </p>
                <Button asChild className="bg-primary hover:bg-primary-glow">
                  <Link to="/chat">
                    Plan Your First Trip
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {mockTrips.map((trip, index) => (
                <Card
                  key={trip.id}
                  className="overflow-hidden bg-card border-border shadow-card hover:shadow-soft transition-all duration-300 group animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Trip Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={trip.image}
                      alt={trip.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-semibold text-white mb-1">{trip.name}</h3>
                      <div className="flex items-center gap-2 text-white/90 text-sm">
                        <MapPin className="w-4 h-4" />
                        <span>{trip.destination}</span>
                      </div>
                    </div>
                  </div>

                  {/* Trip Details */}
                  <div className="p-6 space-y-4">
                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(trip.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{trip.days} days</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button asChild className="flex-1 bg-primary hover:bg-primary-glow">
                        <Link to={`/trips/${trip.id}`}>
                          View Details
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                      </Button>
                      <Button variant="outline" className="border-border hover:bg-muted">
                        Edit
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
