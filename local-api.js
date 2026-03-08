import express from 'express';
import dotenv from 'dotenv';
import priceHandler from './api/price.js';
import ordersHandler from './api/orders.js';
import adminOrdersHandler from './api/admin-orders.js';

dotenv.config();

const app = express();
app.use(express.json());

// Mapper les fonctions Serverless locales pour le développement
app.all('/api/price', priceHandler);
app.all('/api/orders', ordersHandler);
app.all('/api/admin-orders', adminOrdersHandler);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`\n🚀 [Backend Local] Simulation Serverless lancée sur http://localhost:${PORT}`);
  console.log(`📦 [Airtable] Connecté à la base: ${process.env.AIRTABLE_BASE_ID}\n`);
});
