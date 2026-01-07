import React, { useState, useEffect, useRef } from 'react';
import Swal from 'sweetalert2'; 
import './App.css';
import { 
  FaBars, FaTimes, FaWhatsapp, FaLayerGroup, 
  FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, 
  FaWrench, FaStore, FaCar,
  FaCheckCircle, FaLaptopCode, FaCogs, FaPaintBrush, FaUserTie,
  FaInstagram, FaGithub, FaArrowUp, FaChevronDown, FaSearch, FaExternalLinkAlt,
  FaCloud, FaDesktop, FaClinicMedical, FaUserMd, FaMobileAlt, FaCode, FaGlobe, FaRobot
} from 'react-icons/fa';

// --- LOGO PATH ---
const logoUrl = "img/suahimsoft.png"; 

const countryCodes = [
  { name: "India", code: "+91", flag: "🇮🇳" },
  { name: "USA", code: "+1", flag: "🇺🇸" },
  { name: "UK", code: "+44", flag: "🇬🇧" },
  { name: "UAE", code: "+971", flag: "🇦🇪" },
  { name: "Saudi Arabia", code: "+966", flag: "🇸🇦" },
  { name: "Qatar", code: "+974", flag: "🇶🇦" },
  { name: "Kuwait", code: "+965", flag: "🇰🇼" },
  { name: "Oman", code: "+968", flag: "🇴🇲" },
  { name: "Bahrain", code: "+973", flag: "🇧🇭" },
  { name: "Germany", code: "+49", flag: "🇩🇪" },
  { name: "France", code: "+33", flag: "🇫🇷" },
];

const serviceOptions = [
  "App Development",
  "Full Stack Developer",
  "MERN Stack Developer",
  "Web Development",
  "Software Development",
  "UI/UX Design",
  "Other"
];

function App() {
  const [loading, setLoading] = useState(true); 
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showWaModal, setShowWaModal] = useState(false);
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);
  
  const [formData, setFormData] = useState({
    name: '',
    serviceType: 'App Development',
    countryCode: '+91',
    selectedFlag: '🇮🇳',
    phone: '',
    message: ''
  });

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMenu = () => setMobileMenuOpen(false);
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const toggleWaModal = () => setShowWaModal(!showWaModal);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCountrySelect = (country) => {
    setFormData({ ...formData, countryCode: country.code, selectedFlag: country.flag });
    setIsDropdownOpen(false);
    setSearchTerm("");
  };

  const filteredCountries = countryCodes.filter(country => 
    country.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    country.code.includes(searchTerm)
  );

  const handleFormSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to send this inquiry via WhatsApp?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#25d366",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Send it!"
    }).then((result) => {
      if (result.isConfirmed) {
        const { name, serviceType, countryCode, phone, message } = formData;
        const fullPhone = `${countryCode} ${phone}`;
        const msgContent = `%0A*Interested In:* ${encodeURIComponent(serviceType)}%0A*Note:* ${encodeURIComponent(message || 'No additional notes')}`;
        const whatsappUrl = `https://wa.me/918891479505?text=*New Inquiry*%0A%0A*Name:* ${encodeURIComponent(name)}%0A*Phone:* ${encodeURIComponent(fullPhone)}${msgContent}`;
        window.open(whatsappUrl, '_blank');
        Swal.fire("Sent!", "We will contact you shortly.", "success");
        setFormData({ name: '', serviceType: 'App Development', countryCode: '+91', selectedFlag: '🇮🇳', phone: '', message: '' });
      }
    });
  };

  const solutions = [
    { name: "PHYSIOT Manager", icon: <FaUserMd />, desc: "Complete Management System Software" },
    { name: "Workshop Pro", icon: <FaWrench />, desc: "Workshop Management System" },
    { name: "Ozon Detailing", icon: <FaCar />, desc: "Welcome to OZON Detailing & Car Wash" },
    { name: "Clinic Management", icon: <FaClinicMedical />, desc: "Complete Clinic & Pharmacy System" },
    { name: "Stone Exterio", icon: <FaStore />, desc: "Timeless stone solutions for elegant and durable exteriors." },
  ];

  return (
    <div className="App">

      {/* --- Loader --- */}
      {loading && (
        <div className="page-loader">
          <div className="loader-content">
            <FaLayerGroup className="loader-icon pulse" />
            <h2>Suhaim<span className="color-text">Soft</span></h2>
            <div className="loading-bar"></div>
          </div>
        </div>
      )}

      <div className={`back-to-top ${showBackToTop ? 'visible' : ''}`} onClick={scrollToTop}>
        <FaArrowUp />
      </div>

      {/* --- WhatsApp Widget --- */}
      <div className="wa-widget-container">
        {showWaModal && (
          <div className="wa-chat-box pop-in-3d">
            <div className="wa-header">
              <div className="wa-header-text"><h3>SuhaimSoft</h3></div>
              <FaTimes className="wa-close" onClick={toggleWaModal} />
            </div>
            <div className="wa-body">
              <div className="wa-msg-bubble">
                <FaUserTie className="wa-avatar" /> 
                <div className="wa-text"><strong>Welcome! 👋</strong><br/>Need a developer or software? Chat with us!</div>
              </div>
              <a href="https://wa.me/918891479505" target="_blank" rel="noreferrer" className="wa-chat-btn-3d">
                <FaWhatsapp className="btn-icon" /> Start Chat
              </a>
            </div>
          </div>
        )}
        <div className="wa-float-btn-3d" onClick={toggleWaModal}>
          {showWaModal ? <FaTimes /> : <FaWhatsapp />}
        </div>
      </div>

      {/* --- Navbar --- */}
      <nav className="navbar">
        <div className="container nav-container">
          <div className="logo">
            <a href="#home">
              <img src={logoUrl} alt="SuhaimSoft" className="logo-img" onError={(e)=>{e.target.style.display = 'none'; e.target.parentNode.innerHTML = '<h2>Suhaim<span class="color-text">Soft</span></h2>';}} />
            </a>
          </div>
          <div className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
            <div className="mobile-close" onClick={closeMenu}><FaTimes /></div>
            <a href="#home" onClick={closeMenu}>Home</a>
            <a href="#about" onClick={closeMenu}>About Us</a>
            <a href="#services" onClick={closeMenu}>Expertise</a>
            <a href="#work" onClick={closeMenu}>Our Work</a>
            <a href="#developers" onClick={closeMenu}>Developers</a>
            <a href="#contact" onClick={closeMenu}>Contact Us</a>
            
            <div className="nav-social-icons">
              <a href="tel:+918891479505" title="Call Us"><FaPhoneAlt /></a>
              <a href="https://wa.me/918891479505" target="_blank" rel="noreferrer"><FaWhatsapp /></a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer"><FaInstagram /></a>
              <a href="https://github.com/suhaimali" target="_blank" rel="noreferrer"><FaGithub /></a>
              <a href="mailto:info@suhaimsoft.com"><FaEnvelope /></a>
            </div>
          </div>
          <div className="hamburger" onClick={toggleMenu}><FaBars /></div>
        </div>
      </nav>

      {/* --- Hero --- */}
      <header id="home" className="hero-section">
        <div className="container hero-container">
          <div className="hero-content fade-in-up">
            <h1>Welcome to <span className="gradient-text">SuhaimSoft</span></h1>
            <p>
              SuhaimSoft assures complete quality by implementing a planned and systematic pattern of actions. 
              Every initiative, every partnership, and above all, our project execution levels are built around being the best.
            </p>
            <div className="hero-buttons">
              <a href="#contact" className="btn-primary">Get Started</a>
              <a href="#work" className="btn-text">View Our Work &rarr;</a>
            </div>
          </div>
        </div>
      </header>

      {/* --- About --- */}
      <section id="about" className="section-padding bg-light">
         <div className="container">
           <div className="section-title">
             <h2>About <span className="color-text">Us</span></h2>
           </div>
           <div className="about-grid">
              <div className="about-text">
                <p>
                  We are dedicated to our customers and have extensive experience in maintaining websites and software.
                  We study projects in depth to understand client needs and deliver the best solutions.
                </p>
                <p>
                  Helping clients connect with their audience is vital. We create beautiful, easy-to-use applications
                  backed by <strong>intelligent coding</strong> for elegant solutions.
                </p>
                <ul className="check-list">
                   <li><FaCheckCircle className="chk" /> Intelligent Coding</li>
                   <li><FaCheckCircle className="chk" /> Customer Dedication</li>
                   <li><FaCheckCircle className="chk" /> Elegant Solutions</li>
                </ul>
              </div>
              <div className="about-visual">
                 <div className="visual-box">
                   <FaCode className="v-icon"/> 
                 </div>
              </div>
           </div>
         </div>
      </section>

      {/* --- Expertise --- */}
      <section id="services" className="section-padding">
        <div className="container">
          <div className="section-title">
            <h2 className="title-3d">IT Solutions & <span className="color-text">Digital Strategy</span></h2>
          </div>
          <div className="services-grid">
            
            <div className="service-card featured-card">
              <div className="s-icon"><FaMobileAlt /></div>
              <h3>App Development</h3>
              <p>We build high-performance, cross-platform mobile applications for iOS and Android using modern frameworks.</p>
            </div>
            
            <div className="service-card">
              <div className="s-icon"><FaGlobe /></div>
              <h3>Website Development</h3>
              <p>Custom, responsive websites ranging from simple landing pages to complex e-commerce platforms.</p>
            </div>

            <div className="service-card">
              <div className="s-icon"><FaRobot /></div>
              <h3>IT Solutions</h3>
              <p>Comprehensive IT consultancy and digital transformation strategies to modernize your business operations.</p>
            </div>

            <div className="service-card">
              <div className="s-icon"><FaLaptopCode /></div>
              <h3>Web Applications</h3>
              <p>Responsive, adaptive web apps for mobile and desktop. Enterprise platforms to marketing sites.</p>
            </div>
            
            <div className="service-card">
              <div className="s-icon"><FaCloud /></div>
              <h3>Online Software</h3>
              <p>Cloud-based solutions accessible from anywhere. Secure, scalable, and real-time data management.</p>
            </div>

            <div className="service-card">
              <div className="s-icon"><FaDesktop /></div>
              <h3>Offline Software</h3>
              <p>Robust desktop applications that work without internet. Fast, secure, and reliable local management.</p>
            </div>

            <div className="service-card">
              <div className="s-icon"><FaCogs /></div>
              <h3>Software Development</h3>
              <p>Custom logic tailored to your specific business workflows and scalability needs.</p>
            </div>
            <div className="service-card">
              <div className="s-icon"><FaPaintBrush /></div>
              <h3>UI/UX Design</h3>
              <p>User-centric designs ensuring applications are intuitive and visually appealing on any device.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Solutions Carousel --- */}
      <section id="solutions" className="section-padding bg-light">
        <div className="container">
          <div className="section-title">
            <h2>Software & Website <span className="color-text">Solutions</span></h2>
            <p style={{color:'#666', marginTop:'10px'}}>Trusted by Leading Businesses</p>
          </div>
          <div className="slider">
            <div className="slide-track">
              {[...solutions, ...solutions, ...solutions].map((proj, index) => (
                <div className="slide" key={index}>
                  <div className="slide-card">
                    <div className="slide-icon">{proj.icon}</div>
                    <h4>{proj.name}</h4>
                    <span>{proj.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- Our Work --- */}
      <section id="work" className="section-padding">
        <div className="container">
          <div className="section-title">
            <h2>Our <span className="color-text">Work</span></h2>
            <p>Explore our recent successful projects</p>
          </div>
          <div className="work-grid">
            <div className="work-card">
              <div className="work-icon blue"><FaClinicMedical /></div>
              <h3>Suhaim Soft EMR</h3>
              <p>SUHAIM SOFT delivers smart, secure, and efficient Electronic Medical Records (EMR) to empower healthcare professionals.</p>
              <a href="https://clinicppm.site/" target="_blank" rel="noreferrer" className="work-link">Visit ClinicPPM <FaExternalLinkAlt/></a>
            </div>
            <div className="work-card">
              <div className="work-icon orange"><FaStore /></div>
              <h3>Stone Exterio</h3>
              <p>Timeless stone solutions for elegant and durable exteriors. We build beautiful e-commerce experiences.</p>
              <a href="https://stonexterio.in/" target="_blank" rel="noreferrer" className="work-link">Visit StoneExterio <FaExternalLinkAlt/></a>
            </div>
            <div className="work-card">
              <div className="work-icon red"><FaCar /></div>
              <h3>OZON Detailing</h3>
              <p>The ultimate destination for vehicle care. We bring your car back to its showroom glory.</p>
              <a href="https://ozondetailing.in/" target="_blank" rel="noreferrer" className="work-link">Visit Ozon <FaExternalLinkAlt/></a>
            </div>
            <div className="work-card">
              <div className="work-icon green"><FaClinicMedical /></div>
              <h3>Daya Homeopathy</h3>
              <p>Real Health, Happiness & Peace of Mind. One of the best homeopathic clinics in Kerala situated at Pathappiriyam.</p>
              <a href="https://www.dayahomeopathy.com/" target="_blank" rel="noreferrer" className="work-link">Visit Daya <FaExternalLinkAlt/></a>
            </div>
          </div>
        </div>
      </section>

      {/* --- Developers --- */}
      <section id="developers" className="section-padding bg-light">
        <div className="container">
          <div className="section-title">
            <h2>Meet Our <span className="color-text">Developers</span></h2>
          </div>
          <div className="dev-grid">
            <div className="dev-card">
              <div className="dev-img"><FaUserTie className="dev-avatar-icon" /></div>
              <h3>SuhaimSoft</h3>
              <span className="dev-role">Full Stack Developer</span>
              <div className="dev-socials">
                <a href="https://github.com/suhaimali" target="_blank" rel="noreferrer"><FaGithub /></a>
                <a href="mailto:suhaimsoftware763@gmail.com"><FaEnvelope /></a>
              </div>
            </div>
            <div className="dev-card">
              <div className="dev-img"><FaUserTie className="dev-avatar-icon" /></div>
              <h3>Muhammed Fouzan</h3>
              <span className="dev-role">MERN Stack Developer & Full Stack Developer</span>
              <div className="dev-socials">
                <a href="https://github.com/fouzan" target="_blank" rel="noreferrer"><FaGithub /></a>
                <a href="mailto:fouzan@example.com"><FaEnvelope /></a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Contact Us --- */}
      <section id="contact" className="section-padding contact-section-modern">
        <div className="container">
          <div className="section-title">
            <h2>Contact <span className="color-text">Us</span></h2>
            <p>We are just a message away.</p>
          </div>

          <div className="contact-modern-wrapper">
            <div className="contact-form-area">
              <h3>Send a Message</h3>
              <form onSubmit={handleFormSubmit}>
                <div className="form-floating">
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder=" " />
                  <label>Full Name</label>
                </div>
                <div className="form-floating">
                  <select name="serviceType" value={formData.serviceType} onChange={handleChange} className="form-select-modern">
                    {serviceOptions.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
                  </select>
                  <label>Interested In</label>
                </div>
                <div className="form-row-phone">
                  <div className="custom-dropdown-container" ref={dropdownRef}>
                    <div className="selected-code" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                      <span>{formData.selectedFlag} {formData.countryCode}</span>
                      <FaChevronDown className="dropdown-arrow" />
                    </div>
                    {isDropdownOpen && (
                      <div className="dropdown-menu">
                        <div className="dropdown-search">
                          <FaSearch className="search-icon" />
                          <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} autoFocus />
                        </div>
                        <div className="dropdown-list">
                          {filteredCountries.map((country, index) => (
                            <div key={index} className="dropdown-item" onClick={() => handleCountrySelect(country)}>
                              <span className="c-flag">{country.flag}</span>
                              <span className="c-name">{country.name}</span>
                              <span className="c-code">{country.code}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="form-floating phone-field">
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder=" " />
                    <label>Phone Number</label>
                  </div>
                </div>
                <div className="form-floating">
                  <textarea name="message" rows="4" value={formData.message} onChange={handleChange} placeholder=" "></textarea>
                  <label>Additional notes (Optional)</label>
                </div>
                <button type="submit" className="modern-btn">Send Message <FaWhatsapp /></button>
              </form>
            </div>

            <div className="contact-info-area">
              <div className="info-card-modern old-style">
                <h3>Contact Info</h3>
                <div className="info-line">
                  <div className="icon-circle red-icon"><FaMapMarkerAlt /></div>
                  <div><span>Address</span><p>Pathappiriyam, Edavanna<br/>Malappuram, Kerala</p></div>
                </div>
                <div className="info-line">
                  <div className="icon-circle blue-icon"><FaPhoneAlt /></div>
                  <div><span>Phone</span><p>+91 8891 479 505</p></div>
                </div>
                <div className="info-line">
                  <div className="icon-circle orange-icon"><FaEnvelope /></div>
                  <div><span>Email</span><p>info@suhaimsoft.com</p></div>
                </div>
                <div className="mini-map-modern">
                   <iframe title="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15655.473813192837!2d76.11993314017059!3d11.197367423011764!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba6378075efe3ff%3A0x78aac4f7e8f67602!2sPathapiriyam%2C%20Kerala!5e0!3m2!1sen!2sin!4v1767756252800!5m2!1sen!2sin" width="100%" height="150" style={{border:0}} allowFullScreen loading="lazy"></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Colorful 3D Status Bar --- */}
      <div className="status-bar-3d">
        <div className="marquee-content">
          Welcome to SuhaimSoft — Providing Quality Software & Web Solutions — Contact: +91 8891 479 505
        </div>
      </div>

      <footer className="main-footer">
        <div className="container footer-grid">
          <div className="footer-col">
            <h3>SuhaimSoft</h3>
            <p>Since 2025, providing trusted software solutions. Innovation and quality are our top priorities.</p>
          </div>
          <div className="footer-col">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#work">Our Work</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h3>Connect</h3>
            <div className="social-links-footer">
              <a href="tel:+918891479505" className="f-icon"><FaPhoneAlt /></a>
              <a href="https://wa.me/918891479505" className="f-icon"><FaWhatsapp /></a>
              <a href="https://instagram.com/suhaimsoft?igsh=MWpzazg4emk2N2R3bQ==" className="f-icon"><FaInstagram /></a>
              <a href="https://github.com/suhaimali" className="f-icon"><FaGithub /></a>
              <a href="mailto:info@suhaimsoft.com" className="f-icon"><FaEnvelope /></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom"><p>&copy; 2026 SuhaimSoft. All rights reserved.</p></div>
      </footer>
    </div>
  );
}

export default App;