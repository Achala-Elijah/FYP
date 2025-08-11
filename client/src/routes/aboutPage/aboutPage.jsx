import React from 'react';
import './aboutPage.scss';

const AboutPageMain = () => {
    return (
        <main className="about-main">
            <header className="about-header">
                <h1>About LandLink Ghana</h1>
                <p>Building trust and transparency in Ghana's real estate market.</p>
            </header>

            <section className="about-section about-bg-white">
                <div className="about-container">
                    <div className="about-grid">
                        <div className="about-story-content">
                            <h2>Our Story</h2>
                            <p>LandLink Ghana was founded in 2025 by a team of passionate Ghanaians who experienced firsthand the challenges of acquiring land. Faced with issues of transparency, lengthy verification processes, and a lack of a centralized, trustworthy platform, we knew there had to be a better way.</p>
                            <p>We envisioned a platform that would not only connect buyers and sellers but also serve as a beacon of trust. By integrating technology with rigorous verification standards, we aim to empower every Ghanaian to invest in land with complete confidence.</p>
                        </div>
                        <div>
                            <img src="https://placehold.co/600x400/6ee7b7/064e3b?text=Our+Vision" alt="Team discussing plans" className="about-story-image" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="about-section">
                <div className="about-container">
                    <div className="about-grid">
                         <div className="about-card about-mission">
                            <i className="fas fa-bullseye"></i>
                            <h3>Our Mission</h3>
                            <p>To simplify the process of buying and selling land in Ghana by providing a secure, transparent, and user-friendly online platform.</p>
                        </div>
                        <div className="about-card about-vision">
                            <i className="fas fa-eye"></i>
                            <h3>Our Vision</h3>
                            <p>To be the most trusted digital real estate marketplace in Ghana, making property ownership accessible and secure for all.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="about-section about-bg-white">
                <div className="about-container">
                    <h2 className="about-section-title">Our Core Values</h2>
                    <div className="about-values-grid">
                        <div className="about-value-item">
                            <div className="about-value-icon about-green"><i className="fas fa-shield-alt"></i></div>
                            <h3>Integrity</h3>
                            <p>We operate with unwavering honesty and ethical standards in all our dealings.</p>
                        </div>
                         <div className="about-value-item">
                            <div className="about-value-icon about-blue"><i className="fas fa-search"></i></div>
                            <h3>Transparency</h3>
                            <p>We provide clear, comprehensive information to empower informed decisions.</p>
                        </div>
                         <div className="about-value-item">
                            <div className="about-value-icon about-green"><i className="fas fa-users"></i></div>
                            <h3>Customer-Centric</h3>
                            <p>Our clients' needs and security are at the heart of everything we do.</p>
                        </div>
                         <div className="about-value-item">
                            <div className="about-value-icon about-blue"><i className="fas fa-lightbulb"></i></div>
                            <h3>Innovation</h3>
                            <p>We leverage technology to continuously improve the user experience.</p>
                        </div>
                    </div>
                </div>
            </section>
            
            <section className="about-section">
                <div className="about-container">
                    <h2 className="about-section-title">Meet The Leadership</h2>
                    <div className="about-team-grid">
                        <div className="about-team-member">
                            <img src="https://placehold.co/150x150/38bdf8/075985?text=AE" alt="Ekow Mensah" />
                            <h3 className="about-member-name">Achala Elijah</h3>
                            <p className="about-member-title">Founder & CEO</p>
                            <p className="about-member-desc">A visionary leader dedicated to reforming Ghana's real estate landscape.</p>
                        </div>
                        <div className="about-team-member">
                            <img src="https://placehold.co/150x150/34d399/047857?text=AA" alt="Adwoa Adjei" />
                            <h3 className="about-member-name">Anthony Adjei</h3>
                            <p className="about-member-title">Head of Operations</p>
                            <p className="about-member-desc">Ensures every listing is verified and our operational processes run smoothly.</p>
                        </div>
                        <div className="about-team-member">
                            <img src="https://placehold.co/150x150/a5b4fc/312e81?text=EA" alt="Kwame Asante" />
                            <h3 className="about-member-name">Emmanuel Appiah</h3>
                            <p className="about-member-title">Chief Technology Officer</p>
                            <p className="about-member-desc">The architect of our secure platform, focused on innovation and user data protection.</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default AboutPageMain;
