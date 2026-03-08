import './BestSellers.css';
import macaImg from '../assets/images/xpower_maca_root.png';
import beansImg from '../assets/images/xpower_coffee_beans.png';
import extractsImg from '../assets/images/xpower_extracts.png';

const ingredients = [
  {
    id: 1,
    name: "Maca Biologique",
    desc: "Plante adaptogène sacrée des Andes, reconnue pour ses vertus sur la vitalité, l'endurance et l'équilibre hormonal masculin.",
    image: macaImg,
    tag: "Ingrédient Star",
    isFeatured: true
  },
  {
    id: 2,
    name: "Café Noir Premium",
    desc: "Mélange exclusif de grains sélectionnés pour une torréfaction intense, offrant un coup de fouet immédiat sans acidité.",
    image: beansImg,
    tag: ""
  },
  {
    id: 3,
    name: "Extraits Énergisants",
    desc: "Un complexe naturel conçu pour prolonger les effets de la caféine de manière saine et durable toute la journée.",
    image: extractsImg,
    tag: ""
  }
];

const BestSellers = ({ onOpenCheckout }) => {
  return (
    <section className="best-sellers section-padding" id="ingredients">
      <div className="container">
        <div className="best-headers-wrapper">
          <h2 className="section-title text-center">Le Secret de notre Formule</h2>
          <p className="best-desc text-center">
            Une composition transparente et 100% naturelle. Nous avons réuni le meilleur 
            de la nature pour créer un café qui va au-delà du simple réveil matinal, 
            certifié GMP pour une qualité irréprochable.
          </p>
        </div>

        <div className="best-grid">
          {ingredients.map((item) => (
            <div key={item.id} className={`best-card ${item.isFeatured ? 'featured-card' : ''}`}>
              <div className="best-img-wrapper">
                {item.tag && <span className="best-tag">{item.tag}</span>}
                <img src={item.image} alt={item.name} className="best-img" />
              </div>
              <div className="best-info" style={{ textAlign: "center", padding: "0 10px" }}>
                <h3 style={{ marginBottom: "12px", fontSize: "20px" }}>{item.name}</h3>
                <p style={{ fontSize: "14px", color: "var(--color-text-light)", marginBottom: "20px" }}>
                  {item.desc}
                </p>
                {item.isFeatured && (
                  <button className="btn btn-primary" onClick={onOpenCheckout} style={{ width: "100%" }}>
                    Découvrir l'Effet
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
