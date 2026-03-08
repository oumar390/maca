import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-logo">
          <div className="logo-box footer-logo-box">
             <span className="logo-text">X</span>
          </div>
        </div>
        
        <ul className="footer-links">
           <li><a href="#">Produits</a></li>
           <li><a href="#">Bienfaits</a></li>
           <li><a href="#">Avis</a></li>
           <li><a href="#">À Propos</a></li>
        </ul>

        <div className="footer-socials">
           <a href="#" aria-label="Facebook">f</a>
           <a href="#" aria-label="Instagram">ig</a>
           <a href="#" aria-label="Twitter">tw</a>
        </div>
      </div>
      <div className="footer-bottom">
         <p>&copy; 2026 X-Power Coffee. Tous droits réservés.</p>
      </div>
    </footer>
  );
};

export default Footer;
