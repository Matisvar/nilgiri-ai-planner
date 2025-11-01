import { User, Mail, MapPin, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

export default function Profile() {
  const user = {
    name: "Travel Explorer",
    email: "explorer@tripzy.com",
    location: "India",
    tripsPlanned: 5,
    placesVisited: 12
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Profile</h1>
            <p className="text-muted-foreground text-lg">Manage your account and preferences</p>
          </div>

          {/* Profile Card */}
          <Card className="p-8 bg-card border-border shadow-card">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* Avatar Section */}
              <div className="flex flex-col items-center gap-4">
                <Avatar className="w-32 h-32 border-4 border-primary/20">
                  <AvatarFallback className="text-3xl bg-gradient-to-br from-primary to-primary-glow text-white">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm" className="border-border">
                  <Settings className="w-4 h-4 mr-2" />
                  Edit Photo
                </Button>
              </div>

              {/* User Info */}
              <div className="flex-1 space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold text-foreground mb-1">{user.name}</h2>
                  <p className="text-muted-foreground">Adventurer & Explorer</p>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Mail className="w-5 h-5 text-primary" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span>{user.location}</span>
                  </div>
                </div>

                <Separator />

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted/50 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-primary mb-1">{user.tripsPlanned}</div>
                    <div className="text-sm text-muted-foreground">Trips Planned</div>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-primary mb-1">{user.placesVisited}</div>
                    <div className="text-sm text-muted-foreground">Places Visited</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Settings Card */}
          <Card className="p-6 bg-card border-border shadow-card">
            <h3 className="text-lg font-semibold text-foreground mb-4">Account Settings</h3>
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start border-border hover:bg-muted"
              >
                <Settings className="w-4 h-4 mr-3" />
                Preferences
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start border-border hover:bg-muted"
              >
                <User className="w-4 h-4 mr-3" />
                Edit Profile
              </Button>
              <Separator />
              <Button
                variant="outline"
                className="w-full justify-start border-destructive text-destructive hover:bg-destructive/10"
              >
                <LogOut className="w-4 h-4 mr-3" />
                Logout
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
