import React from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa'; 
// Importing icons from react-icons
import './contactPage.scss'; 

const ContactPage = () => {
    return (
        <main className="contact-main">
            <header className="contact-header">
                <h1>Get In Touch</h1>
                <p>We're here to help. Contact us with any questions or inquiries.</p>
            </header>

            <section className="contact-section">
                <div className="contact-container">
                    <div className="contact-layout">
                        {/* Left Side: Contact Form */}
                        <div className="contact-form-wrapper">
                            <h2>Send us a Message</h2>
                            <form>
                                <div className="contact-form-group">
                                    <label htmlFor="name" className="contact-form-label">Full Name</label>
                                    <input type="text" id="name" name="name" className="contact-form-input" required />
                                </div>
                                <div className="contact-form-group">
                                    <label htmlFor="email" className="contact-form-label">Email Address</label>
                                    <input type="email" id="email" name="email" className="contact-form-input" required />
                                </div>
                                <div className="contact-form-group">
                                    <label htmlFor="subject" className="contact-form-label">Subject</label>
                                    <input type="text" id="subject" name="subject" className="contact-form-input" required />
                                </div>
                                <div className="contact-form-group">
                                    <label htmlFor="message" className="contact-form-label">Message</label>
                                    <textarea id="message" name="message" className="contact-form-textarea" required></textarea>
                                </div>
                                <button type="submit" className="contact-submit-btn">
                                    Submit Inquiry
                                </button>
                            </form>
                        </div>

                        {/* Right Side: Contact Info & Map */}
                        <div className="contact-info-wrapper">
                            <h2>Contact Information</h2>
                            <div className="contact-info-item">
                                <FaMapMarkerAlt className="contact-info-icon" />
                                <div>
                                    <h3>Our Office</h3>
                                    <p>123 Adum Street, Kumasi, Ashanti Region, Ghana</p>
                                </div>
                            </div>
                            <div className="contact-info-item">
                                <FaPhoneAlt className="contact-info-icon" />
                                <div>
                                    <h3>Phone</h3>
                                    <a href="tel:+233244123456">+233 24 412 3456</a>
                                </div>
                            </div>
                            <div className="contact-info-item">
                                <FaEnvelope className="contact-info-icon" />
                                <div>
                                    <h3>Email</h3>
                                    <a href="mailto:support@landlinkghana.com">support@landlinkghana.com</a>
                                </div>
                            </div>
                            <div className="contact-map-container">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63399.26412809618!2d-1.656958841137683!3d6.699321175239965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdb93e4a761e485%3A0x9812583a54168e88!2sKumasi!5e0!3m2!1sen!2sgh!4v1662588888888!5m2!1sen!2sgh"
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default ContactPage;

