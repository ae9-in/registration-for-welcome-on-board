import mongoose, { Schema, Document } from "mongoose";

export interface IRegistration extends Document {
  studentName: string;
  age: number;
  schoolName: string;
  standard: string;
  parentName: string;
  parentContact?: string;
  gender: "Male" | "Female";
  selectedEvents: string[];
  pricingType: "single" | "bundle";
  totalAmount: number;
  registrationId: string;
  createdAt: Date;
}

const RegistrationSchema: Schema = new Schema(
  {
    studentName: { type: String, required: true },
    age: { type: Number, required: true },
    schoolName: { type: String, required: true },
    standard: { type: String, required: true },
    parentName: { type: String, required: true },
    parentContact: { type: String, required: false },
    gender: { type: String, enum: ["Male", "Female"], required: true },
    selectedEvents: { type: [String], required: true },
    pricingType: { type: String, enum: ["single", "bundle"], required: true },
    totalAmount: { type: Number, required: true },
    registrationId: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Add indexes for performance optimization
RegistrationSchema.index({ createdAt: -1 });
RegistrationSchema.index({ schoolName: 1 });
RegistrationSchema.index({ parentContact: 1 });

export default mongoose.models.Registration || mongoose.model<IRegistration>("Registration", RegistrationSchema);
