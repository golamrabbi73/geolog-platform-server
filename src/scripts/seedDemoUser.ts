import bcrypt from "bcryptjs";
import mongoose from "mongoose";

import { env } from "../config/env";
import { UserModel } from "../app/modules/user/user.model";

const DEMO_EMAIL = "demo.engineer@geolog.app";
const DEMO_PASSWORD = "Demo@1234";

async function seedDemoUser() {
  await mongoose.connect(env.DATABASE_URL);

  const existing = await UserModel.findOne({ email: DEMO_EMAIL });

  if (existing) {
    console.log("ℹ️  Demo user already exists:", DEMO_EMAIL);
    await mongoose.disconnect();
    return;
  }

  const hashedPassword = await bcrypt.hash(DEMO_PASSWORD, 10);

  await UserModel.create({
    name: "Demo Engineer",
    email: DEMO_EMAIL,
    password: hashedPassword,
    role: "fieldEngineer",
    status: "active",
  });

  console.log("✅ Demo user created:", DEMO_EMAIL, "/", DEMO_PASSWORD);

  await mongoose.disconnect();
}

seedDemoUser().catch((err) => {
  console.error("❌ Failed to seed demo user:", err);
  process.exit(1);
});
