import './Hero.css';
import heroBoxImg from '../assets/images/real_product_hero.png';

const Hero = ({ onOpenCheckout }) => {
  return (
    <section className="hero" id="hero">
      <div className="container hero-container">
        <div className="hero-content">
          <div className="badge">
            <span className="star-icon">★</span>
          </div>
          <h1 className="hero-title">
            Découvrez <br />
            <span className="highlight-yellow">L'Énergie Noire</span>
          </h1>
          <p className="hero-description">
            Le Café Instantané X-Power au Maca Biologique. Conçu pour améliorer 
            la vitalité et les performances masculines avec une saveur intense.
            Une énergie naturelle pour repousser vos limites.
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary" onClick={onOpenCheckout}>Acheter Maintenant</button>
            <a href="#" className="explore-link" onClick={(e) => { e.preventDefault(); onOpenCheckout(); }}>En Savoir Plus</a>
          </div>

          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-label">Ingrédients</span>
              <span className="stat-value">Maca 100% Naturel</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Certification</span>
              <span className="stat-value">Garantie GMP</span>
            </div>
            <div className="stat-reviews">
              <div className="stars">★★★★★</div>
              <div className="review-text">
                <span className="review-count">Plus de 3,000</span>
                <span className="review-label">Avis Positifs</span>
              </div>
              <div className="review-avatars">
                <div className="avatar avatar-1"></div>
                <div className="avatar avatar-2"></div>
                <div className="avatar avatar-3"></div>
                <div className="avatar-more">+</div>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-image-wrapper">
           {/* Placeholder for the complex composition. In a real scenario we'd use layered images */}
          <div className="decorative-star star-top-left">✦</div>
          <div className="decorative-star star-bottom-right">✦</div>
          <div className="floating-badge">X<br/>POWER</div>
          
          <img src={heroBoxImg} alt="X-Power Coffee Box" className="main-coffee-img" />
          
          <div className="info-card floating-card">
             <p className="small-text">L'Énergie <br/>Ultime</p>
             <p className="small-detail">Contient :<br/>Maca <span className="dot"></span> Café <span className="dot"></span> Extraits Naturels</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
