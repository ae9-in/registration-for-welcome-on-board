import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Registration from "@/models/Registration";

// Generate a random registration ID like REG-12345
const generateRegistrationId = () => {
  return `REG-${Math.floor(10000 + Math.random() * 90000)}`;
};

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();

    const {
      studentName,
      age,
      schoolName,
      standard,
      parentName,
      parentContact,
      gender,
      selectedEvents,
    } = body;

    // Server-side validation
    if (!studentName || !age || !schoolName || !gender || !selectedEvents || selectedEvents.length === 0) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (gender !== "Male" && gender !== "Female") {
      return NextResponse.json(
        { error: "Invalid gender value" },
        { status: 400 }
      );
    }

    // Dynamic pricing calculation
    let pricingType = "single";
    let totalAmount = 0;
    const eventCount = selectedEvents.length;

    if (eventCount === 6) {
      pricingType = "bundle";
      totalAmount = 1000;
    } else {
      totalAmount = eventCount * 333;
    }

    const registrationId = generateRegistrationId();

    const registration = new Registration({
      studentName,
      age,
      schoolName,
      standard,
      parentName,
      parentContact: parentContact || undefined,
      gender,
      selectedEvents,
      pricingType,
      totalAmount,
      registrationId,
    });

    await registration.save();

    return NextResponse.json(
      { success: true, registrationId, totalAmount },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Registration API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
