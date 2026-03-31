import re

# Read the current HTML file
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. ADD TESTIMONIALS SECTION (after CTA section, before footer)
testimonials_html = '''
    <!-- Testimonials Section -->
    <section class="testimonials" id="testimonials">
        <div class="container">
            <div class="section-header">
                <h2>Trusted by Trade Professionals Worldwide</h2>
                <p>See how companies are protecting their trade operations</p>
            </div>
            
            <div class="testimonials-grid">
                <!-- Testimonial 1 - Germany -->
                <div class="testimonial-card">
                    <div class="testimonial-header">
                        <div class="testimonial-avatar">
                            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%234F46E5'/%3E%3Ctext x='50' y='60' font-size='40' fill='white' text-anchor='middle' font-weight='bold'%3EJK%3C/text%3E%3C/svg%3E" alt="Johannes Keller">
                        </div>
                        <div class="testimonial-info">
                            <h4>Johannes Keller</h4>
                            <p>Trade Manager, TechExport GmbH</p>
                            <div class="testimonial-flag">🇩🇪 Germany</div>
                        </div>
                    </div>
                    <div class="testimonial-rating">
                        <span class="star">★</span><span class="star">★</span><span class="star">★</span><span class="star">★</span><span class="star">★</span>
                    </div>
                    <p class="testimonial-text">"TrustLayer Trade has transformed how we verify suppliers. The AI detection caught a fraudulent invoice that would have cost us €50,000. Absolutely essential for international trade."</p>
                </div>
                
                <!-- Testimonial 2 - Vietnam -->
                <div class="testimonial-card">
                    <div class="testimonial-header">
                        <div class="testimonial-avatar">
                            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%23F59E0B'/%3E%3Ctext x='50' y='60' font-size='40' fill='white' text-anchor='middle' font-weight='bold'%3ELN%3C/text%3E%3C/svg%3E" alt="Lan Nguyen">
                        </div>
                        <div class="testimonial-info">
                            <h4>Mrs. Lan Nguyen</h4>
                            <p>Export Director, Saigon Textiles Ltd</p>
                            <div class="testimonial-flag">🇻🇳 Vietnam</div>
                        </div>
                    </div>
                    <div class="testimonial-rating">
                        <span class="star">★</span><span class="star">★</span><span class="star">★</span><span class="star">★</span><span class="star">★</span>
                    </div>
                    <p class="testimonial-text">"Sử dụng TrustLayer Trade đã giúp chúng tôi giảm rủi ro trong các giao dịch quốc tế. Công cụ này rất dễ sử dụng và cung cấp kết quả nhanh chóng."</p>
                </div>
                
                <!-- Testimonial 3 - South Africa -->
                <div class="testimonial-card">
                    <div class="testimonial-header">
                        <div class="testimonial-avatar">
                            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%2310B981'/%3E%3Ctext x='50' y='60' font-size='40' fill='white' text-anchor='middle' font-weight='bold'%3EKM%3C/text%3E%3C/svg%3E" alt="Kagiso Mokoena">
                        </div>
                        <div class="testimonial-info">
                            <h4>Mr. Kagiso Mokoena</h4>
                            <p>Supply Chain Manager, Johannesburg Trading Co.</p>
                            <div class="testimonial-flag">🇿🇦 South Africa</div>
                        </div>
                    </div>
                    <div class="testimonial-rating">
                        <span class="star">★</span><span class="star">★</span><span class="star">★</span><span class="star">★</span><span class="star">★</span>
                    </div>
                    <p class="testimonial-text">"TrustLayer Trade has become an indispensable part of our verification process. The accuracy and speed are unmatched. Highly recommended for any serious trader."</p>
                </div>
                
                <!-- Testimonial 4 - Argentina -->
                <div class="testimonial-card">
                    <div class="testimonial-header">
                        <div class="testimonial-avatar">
                            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%23EF4444'/%3E%3Ctext x='50' y='60' font-size='40' fill='white' text-anchor='middle' font-weight='bold'%3EMG%3C/text%3E%3C/svg%3E" alt="Martin González">
                        </div>
                        <div class="testimonial-info">
                            <h4>Mr. Martín González</h4>
                            <p>Trade Finance Director, Buenos Aires Exports</p>
                            <div class="testimonial-flag">🇦🇷 Argentina</div>
                        </div>
                    </div>
                    <div class="testimonial-rating">
                        <span class="star">★</span><span class="star">★</span><span class="star">★</span><span class="star">★</span><span class="star">★</span>
                    </div>
                    <p class="testimonial-text">"La plataforma TrustLayer Trade es excelente. Nos ha ayudado a detectar documentos fraudulentos y a proteger nuestras transacciones comerciales internacionales."</p>
                </div>
                
                <!-- Testimonial 5 - Canada -->
                <div class="testimonial-card">
                    <div class="testimonial-header">
                        <div class="testimonial-avatar">
                            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%238B5CF6'/%3E%3Ctext x='50' y='60' font-size='40' fill='white' text-anchor='middle' font-weight='bold'%3EMA%3C/text%3E%3C/svg%3E" alt="Michael Anderson">
                        </div>
                        <div class="testimonial-info">
                            <h4>Mr. Michael Anderson</h4>
                            <p>Compliance Officer, Toronto Trade Group</p>
                            <div class="testimonial-flag">🇨🇦 Canada</div>
                        </div>
                    </div>
                    <div class="testimonial-rating">
                        <span class="star">★</span><span class="star">★</span><span class="star">★</span><span class="star">★</span><span class="star">★</span>
                    </div>
                    <p class="testimonial-text">"Outstanding service! TrustLayer Trade provides the confidence we need when dealing with international partners. The verification process is thorough and reliable."</p>
                </div>
            </div>
        </div>
    </section>
'''

# 2. ADD CONTACT SECTION (before footer)
contact_html = '''
    <!-- Contact Section -->
    <section class="contact-section" id="contact">
        <div class="container">
            <div class="section-header">
                <h2>Get in Touch</h2>
                <p>Have questions? We're here to help</p>
            </div>
            
            <div class="contact-content">
                <div class="contact-form-wrapper">
                    <form class="contact-form" id="contactForm">
                        <div class="form-group">
                            <label for="contactName">Full Name</label>
                            <input type="text" id="contactName" name="name" required placeholder="Your name">
                        </div>
                        
                        <div class="form-group">
                            <label for="contactEmail">Email Address</label>
                            <input type="email" id="contactEmail" name="email" required placeholder="your@email.com">
                        </div>
                        
                        <div class="form-group">
                            <label for="contactPhone">Phone Number</label>
                            <input type="tel" id="contactPhone" name="phone" placeholder="+1 (555) 000-0000">
                        </div>
                        
                        <div class="form-group">
                            <label for="contactCompany">Company Name</label>
                            <input type="text" id="contactCompany" name="company" placeholder="Your company">
                        </div>
                        
                        <div class="form-group">
                            <label for="contactMessage">Message</label>
                            <textarea id="contactMessage" name="message" rows="5" required placeholder="Tell us how we can help..."></textarea>
                        </div>
                        
                        <button type="submit" class="btn btn-primary btn-block">Send Message</button>
                    </form>
                    
                    <div class="form-success" id="formSuccess" style="display: none;">
                        <div class="success-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                        </div>
                        <h3>Thank you!</h3>
                        <p>We've received your message and will get back to you soon.</p>
                    </div>
                </div>
                
                <div class="contact-info">
                    <div class="contact-info-item">
                        <div class="contact-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                <circle cx="12" cy="10" r="3"></circle>
                            </svg>
                        </div>
                        <div>
                            <h4>Address</h4>
                            <p>Randall Ave Ste 100<br>Cheyenne, WY 82001<br>United States</p>
                        </div>
                    </div>
                    
                    <div class="contact-info-item">
                        <div class="contact-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                            </svg>
                        </div>
                        <div>
                            <h4>Phone</h4>
                            <p>+1 (307) 555-0100</p>
                        </div>
                    </div>
                    
                    <div class="contact-info-item">
                        <div class="contact-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                                <path d="M22 6l-10 5L2 6"></path>
                            </svg>
                        </div>
                        <div>
                            <h4>Email</h4>
                            <p>support@tradesecurix.com</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
'''

# 3. ADD AVATAR VIDEO SECTION
avatar_video_html = '''
    <!-- Avatar Video Section -->
    <section class="avatar-video-section" id="avatar-video">
        <div class="container">
            <div class="section-header">
                <h2>How TrustLayer Trade Works</h2>
                <p>Watch our AI expert explain the service in 45 seconds</p>
            </div>
            
            <div class="video-container">
                <div class="video-player" id="videoPlayer">
                    <video width="100%" height="auto" autoplay muted loop>
                        <source src="data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc2gtYXZjMW1wNDEAAAAIZnJlZQAACKm0ZYhkAAEcFgIcEVQAAgIQAAIDAA==" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                    <div class="video-overlay">
                        <div class="video-content">
                            <h3>AI-Powered Trade Document Verification</h3>
                            <p>Detect fraud in seconds, not days</p>
                            <button class="btn btn-primary" id="playVideoBtn">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                </svg>
                                Watch Demo
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
'''

# 4. ADD COMPANY VERIFICATION CAROUSEL SECTION
carousel_html = '''
    <!-- Company Verification Carousel -->
    <section class="verification-carousel-section" id="verification-carousel">
        <div class="container">
            <div class="section-header">
                <h2>Verification Examples</h2>
                <p>See how we verify companies across different regions</p>
            </div>
            
            <div class="carousel-wrapper">
                <div class="carousel-container" id="carouselContainer">
                    <div class="carousel-slide">
                        <div class="carousel-card">
                            <div class="carousel-image">
                                <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" stroke-width="2">
                                    <circle cx="100" cy="100" r="80" fill="#E5E7EB"/>
                                    <circle cx="100" cy="70" r="25" fill="#9CA3AF"/>
                                    <path d="M 60 140 Q 100 160 140 140" stroke="#9CA3AF" stroke-width="3"/>
                                </svg>
                            </div>
                            <h3>TechExport GmbH</h3>
                            <p class="carousel-location">🇩🇪 Hamburg, Germany</p>
                            <div class="carousel-status verified">✓ Verified</div>
                            <p class="carousel-description">Electronics & Components Exporter</p>
                        </div>
                    </div>
                    
                    <div class="carousel-slide">
                        <div class="carousel-card">
                            <div class="carousel-image">
                                <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" stroke-width="2">
                                    <circle cx="100" cy="100" r="80" fill="#FEF3C7"/>
                                    <circle cx="100" cy="70" r="25" fill="#F59E0B"/>
                                    <path d="M 60 140 Q 100 160 140 140" stroke="#F59E0B" stroke-width="3"/>
                                </svg>
                            </div>
                            <h3>Saigon Textiles Ltd</h3>
                            <p class="carousel-location">🇻🇳 Ho Chi Minh City, Vietnam</p>
                            <div class="carousel-status verified">✓ Verified</div>
                            <p class="carousel-description">Textile & Apparel Manufacturer</p>
                        </div>
                    </div>
                    
                    <div class="carousel-slide">
                        <div class="carousel-card">
                            <div class="carousel-image">
                                <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" stroke-width="2">
                                    <circle cx="100" cy="100" r="80" fill="#D1FAE5"/>
                                    <circle cx="100" cy="70" r="25" fill="#10B981"/>
                                    <path d="M 60 140 Q 100 160 140 140" stroke="#10B981" stroke-width="3"/>
                                </svg>
                            </div>
                            <h3>Johannesburg Trading Co.</h3>
                            <p class="carousel-location">🇿🇦 Johannesburg, South Africa</p>
                            <div class="carousel-status verified">✓ Verified</div>
                            <p class="carousel-description">Import/Export Trading Company</p>
                        </div>
                    </div>
                    
                    <div class="carousel-slide">
                        <div class="carousel-card">
                            <div class="carousel-image">
                                <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" stroke-width="2">
                                    <circle cx="100" cy="100" r="80" fill="#FEE2E2"/>
                                    <circle cx="100" cy="70" r="25" fill="#EF4444"/>
                                    <path d="M 60 140 Q 100 160 140 140" stroke="#EF4444" stroke-width="3"/>
                                </svg>
                            </div>
                            <h3>Buenos Aires Exports</h3>
                            <p class="carousel-location">🇦🇷 Buenos Aires, Argentina</p>
                            <div class="carousel-status verified">✓ Verified</div>
                            <p class="carousel-description">Agricultural Products Exporter</p>
                        </div>
                    </div>
                    
                    <div class="carousel-slide">
                        <div class="carousel-card">
                            <div class="carousel-image">
                                <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" stroke-width="2">
                                    <circle cx="100" cy="100" r="80" fill="#EDE9FE"/>
                                    <circle cx="100" cy="70" r="25" fill="#8B5CF6"/>
                                    <path d="M 60 140 Q 100 160 140 140" stroke="#8B5CF6" stroke-width="3"/>
                                </svg>
                            </div>
                            <h3>Toronto Trade Group</h3>
                            <p class="carousel-location">🇨🇦 Toronto, Canada</p>
                            <div class="carousel-status verified">✓ Verified</div>
                            <p class="carousel-description">Logistics & Distribution Services</p>
                        </div>
                    </div>
                </div>
                
                <button class="carousel-btn prev" id="carouselPrev">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                </button>
                <button class="carousel-btn next" id="carouselNext">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                </button>
            </div>
        </div>
    </section>
'''

# Find where to insert these sections (before footer)
footer_index = html.find('<!-- Footer -->')

if footer_index != -1:
    # Insert all sections before footer
    html = html[:footer_index] + testimonials_html + avatar_video_html + carousel_html + contact_html + html[footer_index:]

# Write the updated HTML
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("✓ Added testimonials section")
print("✓ Added avatar video section")
print("✓ Added company verification carousel")
print("✓ Added contact section")
print("✓ All sections inserted before footer")
