import Airtable from 'airtable';

export default async function handler(req, res) {
  // Configurer Airtable avec les variables d'environnement
  const apiKey = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;

  if (!apiKey || !baseId) {
    // Fallback de sécurité (pour dev local si clés non présentes)
    return res.status(200).json({ price: 15000 });
  }

  const base = new Airtable({ apiKey }).base(baseId);

  try {
    // On cherche le produit actif (ex: "X-Power Coffee")
    const records = await base('Produits').select({
      maxRecords: 1,
      filterByFormula: "{Actif} = 1"
    }).firstPage();

    if (records.length > 0) {
      const price = records[0].get('Prix');
      return res.status(200).json({ price });
    } else {
      // Prix par défaut si aucun produit actif trouvé
      return res.status(200).json({ price: 15000 });
    }
  } catch (error) {
    console.error("Erreur Airtable (Price):", error);
    return res.status(500).json({ error: 'Erreur lors de la récupération du prix' });
  }
}
