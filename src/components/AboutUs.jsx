import './AboutUs.css';
import storyImg from '../assets/images/xpower_story.png';
import plantationImg from '../assets/images/xpower_plantation.png';

const AboutUs = ({ onOpenCheckout }) => {
  return (
    <section className="about-us section-padding" id="about">
      <div className="container about-container">
        
        {/* Left Column (Text & Lower Image) */}
        <div className="about-left">
          <div className="about-text-content">
            <h2 className="section-title">À Propos</h2>
            <h3 className="section-subtitle">La Naissance de X-Power</h3>
            <p className="about-desc">
              L'histoire de X-Power commence avec une vision : créer le café 
              énergisant ultime. En combinant des grains de café de la plus haute 
              qualité avec de la racine de Maca biologique, nous avons conçu une 
              formule unique pour la vitalité masculine.
            </p>
            <button className="btn btn-primary about-btn" onClick={onOpenCheckout}>Commander Maintenant</button>
          </div>
          
          <div className="about-img-lower-wrapper">
             <img src={storyImg} alt="Homme Actif X-Power" className="about-img-lower" style={{borderRadius: "12px"}}/>
          </div>
        </div>

        {/* Right Column (Upper Image & Purpose Text) */}
        <div className="about-right">
           <div className="about-img-upper-wrapper">
               <div className="wavy-line-decoration">
                 {/* svg or pure css wavy lines mapping to the background pattern */}
               </div>
               <img src={plantationImg} alt="Plantation Café X-Power" className="about-img-upper" style={{borderRadius: "12px"}}/>
           </div>

           <div className="purpose-card">
              <h4 className="purpose-title">Notre Mission</h4>
              <p className="purpose-text">
                Chez X-Power, notre objectif est de vous fournir une énergie 
                saine et durable. Nos usines certifiées GMP garantissent une 
                qualité et une sécurité absolues, de la sélection des ingrédients 
                jusqu'à votre tasse.
              </p>
              <button className="btn btn-primary purpose-btn" onClick={onOpenCheckout}>Commander Maintenant</button>
           </div>
        </div>

      </div>
    </section>
  );
};

export default AboutUs;
