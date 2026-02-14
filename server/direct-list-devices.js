const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

async function main() {
    console.log('--- DEVICES START ---');
    const res = await pool.query('SELECT id, status, last_seen_at, name FROM cocktail_devices ORDER BY last_seen_at DESC NULLS LAST');
    res.rows.forEach(d => {
        console.log(`ID: ${d.id}, Status: ${d.status}, LastSeen: ${d.last_seen_at}, Name: ${d.name}`);
    });
    console.log('--- DEVICES END ---');
    await pool.end();
}

main().catch(err => console.error(err));
