// sync-env-to-render.js
const fs = require('fs');

// TODO: Replace with your actual Render API key and Service ID
const RENDER_API_KEY = 'rnd_AazShz5kcOT42JhCJyljavyhcrCBnpm';
const SERVICE_ID = 'srv-d6g68v1r0fns73envre0';

const env = fs.readFileSync('./backend/.env', 'utf-8')
  .split('\n')
  .filter(line => line && !line.startsWith('#'))
  .map(line => {
    const [key, ...rest] = line.split('=');
    return { key, value: rest.join('=') };
  });

(async () => {
  for (const { key, value } of env) {
    await fetch(`https://api.render.com/v1/services/${SERVICE_ID}/env-vars`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RENDER_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ key, value })
    });
    console.log(`Set ${key}`);
  }
  console.log('All environment variables synced!');
})();
