import './Newsletter.css';
import lifestyleImg from '../assets/images/xpower_lifestyle.png';

const Newsletter = ({ onOpenCheckout }) => {
  return (
    <section className="newsletter section-padding relative">
        <div className="wavy-bg-decorative"></div> {/* For the background wavy pattern */}
        <div className="container newsletter-container">
            <div className="newsletter-img-wrapper" style={{ padding: "0 20px" }}>
                <img style={{ borderRadius: "12px", boxShadow: "0 20px 40px rgba(0,0,0,0.5)" }} src={lifestyleImg} alt="Lifestyle X-Power" className="newsletter-img" />
            </div>
            
            <div className="newsletter-content" style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <h2 className="newsletter-title" style={{ fontSize: "2.5rem", marginBottom: "20px" }}>
                    Prêt à réveiller<br/>
                    votre potentiel ?
                </h2>
                <p className="newsletter-desc" style={{ marginBottom: "30px", fontSize: "16px" }}>
                    Rejoignez des milliers d'hommes qui ont déjà fait le choix de l'excellence. 
                    Commandez votre cure X-Power aujourd'hui et recevez en bonus exclusif notre 
                    <strong> Guide Numérique "Maîtriser sa Vitalité" </strong> totalement gratuit.
                </p>
                <div className="newsletter-actions">
                    <button className="btn btn-primary" style={{ padding: "16px 40px", fontSize: "18px" }} onClick={onOpenCheckout}>
                      Commencer ma Cure
                    </button>
                </div>
            </div>
        </div>
    </section>
  );
};

export default Newsletter;
