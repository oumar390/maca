import dotenv from 'dotenv';
import Airtable from 'airtable';

dotenv.config();

const apiKey = process.env.AIRTABLE_API_KEY;
const baseId = process.env.AIRTABLE_BASE_ID;

console.log("Using Base ID:", baseId);
const base = new Airtable({ apiKey }).base(baseId);

async function checkData() {
  try {
    const records = await base('Commandes').select().firstPage();
    console.log(`Found ${records.length} records in Commandes.`);
    records.forEach(r => console.log(r.id, r.fields));
  } catch (error) {
    console.error("Airtable Error API:", error.message);
  }
}

checkData();
