const { sql } = require('./index');

async function initDb() {
  await sql`
    CREATE TABLE IF NOT EXISTS transactions (
      id VARCHAR(64) PRIMARY KEY,
      phone VARCHAR(32) NOT NULL,
      amount NUMERIC NOT NULL,
      mpesa_receipt VARCHAR(64),
      status VARCHAR(32),
      created_at TIMESTAMP DEFAULT NOW()
    );
  `;
  console.log('✅ transactions table ensured');
}

initDb()
  .then(() => process.exit(0))
  .catch(e => {
    console.error('DB INIT ERROR:', e);
    process.exit(1);
  });
