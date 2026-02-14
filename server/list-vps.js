const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

async function main() {
    console.log('--- VPS START ---');
    const res = await pool.query('SELECT id, name, host, username FROM cockpit_vps');
    res.rows.forEach(v => {
        console.log(`ID: ${v.id}, Name: ${v.name}, Host: ${v.host}, User: ${v.username}`);
    });
    console.log('--- VPS END ---');
    await pool.end();
}

main().catch(err => console.error(err));
