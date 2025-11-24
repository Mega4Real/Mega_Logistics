import 'dotenv/config';
import { Pool, neonConfig } from '@neondatabase/serverless';
import ws from 'ws';

neonConfig.webSocketConstructor = ws;

async function main() {
    const connectionString = process.env.DATABASE_URL;
    console.log('Testing Pool direct connection...');
    console.log('URL length:', connectionString?.length);

    const pool = new Pool({ connectionString });

    try {
        const client = await pool.connect();
        console.log('✅ Pool connected!');
        const res = await client.query('SELECT NOW()');
        console.log('Time:', res.rows[0]);
        client.release();
    } catch (e) {
        console.error('❌ Pool connection failed:', e);
    } finally {
        await pool.end();
    }
}

main();
