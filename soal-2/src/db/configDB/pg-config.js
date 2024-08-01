import pg from 'pg';

const { Pool } = pg;

export const pool = new Pool({
  user: 'postgres',
  password: 'postgres',
  host: 'localhost',
  port: 5433,
  database: 'postgres',
})