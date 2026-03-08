require('dotenv').config();
const Airtable = require('airtable');

const apiKey = process.env.AIRTABLE_API_KEY;
const baseId = process.env.AIRTABLE_BASE_ID;

const base = new Airtable({ apiKey }).base(baseId);

async function testSubmit() {
  try {
    const record = await base('Commandes').create([
      {
        fields: {
          "Nom Complet": "Oumar Test",
          "Téléphone": "+221770000000",
          "Ville / Adresse": "Dakar",
          "Quantité": 1,
          "Total à payer": 15000,
          "Statut": "Nouvelle"
        }
      }
    ]);
    console.log("Success! ID:", record[0].getId());
  } catch (error) {
    console.error("Airtable Error:", error);
  }
}

testSubmit();
