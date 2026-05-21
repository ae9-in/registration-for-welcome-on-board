import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Registration from "@/models/Registration";

export async function GET(request: Request) {
  try {
    await connectDB();
    
    // Total Registrations & Revenue
    const aggregations = await Registration.aggregate([
      {
        $group: {
          _id: null,
          totalRegistrations: { $sum: 1 },
          totalRevenue: { $sum: "$totalAmount" },
        },
      },
    ]);

    const stats = aggregations[0] || { totalRegistrations: 0, totalRevenue: 0 };

    // Event Popularity
    const eventStats = await Registration.aggregate([
      { $unwind: "$selectedEvents" },
      {
        $group: {
          _id: "$selectedEvents",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ]);

    // Registrations per day (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const dailyStats = await Registration.aggregate([
      {
        $match: {
          createdAt: { $gte: sevenDaysAgo },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    return NextResponse.json(
      {
        success: true,
        data: {
          totalRegistrations: stats.totalRegistrations,
          totalRevenue: stats.totalRevenue,
          eventPopularity: eventStats.map((e) => ({
            name: e._id,
            count: e.count,
          })),
          registrationsPerDay: dailyStats.map((d) => ({
            date: d._id,
            count: d.count,
          })),
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Admin Stats API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
