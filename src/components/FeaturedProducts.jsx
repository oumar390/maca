import './FeaturedProducts.css';
import lifestyleImg from '../assets/images/xpower_lifestyle.png';
import macaImg from '../assets/images/xpower_maca_root.png';
import beansImg from '../assets/images/xpower_coffee_beans.png';

const benefits = [
  {
    id: 1,
    name: "Vitalité Renouvelée",
    type: "Énergie Longue Durée",
    image: lifestyleImg,
    desc: "Oubliez les coups de fatigue. L'association de notre café premium et de la racine de Maca offre une libération d'énergie constante tout au long de votre journée."
  },
  {
    id: 2,
    name: "Maca Biologique",
    type: "Performance Naturelle",
    image: macaImg,
    desc: "Reconnu depuis des millénaires, le Maca agit comme un adaptogène puissant pour stabiliser vos hormones et booster votre endurance physique."
  },
  {
    id: 3,
    name: "Concentration",
    type: "Focus Mental",
    image: beansImg,
    desc: "Grâce à une torréfaction minutieuse, chaque tasse stimule vos facultés cognitives pour une concentration absolue sans la nervosité du café classique."
  }
];

const FeaturedProducts = () => {
  return (
    <section className="featured-products section-padding" id="benefits">
      <div className="container">
        <div className="featured-header">
          <h2>
            Les Bénéfices<br />
            X-Power
          </h2>
          <div className="header-decoration">
             <svg width="200" height="20" viewBox="0 0 200 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 10 Q 50 0, 100 10 T 200 10" stroke="#E25822" strokeWidth="2" fill="transparent"/>
             </svg>
          </div>
          <p className="featured-desc">
            X-Power n'est pas qu'un simple café. C'est une formule synergique étudiée 
            pour les hommes exigeants qui veulent tirer le meilleur d'eux-mêmes, 
            physiquement et mentalement.
          </p>
        </div>

        <div className="products-list benefits-layout">
          {benefits.map((benefit) => (
            <div key={benefit.id} className="product-item benefit-card">
              <img src={benefit.image} alt={benefit.name} className="product-img benefit-icon" />
              <div className="product-info">
                <h3>{benefit.name}</h3>
                <span className="product-type highlight-yellow">{benefit.type}</span>
                <p className="benefit-desc">{benefit.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
