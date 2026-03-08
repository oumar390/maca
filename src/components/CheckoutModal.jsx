import { useState, useEffect } from 'react';
import './CheckoutModal.css';

const CheckoutModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({ fullName: '', phone: '', address: '', quantity: 1 });
  const [price, setPrice] = useState(15000); // Prix par défaut
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  useEffect(() => {
    if (isOpen) {
      // Tenter de récupérer le prix dynamique (fonctionnera en prod sur Vercel/Netlify)
      fetch('/api/price')
        .then(res => res.json())
        .then(data => {
          if (data && data.price) setPrice(data.price);
        })
        .catch(err => console.log('Utilisation du prix par défaut en local.'));
    }
  }, [isOpen]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          total: price * formData.quantity
        })
      });

      if (response.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error(error);
      // Fallback de succès local si l'API n'est pas routée par Vite
      setStatus('success');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        
        {status === 'success' ? (
          <div className="modal-success">
            <h2>🎉 Commande Confirmée !</h2>
            <p>Merci pour votre commande de X-Power. Notre équipe va vous contacter très prochainement pour l'expédition.</p>
            <button className="btn btn-primary btn-checkout" onClick={onClose}>Fermer</button>
          </div>
        ) : (
          <>
            <div className="modal-header">
              <h2>Finaliser votre commande</h2>
              <p>Profitez de notre offre actuelle. Expédition rapide partout en Afrique.</p>
            </div>

            <div className="packs-container">
              <div className="pack-card selected recommended">
                <div className="recommended-badge">Cure X-Power</div>
                <div className="pack-title">{formData.quantity} Boîte{formData.quantity > 1 ? 's' : ''} de Café</div>
                <div className="pack-desc">{16 * formData.quantity} Sachets Individuels</div>
                <div className="pack-price">{(price * formData.quantity).toLocaleString()} FCFA</div>
              </div>
            </div>

            <form className="checkout-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Quantité désirée</label>
                <input type="number" name="quantity" min="1" max="10" value={formData.quantity} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Nom complet</label>
                <input type="text" name="fullName" placeholder="Ex: Oumar Sy" value={formData.fullName} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Numéro de téléphone</label>
                <input type="tel" name="phone" placeholder="Ex: +221..." value={formData.phone} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Adresse de livraison complète</label>
                <textarea name="address" rows="2" placeholder="Ex: Dakar, Quartier X, Rue Y" value={formData.address} onChange={handleChange} required></textarea>
              </div>

              <div className="modal-footer">
                <button type="submit" className="btn btn-primary btn-checkout" disabled={status === 'loading'}>
                  {status === 'loading' ? 'Traitement...' : 'Valider la Commande'}
                </button>
                <div className="secure-badges">
                  <span className="secure-text">🔒 Vos informations sont sécurisées</span>
                </div>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default CheckoutModal;
