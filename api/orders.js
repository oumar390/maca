const Airtable = require('airtable');

export default async function handler(req, res) {
  // N'accepter que les requêtes POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { fullName, phone, address, quantity, total } = req.body;

  if (!fullName || !phone || !address) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const apiKey = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;

  if (!apiKey || !baseId) {
    console.warn("Clés Airtable manquantes. Simulation de succès en local.");
    return res.status(200).json({ success: true, message: 'Commande simulée avec succès (clés manquantes).' });
  }

  const base = new Airtable({ apiKey }).base(baseId);

  try {
    const record = await base('Commandes').create([
      {
        fields: {
          "Nom Complet": fullName,
          "Téléphone": phone,
          "Ville / Adresse": address,
          "Quantité": quantity || 1,
          "Total à payer": total || 15000,
          "Statut": "Nouvelle"
        }
      }
    ]);

    return res.status(200).json({ success: true, id: record[0].getId() });
  } catch (error) {
    console.error("Erreur Airtable (Order):", error);
    return res.status(500).json({ error: 'Erreur lors de la création de la commande' });
  }
}
