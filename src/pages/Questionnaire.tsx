import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useTripPlanning } from '@/contexts/TripPlanningContext';
import { Users, Heart, Utensils, Car, Sparkles, ArrowLeft, ArrowRight } from 'lucide-react';

const Questionnaire = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const { tripData, updateTripData } = useTripPlanning();
  const navigate = useNavigate();

  const totalSteps = 6;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate('/chat');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate('/');
    }
  };

  const formatCurrency = (value: number) => {
    return `₹${value.toLocaleString('en-IN')}`;
  };

  const calculateBreakdown = (budget: number) => {
    return {
      accommodation: Math.round(budget * 0.4),
      transport: Math.round(budget * 0.3),
      food: Math.round(budget * 0.2),
      activities: Math.round(budget * 0.1),
    };
  };

  const healthConditionOptions = [
    'Heart condition', 'Asthma', 'Allergies', 'Mobility needs', 
    'Diabetes', 'Dietary restrictions', 'None'
  ];

  const foodPreferenceOptions = [
    'Vegetarian', 'Non-Vegetarian', 'Vegan', 'Jain', 
    'Local cuisine only', 'Mix of everything'
  ];

  const travelModeOptions = [
    { value: 'bike', label: 'Bike', icon: '🏍️' },
    { value: 'car', label: 'Car', icon: '🚗' },
    { value: 'taxi', label: 'Taxi', icon: '🚕' },
    { value: 'bus', label: 'Bus', icon: '🚌' },
    { value: 'train', label: 'Train', icon: '🚂' },
  ];

  const interestOptions = [
    'Must-see Attractions', 'Great Food', 'Hidden Gems', 'Tours & Experiences',
    'Water Sports', 'Wildlife Sanctuaries', 'Heritage Architecture', 'Beach Shacks',
    'Yoga Retreats', 'Adventure & Sports', 'Night Markets', 'Local Cuisine'
  ];

  const toggleArrayItem = (array: string[], item: string) => {
    if (array.includes(item)) {
      return array.filter(i => i !== item);
    }
    return [...array, item];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-nature-mist via-background to-nature-earth/10 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">Step {currentStep} of {totalSteps}</span>
            <span className="text-sm font-medium text-nature-pine">{Math.round((currentStep / totalSteps) * 100)}%</span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-nature-pine to-nature-moss transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-card/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-nature-pine/10 animate-fade-in">
          {/* Step 1: Budget */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-nature-pine mb-2">What's your budget?</h2>
                <p className="text-muted-foreground">Set your travel budget to get personalized recommendations</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-lg">Total Budget</Label>
                  <Input
                    type="number"
                    value={tripData.budget}
                    onChange={(e) => {
                      const value = parseInt(e.target.value) || 10000;
                      updateTripData({ budget: value });
                    }}
                    className="w-40 text-right text-lg font-semibold"
                  />
                </div>

                <Slider
                  value={[tripData.budget]}
                  min={10000}
                  max={500000}
                  step={5000}
                  onValueChange={(value) => updateTripData({ budget: value[0] })}
                  className="my-6"
                />

                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>₹10,000</span>
                  <span>₹5,00,000</span>
                </div>
              </div>

              {/* Budget Breakdown */}
              <div className="mt-8 p-6 bg-nature-mist/30 rounded-2xl border border-nature-pine/10">
                <h3 className="text-lg font-semibold mb-4 text-nature-pine">Estimated Budget Allocation</h3>
                <div className="space-y-3">
                  {Object.entries(calculateBreakdown(tripData.budget)).map(([category, amount]) => (
                    <div key={category} className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-nature-pine"></div>
                        <span className="capitalize">{category}</span>
                        <span className="text-sm text-muted-foreground">
                          ({tripData.budgetBreakdown[category as keyof typeof tripData.budgetBreakdown]}%)
                        </span>
                      </div>
                      <span className="font-semibold">{formatCurrency(amount)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Type of Trip */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <Users className="w-12 h-12 mx-auto mb-4 text-nature-pine" />
                <h2 className="text-3xl font-bold text-nature-pine mb-2">What kind of trip are you planning?</h2>
              </div>

              <RadioGroup 
                value={tripData.tripType} 
                onValueChange={(value) => updateTripData({ tripType: value as any })}
                className="space-y-3"
              >
                {[
                  { value: 'solo', label: 'Solo Trip', icon: '🎒' },
                  { value: 'partner', label: 'Partner Trip', icon: '💑' },
                  { value: 'friends', label: 'Friends Trip', icon: '👥' },
                  { value: 'family', label: 'Family Trip', icon: '👨‍👩‍👧‍👦' },
                ].map((option) => (
                  <div key={option.value} className="flex items-center space-x-3 p-4 rounded-xl border-2 border-nature-pine/20 hover:border-nature-pine/50 hover:bg-nature-mist/20 transition-all cursor-pointer">
                    <RadioGroupItem value={option.value} id={option.value} />
                    <Label htmlFor={option.value} className="flex items-center gap-3 cursor-pointer flex-1">
                      <span className="text-2xl">{option.icon}</span>
                      <span className="text-lg">{option.label}</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>

              {/* Conditional: Group Size */}
              {tripData.tripType === 'friends' && (
                <div className="mt-6 p-6 bg-nature-mist/30 rounded-2xl animate-fade-in">
                  <Label className="text-lg mb-3 block">How many people are traveling?</Label>
                  <Input
                    type="number"
                    min="2"
                    value={tripData.groupSize || ''}
                    onChange={(e) => updateTripData({ groupSize: parseInt(e.target.value) || 2 })}
                    placeholder="Enter number of people"
                    className="text-lg"
                  />
                </div>
              )}

              {/* Conditional: Family Size */}
              {tripData.tripType === 'family' && (
                <div className="mt-6 p-6 bg-nature-mist/30 rounded-2xl space-y-4 animate-fade-in">
                  <div>
                    <Label className="text-lg mb-3 block">How many adults?</Label>
                    <Input
                      type="number"
                      min="1"
                      value={tripData.adults || ''}
                      onChange={(e) => updateTripData({ adults: parseInt(e.target.value) || 1 })}
                      placeholder="Number of adults"
                      className="text-lg"
                    />
                  </div>
                  <div>
                    <Label className="text-lg mb-3 block">How many children?</Label>
                    <Input
                      type="number"
                      min="0"
                      value={tripData.children || ''}
                      onChange={(e) => updateTripData({ children: parseInt(e.target.value) || 0 })}
                      placeholder="Number of children"
                      className="text-lg"
                    />
                  </div>
                </div>
              )}

              {/* Pets */}
              <div className="flex items-center justify-between p-6 bg-nature-mist/30 rounded-2xl">
                <Label className="text-lg">Are you traveling with pets?</Label>
                <div className="flex items-center gap-4">
                  <Button
                    type="button"
                    variant={tripData.travelingWithPets ? 'default' : 'outline'}
                    onClick={() => updateTripData({ travelingWithPets: true })}
                    className="px-6"
                  >
                    Yes
                  </Button>
                  <Button
                    type="button"
                    variant={!tripData.travelingWithPets ? 'default' : 'outline'}
                    onClick={() => updateTripData({ travelingWithPets: false })}
                    className="px-6"
                  >
                    No
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Health & Safety */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <Heart className="w-12 h-12 mx-auto mb-4 text-nature-pine" />
                <h2 className="text-3xl font-bold text-nature-pine mb-2">Health & Safety</h2>
                <p className="text-muted-foreground">Help us plan a safe and comfortable trip for you</p>
              </div>

              <Label className="text-lg">Do you have any health conditions or special needs?</Label>
              <div className="space-y-3">
                {healthConditionOptions.map((condition) => (
                  <div key={condition} className="flex items-center space-x-3 p-4 rounded-xl border border-nature-pine/20 hover:bg-nature-mist/20 transition-all">
                    <Checkbox
                      id={condition}
                      checked={tripData.healthConditions.includes(condition)}
                      onCheckedChange={() => {
                        updateTripData({
                          healthConditions: toggleArrayItem(tripData.healthConditions, condition)
                        });
                      }}
                    />
                    <Label htmlFor={condition} className="cursor-pointer flex-1">{condition}</Label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Food Preferences */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <Utensils className="w-12 h-12 mx-auto mb-4 text-nature-pine" />
                <h2 className="text-3xl font-bold text-nature-pine mb-2">What are your food preferences?</h2>
                <p className="text-muted-foreground">Select all that apply</p>
              </div>

              <div className="space-y-3">
                {foodPreferenceOptions.map((preference) => (
                  <div key={preference} className="flex items-center space-x-3 p-4 rounded-xl border border-nature-pine/20 hover:bg-nature-mist/20 transition-all">
                    <Checkbox
                      id={preference}
                      checked={tripData.foodPreferences.includes(preference)}
                      onCheckedChange={() => {
                        updateTripData({
                          foodPreferences: toggleArrayItem(tripData.foodPreferences, preference)
                        });
                      }}
                    />
                    <Label htmlFor={preference} className="cursor-pointer flex-1">{preference}</Label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 5: Travel Mode */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <Car className="w-12 h-12 mx-auto mb-4 text-nature-pine" />
                <h2 className="text-3xl font-bold text-nature-pine mb-2">How would you like to travel?</h2>
                <p className="text-muted-foreground">Select your preferred mode(s) of transport</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {travelModeOptions.map((mode) => (
                  <div
                    key={mode.value}
                    onClick={() => {
                      updateTripData({
                        travelMode: toggleArrayItem(tripData.travelMode, mode.value)
                      });
                    }}
                    className={`p-6 rounded-2xl border-2 cursor-pointer transition-all text-center ${
                      tripData.travelMode.includes(mode.value)
                        ? 'border-nature-pine bg-nature-pine/10'
                        : 'border-nature-pine/20 hover:border-nature-pine/50 hover:bg-nature-mist/20'
                    }`}
                  >
                    <div className="text-4xl mb-2">{mode.icon}</div>
                    <div className="font-semibold">{mode.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 6: Interests */}
          {currentStep === 6 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <Sparkles className="w-12 h-12 mx-auto mb-4 text-nature-pine" />
                <h2 className="text-3xl font-bold text-nature-pine mb-2">Tell us what you're interested in</h2>
                <p className="text-muted-foreground">Choose all that excite you</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {interestOptions.map((interest) => (
                  <div
                    key={interest}
                    onClick={() => {
                      updateTripData({
                        interests: toggleArrayItem(tripData.interests, interest)
                      });
                    }}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all text-center ${
                      tripData.interests.includes(interest)
                        ? 'border-nature-pine bg-nature-pine/10'
                        : 'border-nature-pine/20 hover:border-nature-pine/50 hover:bg-nature-mist/20'
                    }`}
                  >
                    <div className="text-sm font-medium">{interest}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-nature-pine/10">
            <Button
              onClick={handleBack}
              variant="outline"
              size="lg"
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <Button
              onClick={handleNext}
              size="lg"
              className="gap-2 bg-gradient-to-r from-nature-pine to-nature-moss hover:opacity-90"
            >
              {currentStep === totalSteps ? 'Start Planning' : 'Next'}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questionnaire;
