const pool = require('../config/database');

class Save {
  static async getSave(saveId) {
    const result = await pool.query('SELECT * FROM save WHERE id (&1)',[saveId]);
    return result.rows;
  }
}

module.exports = Save;