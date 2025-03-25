import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import farmerRoutes from "./src/routes/farmer.route.js";
import itemRoutes from "./src/routes/item.route.js";
import saveRoutes from "./src/routes/save.route.js";
import servantRoutes from "./src/routes/servant.route.js";
import skillRoutes from "./src/routes/skill.route.js";
import userRoutes from "./src/routes/user.route.js";
import villageRoutes from "./src/routes/village.route.js";
import villageFarmerRoutes from "./src/routes/villageFarmer.route.js";
import villageItemRoutes from "./src/routes/villageItem.route.js";
import villageServantRoutes from "./src/routes/villageServant.route.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json()); // Pour parser les JSON reçus

// Définir les routes
app.use("/api/farmers", farmerRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/saves", saveRoutes);
app.use("/api/servants", servantRoutes);
app.use("/api/skill", skillRoutes);
app.use("/api/users", userRoutes);
app.use("/api/villages", villageRoutes);
app.use("/api/villageFarmers",villageFarmerRoutes);
app.use("/api/villageItems",villageItemRoutes);
app.use("/api/villageServants",villageServantRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0",() => {
  console.log(`Server running on http://localhost:${PORT}`);
});
