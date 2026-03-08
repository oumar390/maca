import { useState, useEffect } from 'react';
import { Search, Package, RefreshCw, LogOut } from 'lucide-react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Simple "security" just to hide the UI on the client side
  // The real security should be on the API level, but this prevents random visitors from seeing it easily
  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'xpoweradmin123') { // Hardcoded MVP password as requested
      setIsAuthenticated(true);
      fetchOrders();
    } else {
      setError('Mot de passe incorrect');
    }
  };

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin-orders');
      if (!response.ok) throw new Error("Erreur serveur");
      const data = await response.json();
      setOrders(data);
    } catch (err) {
      console.error(err);
      setError("Impossible de charger les commandes.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await fetch('/api/admin-orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus })
      });
      
      if (response.ok) {
        // Mettre à jour l'UI localement
        setOrders(orders.map(o => o.id === id ? { ...o, Statut: newStatus } : o));
      } else {
        alert("Erreur lors de la mise à jour");
      }
    } catch (err) {
      alert("Erreur réseau");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-login-container">
        <div className="admin-login-box">
          <Package size={48} className="admin-icon" />
          <h2>X-Power Admin</h2>
          <form onSubmit={handleLogin}>
            <input 
              type="password" 
              placeholder="Mot de passe" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
            {error && <p className="admin-error">{error}</p>}
            <button type="submit" className="btn btn-primary">Accéder au Dashboard</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div className="admin-logo">
          <Package size={24} />
          <h2>Commandes X-Power</h2>
        </div>
        <div className="admin-actions">
          <button className="icon-btn" onClick={fetchOrders} title="Actualiser" disabled={loading}>
            <RefreshCw size={20} className={loading ? 'spinning' : ''} />
          </button>
          <button className="icon-btn" onClick={() => setIsAuthenticated(false)} title="Déconnexion">
            <LogOut size={20} />
          </button>
        </div>
      </header>

      <main className="admin-main">
        <div className="admin-stats">
          <div className="stat-card">
            <h3>Total Commandes</h3>
            <p className="stat-number">{orders.length}</p>
          </div>
          <div className="stat-card">
            <h3>En Attente</h3>
            <p className="stat-number">{orders.filter(o => o.Statut === 'Nouvelle' || !o.Statut).length}</p>
          </div>
        </div>

        <div className="orders-table-container">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Client</th>
                <th>Contact</th>
                <th>Adresse</th>
                <th>Qté</th>
                <th>Total (FCFA)</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id}>
                  <td>{new Date(order.Date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}</td>
                  <td className="font-bold">{order["Nom Complet"]}</td>
                  <td>{order["Téléphone"]}</td>
                  <td className="address-cell">{order["Ville / Adresse"]}</td>
                  <td><span className="qty-badge">{order.Quantité}</span></td>
                  <td className="font-bold">{(order["Total à payer"] || 0).toLocaleString()}</td>
                  <td>
                    <select 
                      value={order.Statut || 'Nouvelle'} 
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className={`status-select status-${(order.Statut || 'Nouvelle').toLowerCase().replace(' ', '-')}`}
                    >
                      <option value="Nouvelle">🔵 Nouvelle</option>
                      <option value="En traitement">🟡 En traitement</option>
                      <option value="Expédiée">🟢 Expédiée</option>
                      <option value="Payée">✅ Payée</option>
                    </select>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && !loading && (
                <tr>
                  <td colSpan="7" className="text-center py-8 text-gray-400">Aucune commande pour le moment.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
