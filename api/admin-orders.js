import Airtable from 'airtable';

export default async function handler(req, res) {
  const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID);

  if (req.method === 'GET') {
    try {
      const records = await base('Commandes').select({
        sort: [{ field: "Date", direction: "desc" }]
      }).firstPage();
      
      const orders = records.map(record => ({
        id: record.getId(),
        ...record.fields
      }));

      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json({ error: "Unable to find 'Commandes' table or fetch records", details: err });
    }
  } else if (req.method === 'PATCH') {
    try {
      const { id, status } = req.body;
      
      if (!id || !status) {
        return res.status(400).json({ error: "Missing ID or Status" });
      }

      await base('Commandes').update([
        {
          id: id,
          fields: {
            "Statut": status
          }
        }
      ]);
      
      res.status(200).json({ success: true, message: `Order ${id} updated to ${status}` });
    } catch (err) {
      res.status(500).json({ error: "Failed to update record", details: err });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PATCH']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
