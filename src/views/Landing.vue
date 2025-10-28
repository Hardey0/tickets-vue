<template>
  <div class="landing">
    <!-- Hero Section -->
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title">Ticket Management</h1>
          <h2 class="hero-subtitle">
            Empower your team with a seamless, secure, and feature-packed ticket management platform.
            Track, manage, and resolve tickets efficiently in one centralized system designed for success.
          </h2>
          <div class="cta-buttons">
            <router-link to="/auth/login" class="btn primary" aria-label="Login to your account">Login</router-link>
            <router-link to="/auth/signup" class="btn secondary" aria-label="Start using the app now">Get Started</router-link>
          </div>
        </div>
        <img src="@/assets/decorative-shape.svg" alt="Decorative circle in hero" class="decorative-circle hero-circle" />
      </div>
      <div class="wave-container">
        <svg class="hero-wave" viewBox="0 0 100 15" preserveAspectRatio="none">
          <path d="M0,10 C32,15 64,5 96,10 C128,15 100,5 100,10 L100,15 L0,15 Z" fill="#f9fbfd" />
        </svg>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features">
      <div class="container">
        <h2 class="section-title">Key Features</h2>
        <div class="feature-grid">
          <div class="feature-card">
            <h3>📊 Live Ticket Tracking</h3>
            <p>
              Stay updated with <span class="status-open">open</span>,{' '}
              <span class="status-in_progress">in-progress</span>, and{' '}
              <span class="status-closed">closed</span> tickets in real time with detailed logs.
            </p>
          </div>
          <div class="feature-card">
            <h3>🔒 Robust Security</h3>
            <p>
              Ensure data safety with encrypted authentication and secure access control. Your tickets
              are protected with industry-standard security protocols.
            </p>
          </div>
          <div class="feature-card">
            <h3>📱 Multi-Device Sync</h3>
            <p>
              Access and manage tickets from any device with full synchronization. Work seamlessly
              across desktop, tablet, and mobile with real-time updates.
            </p>
          </div>
          <div class="feature-card">
            <h3>⚙️ Custom Workflows</h3>
            <p>
              Tailor ticket workflows to fit your team's specific needs. Set priorities, assign tickets,
              and automate processes for efficiency.
            </p>
          </div>
          <div class="feature-card">
            <h3>📈 Analytics Dashboard</h3>
            <p>
              Gain insights with detailed ticket performance reports. Track resolution times, team
              performance, and ticket trends with visual charts.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section class="about">
      <div class="container">
        <h2 class="section-title">Why Choose Us?</h2>
        <div class="about-content">
          <p>
            Launched in 2023, our Ticket Management App is dedicated to simplifying ticket handling for
            businesses worldwide. With a focus on user experience, security, and scalability, we've
            supported over 10,000 teams in optimizing their workflows. Our platform combines powerful
            features with an intuitive interface, making ticket management effortless for teams of all
            sizes. Join us in transforming how you manage tickets with cutting-edge technology!
          </p>
          <img src="@/assets/decorative-shape.svg" alt="Decorative circle in about section" class="decorative-circle about-circle" />
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section class="team">
      <div class="container">
        <h2 class="section-title">Meet Our Team</h2>
        <div class="team-grid">
          <div class="team-card">
            <h3>Jane Doe</h3>
            <p>CEO & Founder - Leading with vision and innovation.</p>
          </div>
          <div class="team-card">
            <h3>John Smith</h3>
            <p>Lead Developer - Crafting robust solutions daily.</p>
          </div>
          <div class="team-card">
            <h3>Sarah Lee</h3>
            <p>Customer Success - Ensuring your success is our priority.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="testimonials">
      <div class="container">
        <h2 class="section-title">What Our Users Say</h2>
        <div class="testimonial-grid">
          <div class="testimonial-card">
            <p>
              "A game-changer for our support team—tickets are resolved faster than ever! The intuitive
              interface and real-time updates have dramatically improved our workflow."
            </p>
            <h4>Emily Johnson, Team Lead</h4>
          </div>
          <div class="testimonial-card">
            <p>
              "Love the mobile access; it keeps me productive on the move. I can manage tickets from
              anywhere, and the responsive design is flawless across all devices."
            </p>
            <h4>Michael Lee, Developer</h4>
          </div>
          <div class="testimonial-card">
            <p>
              "The analytics dashboard has transformed how we measure success. Detailed reports help us
              improve daily operations with ease."
            </p>
            <h4>Robert Brown, Operations Manager</h4>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container">
        <h2 class="section-title">Start Managing Tickets Today!</h2>
        <p>
          Empower your team with the best tools—sign up now and experience seamless ticket management
          with advanced features and support.
        </p>
        <router-link to="/auth/signup" class="btn primary" aria-label="Sign up for the app">Sign Up Now</router-link>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import Footer from '../components/Footer.vue';

export default defineComponent({
  name: 'Landing',
  components: { Footer },
});
</script>

<style scoped>
.landing {
  position: relative;
  min-height: 100vh;
  width: 100%;
  background: #e9ecef;
}

.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: linear-gradient(135deg, #007bff, #6c757d);
  color: #ffffff;
  padding: 80px 20px 200px;
  overflow: hidden;
  width: 100%;
}

.hero .container {
  z-index: 2;
  position: relative;
}

.hero-content {
  display: block;
}

.wave-container {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 200px;
  overflow: hidden;
  z-index: 1;
}

.hero-wave {
  width: 100%;
  height: 100%;
  display: block;
  animation: waveMove 8s infinite ease-in-out, waveParallax 15s infinite linear;
}

.hero-title {
  font-size: 4.5rem;
  margin-bottom: 1.5rem;
  font-weight: 800;
  animation: fadeInDown 1s ease-out;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.hero-subtitle {
  font-size: 1.5rem;
  max-width: 800px;
  margin: 0 auto 2.5rem;
  animation: fadeInUp 1s ease-out 0.3s forwards;
  opacity: 0;
  line-height: 1.6;
}

.cta-buttons {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
  animation: fadeIn 1s ease-out 0.6s forwards;
  opacity: 0;
}

.cta-buttons .btn {
  display: inline-block;
  padding: 16px 40px;
  border-radius: 10px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.primary {
  background: #ffffff;
  color: #007bff;
}

.primary:hover,
.primary:focus {
  background: #f8f9fa;
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
  outline: 2px solid #ffffff;
}

.secondary {
  background: transparent;
  border: 2px solid #ffffff;
  color: #ffffff;
}

.secondary:hover,
.secondary:focus {
  background: #ffffff;
  color: #007bff;
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
}

.decorative-circle {
  position: absolute;
  border-radius: 50%;
  opacity: 0.15;
  pointer-events: none;
}

.hero-circle {
  width: 300px;
  height: 300px;
  top: 10%;
  right: 10%;
  background: url('@/assets/decorative-shape.svg') no-repeat center;
  background-size: cover;
  animation: floatCircle 6s ease-in-out infinite;
  filter: blur(20px);
}

.about-circle {
  width: 200px;
  height: 200px;
  bottom: 15%;
  left: 5%;
  background: url('@/assets/decorative-shape.svg') no-repeat center;
  background-size: cover;
  animation: floatCircle 8s ease-in-out infinite reverse;
  filter: blur(15px);
}

.features {
  padding: 100px 20px;
  background: #ffffff;
  width: 100%;
}

.section-title {
  text-align: center;
  font-size: 3rem !important;
  font-weight: 700;
  margin-bottom: 4rem;
  color: #212529 !important;
  animation: fadeIn 1s ease-out;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.feature-card {
  background: #f8f9fa;
  padding: 35px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  text-align: center;
  transition: all 0.3s ease;
  border: 1px solid #e9ecef;
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  border-color: #007bff;
}

.feature-card h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #212529;
}

.feature-card p {
  font-size: 1rem;
  line-height: 1.7;
  color: #6c757d;
}

.about {
  padding: 100px 20px;
  background: #f8f9fa;
  position: relative;
  width: 100%;
}

.about-content {
  text-align: center;
  max-width: 900px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

.about-content p {
  font-size: 1.25rem;
  line-height: 1.8;
  color: #495057;
}

.team {
  padding: 100px 20px;
  background: #ffffff;
  width: 100%;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
}

.team-card {
  background: #f8f9fa;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  text-align: center;
  transition: all 0.3s ease;
}

.team-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.team-card h3 {
  font-size: 1.5rem;
  color: #007bff;
  margin-bottom: 0.5rem;
}

.team-card p {
  font-size: 1rem;
  color: #6c757d;
}

.testimonials {
  padding: 100px 20px;
  background: #e9ecef;
  width: 100%;
}

.testimonial-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
}

.testimonial-card {
  background: #ffffff;
  padding: 35px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  text-align: center;
  border-left: 4px solid #007bff;
  transition: all 0.3s ease;
}

.testimonial-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.testimonial-card p {
  font-size: 1.1rem;
  font-style: italic;
  color: #495057;
  margin-bottom: 1.5rem;
  line-height: 1.7;
}

.testimonial-card h4 {
  font-size: 1rem;
  color: #007bff;
  font-weight: 600;
}

.cta-section {
  padding: 100px 20px;
  background: linear-gradient(135deg, #007bff, #0056b3);
  color: #ffffff;
  text-align: center;
  width: 100%;
}

.cta-section .section-title {
  color: #ffffff;
  margin-bottom: 1rem;
}

.cta-section p {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.95;
}

.cta-section .btn {
  background: #ffffff;
  color: #007bff;
  margin-top: 1.5rem;
  padding: 15px 0 !important;
  border-radius: 10px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

.cta-section .btn:hover,
.cta-section .btn:focus {
  background: #f8f9fa;
  transform: translateY(-3px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
}

@media (max-width: 1024px) {
  .hero-title { font-size: 3.5rem; }
  .hero-subtitle { font-size: 1.3rem; }
  .feature-grid,
  .testimonial-grid,
  .team-grid { grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }
  .hero-circle { width: 250px; height: 250px; }
}

@media (max-width: 768px) {
  .hero { min-height: 90vh; padding: 60px 20px 140px; }
  .hero-title { font-size: 2.8rem; }
  .hero-subtitle { font-size: 1.1rem; }
  .cta-buttons { flex-direction: column; gap: 1rem; }
  .cta-buttons .btn { width: 100%; max-width: 300px; }
  .hero-circle { width: 200px; height: 200px; right: 5%; }
  .about-circle { width: 150px; height: 150px; }
  .feature-grid,
  .testimonial-grid,
  .team-grid { grid-template-columns: 1fr; }
  .section-title { font-size: 2.5rem; }
  .features,
  .about,
  .team,
  .testimonials,
  .cta-section { padding: 60px 20px; }
}

@media (max-width: 480px) {
  .hero { min-height: 85vh; padding: 40px 15px 120px; }
  .hero-title { font-size: 2.2rem; }
  .hero-subtitle { font-size: 1rem; }
  .section-title { font-size: 2rem; }
  .hero-circle { width: 150px; height: 150px; }
  .about-circle { width: 100px; height: 100px; }
}
</style>