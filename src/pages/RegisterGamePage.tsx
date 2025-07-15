import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Plus, Trash2, Upload, FileText } from "lucide-react";

interface Challenge {
  name: string;
  player_address_variable: string;
  function_name: string;
  useForwarder: boolean;
  forwarderAddress: string;
  forwarderABI: string;
  methodDataAttributeName: string;
  wantedData: string;
  countItems: boolean;
  contract_address: string;
  abi: string;
}

export function RegisterGamePage() {
  const [gameData, setGameData] = useState({
    name: "",
    category: "",
    image: "",
    contract_address: "",
    abi: ""
  });

  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      name: "",
      player_address_variable: "",
      function_name: "",
      useForwarder: false,
      forwarderAddress: "",
      forwarderABI: "",
      methodDataAttributeName: "",
      wantedData: "",
      countItems: false,
      contract_address: "",
      abi: ""
    }
  ]);

  const addChallenge = () => {
    setChallenges([...challenges, {
      name: "",
      player_address_variable: "",
      function_name: "",
      useForwarder: false,
      forwarderAddress: "",
      forwarderABI: "",
      methodDataAttributeName: "",
      wantedData: "",
      countItems: false,
      contract_address: "",
      abi: ""
    }]);
  };

  const removeChallenge = (index: number) => {
    if (challenges.length > 1) {
      setChallenges(challenges.filter((_, i) => i !== index));
    }
  };

  const updateChallenge = (index: number, field: keyof Challenge, value: string | boolean) => {
    const newChallenges = [...challenges];
    newChallenges[index] = { ...newChallenges[index], [field]: value };
    setChallenges(newChallenges);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Registering game:", { ...gameData, challenges });
    // In real app, this would call the API
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="border-primary/20 bg-card">
            <CardHeader>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-end bg-clip-text text-transparent">
                REGISTER NEW GAME
              </CardTitle>
              <CardDescription>
                Register your game and define challenges for battles
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Game Information */}
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Game Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Game Name</Label>
                      <Input
                        id="name"
                        placeholder="Enter game name"
                        value={gameData.name}
                        onChange={(e) => setGameData(prev => ({ ...prev, name: e.target.value }))}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select value={gameData.category} onValueChange={(value) => setGameData(prev => ({ ...prev, category: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="action">Action</SelectItem>
                          <SelectItem value="adventure">Adventure</SelectItem>
                          <SelectItem value="racing">Racing</SelectItem>
                          <SelectItem value="strategy">Strategy</SelectItem>
                          <SelectItem value="puzzle">Puzzle</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="image">Game Image</Label>
                    <div className="flex items-center gap-4">
                      <Input
                        id="image"
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setGameData(prev => ({ ...prev, image: file.name }));
                          }
                        }}
                      />
                      <Button type="button" variant="outline" size="sm">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contract">Contract Address</Label>
                    <Input
                      id="contract"
                      placeholder="0x..."
                      value={gameData.contract_address}
                      onChange={(e) => setGameData(prev => ({ ...prev, contract_address: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="abi">Contract ABI</Label>
                    <div className="flex items-center gap-4">
                      <Input
                        id="abi"
                        type="file"
                        accept=".json"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setGameData(prev => ({ ...prev, abi: file.name }));
                          }
                        }}
                      />
                      <Button type="button" variant="outline" size="sm">
                        <FileText className="h-4 w-4 mr-2" />
                        Upload JSON
                      </Button>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Challenges */}
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Challenges</h2>
                    <Button type="button" onClick={addChallenge} variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Challenge
                    </Button>
                  </div>

                  {challenges.map((challenge, index) => (
                    <Card key={index} className="border-secondary/20 bg-secondary/5">
                      <CardHeader>
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-lg">Challenge {index + 1}</CardTitle>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeChallenge(index)}
                            disabled={challenges.length === 1}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Challenge Name</Label>
                            <Input
                              placeholder="e.g., Survive 100 Waves"
                              value={challenge.name}
                              onChange={(e) => updateChallenge(index, 'name', e.target.value)}
                              required
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label>Player Address Variable</Label>
                            <Input
                              placeholder="e.g., playerAddress"
                              value={challenge.player_address_variable}
                              onChange={(e) => updateChallenge(index, 'player_address_variable', e.target.value)}
                              required
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label>Function Name</Label>
                            <Input
                              placeholder="e.g., completeWave"
                              value={challenge.function_name}
                              onChange={(e) => updateChallenge(index, 'function_name', e.target.value)}
                              required
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label>Contract Address</Label>
                            <Input
                              placeholder="0x..."
                              value={challenge.contract_address}
                              onChange={(e) => updateChallenge(index, 'contract_address', e.target.value)}
                              required
                            />
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Switch
                            id={`forwarder-${index}`}
                            checked={challenge.useForwarder}
                            onCheckedChange={(checked) => updateChallenge(index, 'useForwarder', checked)}
                          />
                          <Label htmlFor={`forwarder-${index}`}>Use Forwarder</Label>
                        </div>

                        {challenge.useForwarder && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Forwarder Address</Label>
                              <Input
                                placeholder="0x..."
                                value={challenge.forwarderAddress}
                                onChange={(e) => updateChallenge(index, 'forwarderAddress', e.target.value)}
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label>Forwarder ABI</Label>
                              <Input
                                type="file"
                                accept=".json"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    updateChallenge(index, 'forwarderABI', file.name);
                                  }
                                }}
                              />
                            </div>
                          </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Method Data Attribute Name</Label>
                            <Input
                              placeholder="e.g., methodData"
                              value={challenge.methodDataAttributeName}
                              onChange={(e) => updateChallenge(index, 'methodDataAttributeName', e.target.value)}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label>Wanted Data</Label>
                            <Input
                              placeholder="e.g., waveNumber"
                              value={challenge.wantedData}
                              onChange={(e) => updateChallenge(index, 'wantedData', e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Switch
                            id={`count-${index}`}
                            checked={challenge.countItems}
                            onCheckedChange={(checked) => updateChallenge(index, 'countItems', checked)}
                          />
                          <Label htmlFor={`count-${index}`}>Count Items</Label>
                        </div>

                        <div className="space-y-2">
                          <Label>Challenge ABI</Label>
                          <Input
                            type="file"
                            accept=".json"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                updateChallenge(index, 'abi', file.name);
                              }
                            }}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Button 
                  type="submit"
                  className="w-full text-lg py-6 bg-gradient-to-r from-primary to-primary-end hover:opacity-90 transition-opacity"
                >
                  REGISTER GAME
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}