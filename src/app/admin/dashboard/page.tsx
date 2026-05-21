"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, IndianRupee, Activity, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

export default function DashboardOverview() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/admin/stats");
        const result = await res.json();
        if (result.success) {
          setStats(result.data);
        }
      } catch (err) {
        console.error("Failed to fetch stats", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00D4FF]"></div>
      </div>
    );
  }

  if (!stats) return <div className="text-white">Failed to load dashboard data.</div>;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-space-grotesk font-bold text-white">Dashboard Overview</h1>
      </div>

      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="glass-card border-white/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-white/60">Total Registrations</CardTitle>
            <Users className="w-4 h-4 text-[#00D4FF]" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{stats.totalRegistrations}</div>
            <p className="text-xs text-white/40 mt-1">+12% from last week</p>
          </CardContent>
        </Card>
        
        <Card className="glass-card border-white/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-white/60">Total Revenue</CardTitle>
            <IndianRupee className="w-4 h-4 text-emerald-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">₹{stats.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-white/40 mt-1">+8% from last week</p>
          </CardContent>
        </Card>

        <Card className="glass-card border-white/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-white/60">Active Events</CardTitle>
            <Activity className="w-4 h-4 text-[#7C3AED]" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">6</div>
            <p className="text-xs text-white/40 mt-1">All events running smoothly</p>
          </CardContent>
        </Card>

        <Card className="glass-card border-white/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-white/60">Conversion Rate</CardTitle>
            <TrendingUp className="w-4 h-4 text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">64.2%</div>
            <p className="text-xs text-white/40 mt-1">+2.4% from last week</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-w-0">
        <Card className="glass-card border-white/10 min-w-0 overflow-hidden">
          <CardHeader>
            <CardTitle className="text-white">Registrations Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full min-w-0 relative">
              <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                <LineChart data={stats.registrationsPerDay}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="date" stroke="rgba(255,255,255,0.5)" />
                  <YAxis stroke="rgba(255,255,255,0.5)" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "#0A1628", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px" }}
                    itemStyle={{ color: "#fff" }}
                  />
                  <Line type="monotone" dataKey="count" stroke="#00D4FF" strokeWidth={3} dot={{ r: 4, fill: "#00D4FF" }} activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
 
        <Card className="glass-card border-white/10 min-w-0 overflow-hidden">
          <CardHeader>
            <CardTitle className="text-white">Event Popularity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full min-w-0 relative">
              <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                <BarChart data={stats.eventPopularity} layout="vertical" margin={{ left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" horizontal={true} vertical={false} />
                  <XAxis type="number" stroke="rgba(255,255,255,0.5)" />
                  <YAxis dataKey="name" type="category" stroke="rgba(255,255,255,0.8)" width={100} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "#0A1628", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px" }}
                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  />
                  <Bar dataKey="count" fill="#7C3AED" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
