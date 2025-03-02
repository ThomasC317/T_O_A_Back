// Installation des dépendances
// npm install express pg dotenv

const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = 3001;

// Connexion à PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

app.use(express.json());

// Création des tables (à exécuter une seule fois)
// const createTables = async () => {
//   try {
//     await pool.query(`
// CREATE TABLE IF NOT EXISTS joueurs (
//   id SERIAL PRIMARY KEY,
//   nom VARCHAR(50) NOT NULL,
//   niveau INT DEFAULT 1,
//   "or" INT DEFAULT 0
// );

// CREATE TABLE IF NOT EXISTS villageois (
//   id SERIAL PRIMARY KEY,
//   joueur_id INT REFERENCES joueurs(id) ON DELETE CASCADE,
//   type VARCHAR(50) NOT NULL,
//   niveau INT DEFAULT 1
// );

// CREATE TABLE IF NOT EXISTS ressources (
//   id SERIAL PRIMARY KEY,
//   joueur_id INT REFERENCES joueurs(id) ON DELETE CASCADE,
//   type VARCHAR(50) NOT NULL,
//   quantite INT DEFAULT 0
// );
//     `);
//     console.log("Tables créées avec succès");
//   } catch (err) {
//     console.error("Erreur création tables", err);
//   }
// };

// createTables();
// const resetDb = async() => {
//   try {
//     await pool.query(`
//       DROP TABLE IF EXISTS joueurs, villageois, ressources;
//       `);
//    } catch (err) {
//       console.error("Erreur création tables", err);
//     }
// };

// resetDb();

// Route pour ajouter un joueur
app.post('/joueurs', async (req, res) => {
  const { nom } = req.body;
  try {
    const result = await pool.query('INSERT INTO joueurs (nom) VALUES ($1) RETURNING *', [nom]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route pour récupérer les joueurs
app.get('/joueurs', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM joueurs');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
