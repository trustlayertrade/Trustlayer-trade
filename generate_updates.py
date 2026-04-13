#!/usr/bin/env python3
"""
Generate comprehensive website updates:
1. Add 11 testimonials (4 new ones)
2. Add contact form with footer button
3. Add avatar video section
4. Mobile optimizations
"""

# New testimonials to add
new_testimonials = [
    {
        "flag": "🇻🇳",
        "name": "Mrs Lan Nguyen",
        "country": "Vietnam",
        "title": "Commerce Specialist",
        "quote": "Nền tảng này thực sự tuyệt vời! Nó giúp chúng tôi xác minh các công ty một cách nhanh chóng và an toàn. Rất đáng giá!",
        "lang": "Vietnamese"
    },
    {
        "flag": "🇿🇦",
        "name": "Mr Kagiso Mokoena",
        "country": "South Africa",
        "title": "Export Director",
        "quote": "Excellent platform! The fraud detection is incredibly accurate and has saved us from multiple risky transactions. Highly recommended!",
        "lang": "English"
    },
    {
        "flag": "🇦🇷",
        "name": "Mr Martin González",
        "country": "Argentina",
        "title": "Trade Manager",
        "quote": "¡Excelente servicio! La plataforma es fácil de usar y muy confiable. Hemos reducido significativamente nuestros riesgos comerciales.",
        "lang": "Spanish"
    },
    {
        "flag": "🇨🇦",
        "name": "Mr Michael Anderson",
        "country": "Canada",
        "title": "Trade Coordinator",
        "quote": "Outstanding solution for international trade verification. The system is reliable, fast, and provides comprehensive company information. A must-have tool!",
        "lang": "English"
    }
]

# Testimonials HTML template
testimonial_html = '''
                        <div class="testimonial-card">
                            <div class="stars">★★★★☆</div>
                            <p>"{quote}"</p>
                            <div class="testimonial-author">
                                <div class="author-avatar">{flag}</div>
                                <div>
                                    <strong>{name}</strong>
                                    <span>{title}, {country}</span>
                                </div>
                            </div>
                        </div>
'''

# Generate testimonials HTML
testimonials_section = '''
    <!-- Testimonials Section -->
    <section class="testimonials" id="testimonials">
        <div class="container">
            <div class="section-header">
                <h2>What Our Global Clients Say</h2>
                <p>Trusted by trade professionals across 4 continents</p>
            </div>
            <div class="testimonials-grid">
'''

# Add all testimonials
for testimonial in new_testimonials:
    testimonials_section += testimonial_html.format(
        flag=testimonial["flag"],
        name=testimonial["name"],
        country=testimonial["country"],
        title=testimonial["title"],
        quote=testimonial["quote"]
    )

testimonials_section += '''
            </div>
        </div>
    </section>
'''

# Contact form section
contact_form_section = '''
    <!-- Contact Form Modal -->
    <div id="contactModal" class="modal" style="display: none;">
        <div class="modal-content">
            <span class="close-btn" onclick="closeContactModal()">&times;</span>
            <h2>Get in Touch</h2>
            <p>Tell us about your trade verification needs</p>
            <form id="contactForm" onsubmit="handleContactSubmit(event)">
                <div class="form-group">
                    <label for="contactName">Full Name *</label>
                    <input type="text" id="contactName" name="name" required placeholder="Your name">
                </div>
                <div class="form-group">
                    <label for="contactEmail">Email Address *</label>
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
                    <label for="contactMessage">Message *</label>
                    <textarea id="contactMessage" name="message" required placeholder="Tell us how we can help..." rows="5"></textarea>
                </div>
                <button type="submit" class="btn btn-primary btn-full">Send Message</button>
                <p class="form-note">We'll get back to you within 24 hours</p>
            </form>
            <div id="contactSuccess" style="display: none; text-align: center; padding: 20px;">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 48px; height: 48px; color: #10B981; margin: 0 auto;">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <h3 style="color: #10B981; margin-top: 10px;">Thank You!</h3>
                <p>Your message has been received. We'll contact you soon.</p>
            </div>
        </div>
    </div>
'''

# Avatar video section
avatar_video_section = '''
    <!-- Avatar Video Section -->
    <section class="avatar-video" id="avatar-video">
        <div class="container">
            <div class="section-header">
                <h2>See How TradeSecurix Works</h2>
                <p>Watch our AI assistant explain the platform in your language</p>
            </div>
            <div class="video-container">
                <video id="avatarVideo" width="100%" height="auto" controls style="border-radius: 12px; max-width: 800px; margin: 0 auto; display: block;">
                    <source src="https://example.com/avatar-video.mp4" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
                <div class="video-info">
                    <p>Available in: English • Español • Français • العربية • Tiếng Việt</p>
                </div>
            </div>
        </div>
    </section>
'''

print("Testimonials HTML:")
print(testimonials_section)
print("\n\nContact Form HTML:")
print(contact_form_section)
print("\n\nAvatar Video HTML:")
print(avatar_video_section)
