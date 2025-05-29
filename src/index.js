import express from "express";
import { PORT } from "./config.js";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import playersRoutes from "./routes/players.routes.js";
import refereeRoutes from "./routes/referee.route.js";
import treasurerRoutes from "./routes/treasurer.routes.js";
import technicalDirectorsRoutes from "./routes/technicalDirectors.routes.js";
import teamRoutes from "./routes/team.routes.js";
import tournamentRoutes from "./routes/tournament.routes.js";
import authRoutes from "./routes/auth.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import ReportRoutes from "./routes/reports.routes.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
// import cron from "node-cron";

const app = express();

// Configuración de CORS
app.use(
  cors({
    origin: "http://localhost:3000", // Origen del frontend
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Obtener __dirname en módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Rutas
app.use("/api/players", playersRoutes);
app.use("/api/referees", refereeRoutes);
app.use("/api/treasurers", treasurerRoutes);
app.use("/api/technical_directors", technicalDirectorsRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/tournaments", tournamentRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/reports", ReportRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // 🔹 Configuración del cron job para eliminar usuarios inactivos cada 2 minutos
// cron.schedule("0 0 1 1 *", async () => {
//   try {
//     console.log("Ejecutando eliminación de usuarios inactivos...");
//     await deleteInactiveUsers();
//   } catch (error) {
//     console.error("Error en la tarea programada:", error);
//   }
// });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
