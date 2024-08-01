import pg from 'pg';

const { Pool } = pg;

export const pool = new Pool({
  user: 'postgres',
  password: 'postgres',
  host: 'localhost',
  port: 5433,
  database: 'postgres',
})

async function migrate() {
  await pool.query(`CREATE TABLE IF NOT EXISTS users (
    Id SERIAL PRIMARY KEY,
    Username VARCHAR(128) NOT NULL,
    Password VARCHAR(255) NOT NULL,
    CreateTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`)
  console.log('migrate success');
}

migrate()