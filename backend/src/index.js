import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

import { app, server } from "./lib/socket.js";
import { connectDB } from "./lib/db.js";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

dotenv.config();

const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

/* ===============================
   ✅ CORS (MUST BE FIRST)
================================ */
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

/* ===============================
   ✅ BODY SIZE (FOR IMAGES)
================================ */
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

/* ===============================
   ✅ COOKIES
================================ */
app.use(cookieParser());

/* ===============================
   ✅ ROUTES
================================ */
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

/* ===============================
   ✅ PRODUCTION BUILD
================================ */
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

/* ===============================
   ✅ START SERVER
================================ */
server.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  connectDB();
});
