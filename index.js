import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./src/routes/user.route.js";


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json()); // Pour parser les JSON reçus

// Définir les routes
app.use("/api/users", userRoutes);
// app.use("/api/villages", villageRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
