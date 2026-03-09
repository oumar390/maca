import Airtable from 'airtable';

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
          "Quantité": parseInt(quantity, 10) || 1,
          "Total à payer": parseInt(total, 10) || 15000,
          "Statut": ["Nouvelle"]
        }
      }
    ]);

    // Déclenchement du Webhook n8n (Télégram / Gmail)
    try {
      const webhookUrl = process.env.N8N_WEBHOOK_URL || 'https://prod.n8wli.uk/webhook/0ac1dc3a-eb83-4d25-b69b-065f8c2e0bb1';
      if (webhookUrl) {
        const webhookResponse = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            orderId: record[0].getId(),
            fullName,
            phone,
            address,
            quantity: parseInt(quantity, 10) || 1,
            total: parseInt(total, 10) || 15000
          })
        });
        
        // Vercel Edge Serverless functions will kill the process if we return too early.
        // We MUST await the raw text response body to guarantee the outbound POST was fully transmitted.
        const webhookResult = await webhookResponse.text();
        console.log("Webhook n8n envoyé avec succès. Réponse du serveur :", webhookResult);
      } else {
        console.log("Aucune URL Webhook n8n configurée. Envoi ignoré.");
      }
    } catch (webhookError) {
      console.error("Erreur d'envoi du Webhook n8n:", webhookError);
      // On ne bloque pas la réponse client si le webhook échoue
    }

    return res.status(200).json({ success: true, id: record[0].getId() });
  } catch (error) {
    console.error("Erreur Airtable (Order):", error);
    return res.status(500).json({ error: 'Erreur lors de la création de la commande' });
  }
}
