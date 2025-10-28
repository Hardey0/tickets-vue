<template>
  <div class="auth-page">
    <section class="auth-hero">
      <div class="container">
        <div class="auth-card animated-fadeIn">
          <h2 class="auth-title animated-slideDown">{{ isLogin ? 'Welcome Back' : 'Join Us Today' }}</h2>
          <div class="auth-toggle animated-slideUp delay-1">
            <button
              class="toggle-btn"
              :class="{ active: isLogin }"
              @click="setIsLogin(true)"
              aria-label="Switch to Login"
            >
              Login
            </button>
            <button
              class="toggle-btn"
              :class="{ active: !isLogin }"
              @click="setIsLogin(false)"
              aria-label="Switch to Signup"
            >
              Signup
            </button>
          </div>
          <form @submit.prevent="handleSubmit" class="animated-slideUp delay-2">
            <div class="form-group">
              <label for="email">Email</label>
              <div class="input-wrapper">
                <input
                  v-model="formData.email"
                  type="email"
                  id="email"
                  name="email"
                  :aria-invalid="!!errors.email"
                  :aria-describedby="errors.email ? 'email-error' : null"
                  placeholder="Enter your email"
                  @input="validateField('email')"
                />
                <span
                  class="clear-icon"
                  :class="{ 'clear-visible': formData.email }"
                  @click="clearField('email')"
                  aria-label="Clear email"
                >
                  ✕
                </span>
              </div>
              <span v-if="errors.email" id="email-error" class="error-inline">{{ errors.email }}</span>
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <div class="input-wrapper">
                <input
                  v-model="formData.password"
                  :type="formData.showPassword ? 'text' : 'password'"
                  id="password"
                  name="password"
                  :aria-invalid="!!errors.password"
                  :aria-describedby="errors.password ? 'password-error' : null"
                  placeholder="Enter your password"
                  @input="validateField('password')"
                />
                <span
                  class="toggle-icon"
                  @click="togglePasswordVisibility"
                  :aria-label="formData.showPassword ? 'Hide password' : 'Show password'"
                >
                  👁️
                </span>
              </div>
              <span v-if="errors.password" id="password-error" class="error-inline">{{ errors.password }}</span>
            </div>
            <div v-if="!isLogin" class="form-group">
              <label for="confirmPassword">Confirm Password</label>
              <div class="input-wrapper">
                <input
                  v-model="formData.confirmPassword"
                  :type="formData.showPassword ? 'text' : 'password'"
                  id="confirmPassword"
                  name="confirmPassword"
                  :aria-invalid="!!errors.confirmPassword"
                  :aria-describedby="errors.confirmPassword ? 'confirmPassword-error' : null"
                  placeholder="Confirm your password"
                  @input="validateField('confirmPassword')"
                />
                <span
                  class="toggle-icon"
                  @click="togglePasswordVisibility"
                  :aria-label="formData.showPassword ? 'Hide password' : 'Show password'"
                >
                  👁️
                </span>
              </div>
              <span v-if="errors.confirmPassword" id="confirmPassword-error" class="error-inline">{{ errors.confirmPassword }}</span>
            </div>
            <button type="submit" class="submit-btn animated-bounce">{{ isLogin ? 'Login' : 'Signup' }}</button>
          </form>
          <p class="auth-link animated-slideUp delay-3">
            {{ isLogin ? 'No account?' : 'Already have an account?' }}
            <button class="link-btn" @click="setIsLogin(!isLogin)" aria-label="Toggle auth mode">
              {{ isLogin ? 'Signup' : 'Login' }}
            </button>
          </p>
          <p class="return-link animated-slideUp delay-4">
            Back to <router-link to="/" aria-label="Return to landing page">Home</router-link>
          </p>
        </div>
        <img src="@/assets/decorative-shape.svg" alt="Decorative circle element" class="decorative-circle animated-rotate" />
        <img src="@/assets/decorative-shape.svg" alt="Secondary decorative circle" class="decorative-circle secondary-circle animated-rotate" />
      </div>
      <svg class="wave-background" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <path fill="#0099ff" fill-opacity="0.8" d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,133.3C672,117,768,139,864,149.3C960,160,1056,160,1152,144C1248,128,1344,96,1392,80L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
      </svg>
    </section>
    <Footer />
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import Footer from '../components/Footer.vue';

export default defineComponent({
  name: 'Auth',
  components: { Footer },
  setup() {
    const router = useRouter();
    const toast = useToast();
    const isLogin = ref(true);
    const formData = ref({ email: '', password: '', confirmPassword: '', showPassword: false });
    const errors = ref({});

    onMounted(() => {
      const session = localStorage.getItem('ticketapp_session');
      if (session) {
        router.push('/dashboard');
      }
    });

    const setIsLogin = (value) => {
      isLogin.value = value;
      errors.value = {};
      formData.value.confirmPassword = '';
    };

    const clearField = (field) => {
      formData.value[field] = '';
      errors.value[field] = '';
    };

    const togglePasswordVisibility = () => {
      formData.value.showPassword = !formData.value.showPassword;
    };

    const validateField = (field) => {
      errors.value[field] = '';
      if (field === 'email' && !formData.value.email) {
        errors.value.email = 'Email is required';
      } else if (field === 'email' && !/\S+@\S+\.\S+/.test(formData.value.email)) {
        errors.value.email = 'Invalid email format';
      }
      if (field === 'password' && !formData.value.password) {
        errors.value.password = 'Password is required';
      } else if (field === 'password' && formData.value.password.length < 6) {
        errors.value.password = 'Password must be at least 6 characters';
      }
      if (field === 'confirmPassword' && !isLogin.value && formData.value.confirmPassword !== formData.value.password) {
        errors.value.confirmPassword = 'Passwords do not match';
      }
    };

    const handleSubmit = () => {
      const validationErrors = {};
      if (!formData.value.email) validationErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.value.email)) validationErrors.email = 'Invalid email format';
      if (!formData.value.password) validationErrors.password = 'Password is required';
      else if (formData.value.password.length < 6) validationErrors.password = 'Password must be at least 6 characters';
      if (!isLogin.value && formData.value.password !== formData.value.confirmPassword) {
        validationErrors.confirmPassword = 'Passwords do not match';
      }
      errors.value = validationErrors;

      if (Object.keys(validationErrors).length > 0) {
        toast.error('Please fix the errors in the form', { position: 'top-center' });
        return;
      }

      let storedUsers = JSON.parse(localStorage.getItem('ticketapp_users') || '{}');

      if (isLogin.value) {
        const user = storedUsers[formData.value.email];
        if (!user || user.password !== formData.value.password) {
          errors.value.password = 'Invalid email or password';
          toast.error('Invalid credentials', { position: 'top-center' });
          return;
        }
        const sessionToken = { email: formData.value.email, token: `mock_login_${Date.now()}` };
        localStorage.setItem('ticketapp_session', JSON.stringify(sessionToken));
        toast.success('Login successful! Redirecting to Dashboard...', { position: 'top-center' });
        router.push('/dashboard');
      } else {
        if (storedUsers[formData.value.email]) {
          errors.value.email = 'Email already registered';
          toast.error('Email already in use', { position: 'top-center' });
          return;
        }
        storedUsers[formData.value.email] = { password: formData.value.password };
        localStorage.setItem('ticketapp_users', JSON.stringify(storedUsers));
        const sessionToken = { email: formData.value.email, token: `mock_signup_${Date.now()}` };
        localStorage.setItem('ticketapp_session', JSON.stringify(sessionToken));
        toast.success('Signup successful! Redirecting to Dashboard...', { position: 'top-center' });
        router.push('/dashboard');
      }
    };

    return { isLogin, formData, errors, setIsLogin, clearField, togglePasswordVisibility, validateField, handleSubmit };
  },
});
</script>

<style scoped>
.auth-page {
  position: relative;
  min-height: 100vh;
  background: linear-gradient(135deg, #f0f4f8 0%, #e0e7f0 100%);
  overflow: hidden;
  font-family: 'Arial', sans-serif;
}

.auth-hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #007bff 0%, #4b6cb7 100%);
  color: #fff;
  text-align: center;
  padding: 40px 0;
  overflow: hidden;
}

.container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 2;
}

.auth-card {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  padding: 50px 60px;
  border-radius: 25px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
  max-width: 600px;
  margin: 0 auto;
  transition: all 0.3s ease;
}

.auth-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
}

.auth-title {
  font-size: 2.8rem;
  margin-bottom: 25px;
  color: #007bff;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.auth-toggle {
  display: flex;
  justify-content: center;
  margin-bottom: 35px;
}

.toggle-btn {
  padding: 12px 25px;
  border: none;
  border-radius: 50px;
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 0 10px;
  backdrop-filter: blur(5px);
}

.toggle-btn.active {
  background: #fff;
  color: #007bff;
  transform: scale(1.1);
}

.toggle-btn:hover:not(.active),
.toggle-btn:focus:not(.active) {
  background: rgba(255, 255, 255, 0.4);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 25px;
  text-align: left;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #333;
  font-weight: 600;
  font-size: 1.1rem;
}

.input-wrapper {
  position: relative;
  width: 100%;
}

.input-wrapper input {
  width: 100%;
  padding: 14px 40px 14px 15px;
  border: 2px solid #e9ecef !important;
  border-radius: 12px;
  font-size: 1rem;
  background: #fff;
  transition: all 0.3s ease;
  box-sizing: border-box;
  color: #333 !important;
}

.input-wrapper input:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 4px rgba(0, 123, 255, 0.1);
  outline: none;
}

.input-wrapper .clear-icon,
.input-wrapper .toggle-icon {
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translateY(-50%);
  font-size: 1.2rem;
  color: #666;
  cursor: pointer;
  transition: color 0.3s ease;
}

.input-wrapper .clear-icon.clear-visible {
  display: block;
}

.input-wrapper .clear-icon {
  display: none; /* Default hidden */
}

.input-wrapper .toggle-icon:hover,
.input-wrapper .clear-icon:hover {
  color: #007bff;
}

.error-inline {
  color: #dc3545;
  font-size: 0.95rem;
  margin-top: 5px;
  display: block;
  animation: shake 0.5s ease-out;
}

.submit-btn {
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, #007bff, #0056b3);
  color: #fff;
  border: none !important;
  border-radius: 50px;
  font-weight: bold;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
}

.submit-btn:hover {
  background: linear-gradient(135deg, #0056b3, #003d80);
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 123, 255, 0.4);
}

.auth-link {
  margin-top: 20px;
  color: #666;
  font-size: 1rem;
}

.link-btn {
  background: none !important;
  border: none !important;
  color: #007bff;
  cursor: pointer;
  font-weight: bold;
  padding: 0;
  transition: color 0.3s ease;
}

.link-btn:hover {
  color: #0056b3;
}

.return-link {
  margin-top: 15px;
  color: #666;
  font-size: 1rem;
}

.return-link a {
  color: #007bff;
  text-decoration: underline;
  transition: color 0.3s ease;
}

.return-link a:hover {
  color: #0056b3;
}

.decorative-circle {
  position: absolute;
  border-radius: 50%;
  opacity: 0.15;
  pointer-events: none;
  z-index: 1;
}

.decorative-circle.animated-rotate {
  animation: rotate 12s linear infinite;
}

.secondary-circle {
  top: 60%;
  right: 5%;
  width: 180px;
  height: 180px;
  opacity: 0.1;
}

.wave-background {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 250px;
  z-index: 0;
  animation: wave 15s linear infinite;
}

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { transform: translateY(50px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes slideDown {
  from { transform: translateY(-50px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
  75% { transform: translateY(-2px); }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes wave {
  0% { transform: translateX(0); }
  100% { transform: translateX(-1440px); }
}

.animated-fadeIn {
  animation: fadeIn 1s ease-out;
}

.animated-slideUp {
  animation: slideUp 1s ease-out;
}

.animated-slideDown {
  animation: slideDown 1s ease-out;
}

.animated-bounce {
  animation: bounce 1.5s infinite;
}

.animated-rotate {
  animation: rotate 12s linear infinite;
}

.delay-1 {
  animation-delay: 0.2s;
}

.delay-2 {
  animation-delay: 0.4s;
}

.delay-3 {
  animation-delay: 0.6s;
}

.delay-4 {
  animation-delay: 0.8s;
}

/* Responsive */
@media (max-width: 768px) {
  .auth-card {
    padding: 40px;
    max-width: 500px;
  }
  .auth-title {
    font-size: 2.2rem;
  }
  .auth-toggle {
    flex-direction: column;
  }
  .toggle-btn {
    margin: 8px 0;
    width: 100%;
  }
  .input-wrapper input {
    padding-right: 35px;
  }
  .decorative-circle {
    width: 150px;
    height: 150px;
  }
  .secondary-circle {
    width: 140px;
    height: 140px;
  }
  .wave-background {
    height: 200px;
  }
}

@media (max-width: 480px) {
  .auth-title {
    font-size: 1.8rem;
  }
  .input-wrapper input {
    padding: 12px;
    padding-right: 30px;
  }
  .submit-btn {
    padding: 14px;
    font-size: 1.1rem;
  }
  .decorative-circle {
    width: 120px;
    height: 120px;
  }
  .secondary-circle {
    width: 110px;
    height: 110px;
  }
}
</style>