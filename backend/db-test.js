const { sql } = require('./src/config/index');
sql`SELECT NOW()`
  .then(() => console.log('DATABASE_CONNECTION_OK'))
  .catch(e => console.log('DATABASE_ERROR:', e.message));