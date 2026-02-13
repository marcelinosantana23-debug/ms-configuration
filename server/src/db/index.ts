import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

// Prioriza POSTGRES_URL (Vercel) ou DATABASE_URL
const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/ms_configuration';

const pool = new Pool({
  connectionString,
  // Habilita SSL apenas se não for localhost (necessário para Vercel Postgres)
  ssl: connectionString.includes('localhost') ? false : { rejectUnauthorized: false }
});

export const db = drizzle(pool, { schema });

export async function testConnection() {
  try {
    const result = await pool.query('SELECT NOW()');
    console.log('✅ Database connection successful:', result.rows[0]);
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    return false;
  }
}

export async function closeConnection() {
  await pool.end();
}
