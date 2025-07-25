import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Filter, Edit, Trash2, Target, Trophy, Users, Clock } from "lucide-react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Activity } from "@/types";
import { API_CONFIG } from "@/config";
export function ManageActivitiesPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const token = localStorage.getItem("accessToken");

    const { data: activities = [], isLoading, error, isError } = useQuery({
        queryKey: ["activity", token],
        queryFn: () => fetchActivities(token),
        enabled: !!token, // Only fetch if token is available
    })
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading activities: {error.message}</div>;
    // Filter activities based on search term
    const filteredActivities = activities.filter(activity =>
        activity.name.toLowerCase().includes(searchTerm.toLowerCase())
        
    );

    // Calculate completion rate (using goal and players as a simple approximation)
    const getCompletionRate = (goal: number, players: number) => {
        if (players === 0) return 0;
        return Math.min(100, Math.round((goal / players) * 100));
    }

    // Format date for display
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    }

    // Check if activity is active
    const isActive = (startDate: string, endDate: string) => {
        const now = new Date();
        const start = new Date(startDate);
        const end = new Date(endDate);
        return now >= start && now <= end;
    }

    return (
        <div className="min-h-screen bg-background text-foreground">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-lg bg-gradient-to-r from-primary/20 to-accent/20">
                            <Target className="h-8 w-8 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold font-orbitron bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                                MANAGE ACTIVITIES
                            </h1>
                            <p className="text-muted-foreground mt-2 font-rajdhani">
                                Monitor and manage all game activities across the platform
                            </p>
                        </div>
                    </div>
                    <Link to="/admin/create-activity">
                        <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity font-rajdhani font-semibold">
                            <Plus className="h-4 w-4 mr-2" />
                            CREATE ACTIVITY
                        </Button>
                    </Link>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-muted-foreground font-rajdhani">Total Activities</p>
                                    <p className="text-3xl font-bold font-orbitron text-primary">{activities.length}</p>
                                </div>
                                <Target className="h-8 w-8 text-primary/60" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-muted-foreground font-rajdhani">Total Players</p>
                                    <p className="text-3xl font-bold font-orbitron text-accent">
                                        {activities.reduce((sum, a) => sum + a.playerCount, 0).toLocaleString()}
                                    </p>
                                </div>
                                <Users className="h-8 w-8 text-accent/60" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-muted-foreground font-rajdhani">Total Reward</p>
                                    <p className="text-3xl font-bold font-orbitron text-green-400">
                                        {activities.reduce((sum, a) => sum + (a.reward || 0), 0).toLocaleString()}
                                    </p>
                                </div>
                                <Trophy className="h-8 w-8 text-green-400/60" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-muted-foreground font-rajdhani">Active Activities</p>
                                    <p className="text-3xl font-bold font-orbitron text-yellow-400">
                                        {activities.filter(a => isActive(a.startDate, a.endDate)).length}
                                    </p>
                                </div>
                                <Clock className="h-8 w-8 text-yellow-400/60" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters */}
                <Card className="border-primary/20 bg-card/50 backdrop-blur-sm mb-6">
                    <CardHeader>
                        <CardTitle className="text-lg font-rajdhani flex items-center gap-2">
                            <Filter className="h-5 w-5" />
                            Filters
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-rajdhani font-medium">Search</label>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Search activities..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10 bg-background/50"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-rajdhani font-medium">Status</label>
                                <Select>
                                    <SelectTrigger className="bg-background/50">
                                        <SelectValue placeholder="All Statuses" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Statuses</SelectItem>
                                        <SelectItem value="active">Active</SelectItem>
                                        <SelectItem value="upcoming">Upcoming</SelectItem>
                                        <SelectItem value="completed">Completed</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-rajdhani font-medium">Has Reward</label>
                                <Select>
                                    <SelectTrigger className="bg-background/50">
                                        <SelectValue placeholder="All" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All</SelectItem>
                                        <SelectItem value="yes">With Reward</SelectItem>
                                        <SelectItem value="no">Without Reward</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Activities Table */}
                <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="text-xl font-orbitron">Activities Overview</CardTitle>
                        <CardDescription>
                            Manage all activities across your platform
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="font-rajdhani font-semibold">Activity</TableHead>
                                    <TableHead className="font-rajdhani font-semibold">Players</TableHead>
                                    <TableHead className="font-rajdhani font-semibold">Reward</TableHead>
                                    <TableHead className="font-rajdhani font-semibold">Dates</TableHead>
                                    <TableHead className="font-rajdhani font-semibold">Status</TableHead>
                                    
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredActivities.map((activity) => {
                                    const active = isActive(activity.startDate, activity.endDate);
                                    const status = active ? "active" :
                                        new Date(activity.startDate) > new Date() ? "upcoming" : "completed";

                                    return (
                                        <TableRow key={activity.id} className="hover:bg-muted/30">
                                            <TableCell className="font-medium">
                                                <div className="flex items-center gap-3">
                                                    {activity.image && (
                                                        <img
                                                            src={`${API_CONFIG.ACTIVITY_IMAGE_URL}/${activity.image}`}
                                                            alt={activity.name}
                                                            className="w-10 h-10 rounded-md object-cover"
                                                        />
                                                    )}
                                                    <div>
                                                        <p>{activity.name}</p>
                                                        
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>{activity.playerCount.toLocaleString()}</TableCell>
                                           
                                            <TableCell className="font-bold text-accent">
                                                {activity.reward ? activity.reward.toLocaleString() : "-"}
                                            </TableCell>
                                           
                                            <TableCell>
                                                <div className="text-sm">
                                                    <p>{formatDate(activity.startDate)}</p>
                                                    <p className="text-muted-foreground">to</p>
                                                    <p>{formatDate(activity.endDate)}</p>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={status === "active" ? "default" : "outline"}>
                                                    {status}
                                                </Badge>
                                            </TableCell>
                                        
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

async function fetchActivities(token: string, page: number = 1) {
    if (!token) return [];
    try {
        const response = await axios.get<Activity[]>(`${API_CONFIG.BACKEND_URL}/activity/filter`, {
            params: { page },
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (response.status !== 200) {
            return [];
        }
        return response.data;
    }
    catch (error) {
        console.error("Error fetching activities:", error);
        return [];
    }
}