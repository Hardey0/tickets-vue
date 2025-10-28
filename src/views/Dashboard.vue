<template>
  <div class="dashboard-page">
    <header class="dashboard-header animated-fadeIn">
      <div class="container">
        <div class="header-content">
          <h1 class="dashboard-title animated-slideDown">Dashboard Overview</h1>
          <div class="header-actions">
            <router-link to="/tickets" class="quick-action-btn animated-bounce">+ New Ticket</router-link>
            <button class="logout-btn animated-pulse" @click="handleLogout">Logout</button>
          </div>
        </div>
      </div>
    </header>

    <main class="dashboard-main">
      <section class="stats-section animated-slideUp delay-1">
        <div class="container">
          <h2 class="section-title animated-fadeIn">Ticket Statistics</h2>
          <div class="stats-grid">
            <div class="stat-item" @mouseenter="handleStatHover('Total')" @click="showStatToast('Total', ticketStats.total)">
              <div class="stat-icon">📊</div>
              <h3>Total Tickets</h3>
              <p class="stat-number animated-zoomIn">{{ ticketStats.total }}</p>
              <div class="stat-bar animated-fill">
                <div class="bar-fill" :style="{ width: '100%' }"></div>
              </div>
            </div>
            <div class="stat-item" @mouseenter="handleStatHover('Open')" @click="showStatToast('Open', ticketStats.open)">
              <div class="stat-icon">🔴</div>
              <h3>Open Tickets</h3>
              <p class="stat-number animated-zoomIn open-color">{{ ticketStats.open }}</p>
              <div class="stat-bar animated-fill">
                <div class="bar-fill open" :style="{ width: `${(ticketStats.open / ticketStats.total || 0) * 100}%` }"></div>
              </div>
            </div>
            <div class="stat-item" @mouseenter="handleStatHover('In Progress')" @click="showStatToast('In Progress', ticketStats.inProgress)">
              <div class="stat-icon">🟡</div>
              <h3>In Progress</h3>
              <p class="stat-number animated-zoomIn in-progress-color">{{ ticketStats.inProgress }}</p>
              <div class="stat-bar animated-fill">
                <div class="bar-fill in-progress" :style="{ width: `${(ticketStats.inProgress / ticketStats.total || 0) * 100}%` }"></div>
              </div>
            </div>
            <div class="stat-item" @mouseenter="handleStatHover('Closed')" @click="showStatToast('Closed', ticketStats.closed)">
              <div class="stat-icon">🟢</div>
              <h3>Closed Tickets</h3>
              <p class="stat-number animated-zoomIn closed-color">{{ ticketStats.closed }}</p>
              <div class="stat-bar animated-fill">
                <div class="bar-fill closed" :style="{ width: `${(ticketStats.closed / ticketStats.total || 0) * 100}%` }"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="recent-tickets-section animated-slideUp delay-2">
        <div class="container">
          <h2 class="section-title animated-fadeIn">Recent Tickets</h2>
          <div class="tickets-table">
            <table class="tickets-table-header">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Priority</th>
                  <th>Assigned To</th>
                  <th>Date</th>
                </tr>
              </thead>
            </table>
            <div class="tickets-body">
              <div v-for="ticket in recentTickets" :key="ticket.id" class="ticket-row animated-slideLeft">
                <span class="ticket-cell">{{ ticket.id }}</span>
                <span class="ticket-cell title-cell">{{ ticket.title }}</span>
                <span :class="`ticket-cell status-cell ${ticket.status}`" :title="ticket.status">{{ ticket.status }}</span>
                <span :class="`ticket-cell priority-cell ${ticket.priority}`" :title="ticket.priority">{{ ticket.priority }}</span>
                <span class="ticket-cell">{{ ticket.assignedTo }}</span>
                <span class="ticket-cell">{{ ticket.date }}</span>
              </div>
            </div>
          </div>
          <div class="section-actions">
            <router-link to="/tickets" class="view-all-btn animated-bounce">View All Tickets</router-link>
          </div>
        </div>
      </section>

      <section class="quick-actions-section animated-slideUp delay-3">
        <div class="container">
          <h2 class="section-title animated-fadeIn">Quick Actions</h2>
          <div class="actions-grid">
            <router-link to="/tickets" class="action-card animated-rotateIn">
              <div class="action-icon">➕</div>
              <h3>Create New Ticket</h3>
              <p>Start a new ticket quickly</p>
            </router-link>
            <button class="action-card animated-rotateIn" @click="showToast('Search feature coming soon!')">
              <div class="action-icon">🔍</div>
              <h3>Search Tickets</h3>
              <p>Find and filter tickets</p>
            </button>
            <button class="action-card animated-rotateIn" @click="showToast('Assign feature coming soon!')">
              <div class="action-icon">👥</div>
              <h3>Assign Ticket</h3>
              <p>Delegate tasks to team</p>
            </button>
            <button class="action-card animated-rotateIn" @click="showToast('Report generation coming soon!')">
              <div class="action-icon">📊</div>
              <h3>Generate Report</h3>
              <p>Export analytics</p>
            </button>
          </div>
        </div>
      </section>

      <section class="user-profile-section animated-slideUp delay-4">
        <div class="container">
          <h2 class="section-title animated-fadeIn">User Profile</h2>
          <div class="profile-card animated-bounceIn">
            <div class="profile-avatar animated-spin">👤</div>
            <h3 class="profile-name">Welcome, {{ profileData.name || 'User' }}!</h3>
            <p class="profile-email">{{ profileData.email || 'user@example.com' }}</p>
            <div class="profile-stats">
              <span class="profile-stat">Tickets Assigned: 5</span>
              <span class="profile-stat">Tickets Resolved: 12</span>
            </div>
            <button class="profile-btn animated-pulse" @click="setShowProfileModal(true)">Edit Profile</button>
          </div>
        </div>
      </section>
    </main>

    <Footer />

    <div v-if="showLogoutModal" class="modal-overlay animated-fadeIn">
      <div class="modal-content animated-bounceIn">
        <h3>Confirm Logout</h3>
        <p>Are you sure you want to log out?</p>
        <div class="modal-actions">
          <button class="modal-btn confirm" @click="confirmLogout">Yes</button>
          <button class="modal-btn cancel" @click="cancelLogout">No</button>
        </div>
      </div>
    </div>

    <div v-if="showProfileModal" class="modal-overlay animated-fadeIn">
      <div class="modal-content animated-bounceIn">
        <h3>Edit Profile</h3>
        <div class="form-group">
          <label for="name">Name</label>
          <input v-model="profileData.name" type="text" id="name" name="name" placeholder="Enter your name" />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input v-model="profileData.email" type="email" id="email" name="email" placeholder="Enter your email" />
        </div>
        <div class="modal-actions">
          <button class="modal-btn confirm" @click="saveProfile">Save</button>
          <button class="modal-btn cancel" @click="setShowProfileModal(false)">Cancel</button>
        </div>
      </div>
    </div>

    <img src="@/assets/decorative-shape.svg" alt="Decorative circle" class="decorative-circle animated-float" />
    <img src="@/assets/decorative-shape.svg" alt="Secondary decorative circle" class="decorative-circle secondary-circle animated-float" />
    <svg class="wave-background" viewBox="0 0 1440 320" preserveAspectRatio="none">
      <path fill="#0099ff" fill-opacity="0.8" d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,133.3C672,117,768,139,864,149.3C960,160,1056,160,1152,144C1248,128,1344,96,1392,80L1440,64L1440,320L1392,320C1344,320,1243,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
    </svg>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import Footer from '../components/Footer.vue';

export default defineComponent({
  name: 'Dashboard',
  components: { Footer },
  setup() {
    const router = useRouter();
    const toast = useToast();
    const showLogoutModal = ref(false);
    const showProfileModal = ref(false);
    const profileData = ref({ name: '', email: '' });
    const recentTickets = ref([]);
    const ticketStats = ref({ total: 0, open: 0, inProgress: 0, closed: 0 });

    onMounted(() => {
      const session = localStorage.getItem('ticketapp_session');
      if (!session) {
        toast.error('Please log in to access the Dashboard', { position: 'top-center' });
        router.push('/auth');
        return;
      }

      updateData();
      window.addEventListener('storage', updateData);
    });

    onUnmounted(() => {
      window.removeEventListener('storage', updateData);
    });

    const updateData = () => {
      const storedTickets = JSON.parse(localStorage.getItem('ticketapp_tickets') || '[]');
      recentTickets.value = storedTickets.slice(-5);
      const stats = storedTickets.reduce((acc, ticket) => {
        acc.total++;
        if (ticket.status === 'open') acc.open++;
        if (ticket.status === 'in_progress') acc.inProgress++;
        if (ticket.status === 'closed') acc.closed++;
        return acc;
      }, { total: 0, open: 0, inProgress: 0, closed: 0 });
      ticketStats.value = stats;
    };

    const handleLogout = () => {
      showLogoutModal.value = true;
    };

    const confirmLogout = () => {
      localStorage.removeItem('ticketapp_session');
      toast.success('Logged out successfully!', { position: 'top-center' });
      router.push('/');
    };

    const cancelLogout = () => {
      showLogoutModal.value = false;
    };

    const handleProfileChange = (e) => {
      profileData.value[e.target.name] = e.target.value;
    };

    const saveProfile = () => {
      localStorage.setItem('ticketapp_profile', JSON.stringify(profileData.value));
      toast.success('Profile updated successfully!', { position: 'top-center' });
      showProfileModal.value = false;
    };

    const handleStatHover = (stat) => {
      // toast.info(`Hovering on ${stat} - Click for details`, { position: 'top-center' });
    };

    const showStatToast = (stat, count) => {
      toast.info(`${stat} tickets: ${count}`, { position: 'top-center' });
    };

    const showToast = (message) => {
      toast.info(message, { position: 'top-center' });
    };

    return {
      showLogoutModal,
      showProfileModal,
      profileData,
      recentTickets,
      ticketStats,
      handleLogout,
      confirmLogout,
      cancelLogout,
      handleProfileChange,
      saveProfile,
      handleStatHover,
      showStatToast,
      showToast,
    };
  },
});
</script>

<style scoped>
.dashboard-page {
  position: relative;
  min-height: 100vh;
  background: linear-gradient(135deg, #007bff 0%, #4b6cb7 100%);
  overflow: hidden;
  font-family: 'Arial', sans-serif;
}

.dashboard-header {
  position: relative;
  padding: 20px 0;
  background: rgba(0, 0, 0, 0.1);
  z-index: 3;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dashboard-title {
  font-size: 2.5rem;
  color: #fff;
  font-weight: 900;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
  margin: 0;
}

.header-actions {
  display: flex;
  gap: 15px;
}

.quick-action-btn {
  padding: 10px 20px;
  background: linear-gradient(135deg, #4a90e2, #63b8ff);
  color: #fff;
  border: none;
  border-radius: 25px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

.quick-action-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 5px 15px rgba(74, 144, 226, 0.4);
}

.logout-btn {
  padding: 10px 20px;
  background: linear-gradient(135deg, #e63946, #ff6b6b);
  color: #fff;
  border: none;
  border-radius: 25px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

.logout-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 5px 15px rgba(230, 57, 70, 0.4);
}

.dashboard-main {
  padding: 60px 0;
  position: relative;
}

.section-title {
  text-align: center;
  font-size: 2rem !important;
  color: #fff;
  margin-bottom: 40px;
  font-weight: 700;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
}

.stats-section,
.recent-tickets-section,
.quick-actions-section,
.user-profile-section {
  margin-bottom: 60px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
}

.stat-item {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 30px;
  border-radius: 20px;
  text-align: center;
  transition: all 0.4s ease;
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.stat-item:hover {
  transform: scale(1.05);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
  border-color: rgba(255, 255, 255, 0.4);
}

.stat-icon {
  font-size: 3rem;
  margin-bottom: 15px;
}

.stat-item h3 {
  color: #fff;
  font-size: 1.4rem;
  margin-bottom: 10px;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: bold;
  color: #fff;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
}

.stat-bar {
  height: 8px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  margin-top: 10px;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  background: linear-gradient(135deg, #4a90e2, #63b8ff);
  transition: width 0.5s ease;
}

.bar-fill.open {
  background: linear-gradient(135deg, #28a745, #20c997);
}

.bar-fill.in_progress {
  background: linear-gradient(135deg, #ffc107, #ffed4e);
}

.bar-fill.closed {
  background: linear-gradient(135deg, #6c757d, #adb5bd);
}

.tickets-table {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
}

.tickets-table-header {
  background: rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.tickets-table-header th {
  padding: 15px;
  color: #fff;
  text-align: left;
  font-weight: bold;
}

.tickets-body {
  max-height: 300px;
  overflow-y: auto;
}

.ticket-row {
  display: flex;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.ticket-row:hover {
  background: rgba(255, 255, 255, 0.05);
}

.ticket-cell {
  padding: 15px;
  color: #fff;
  flex: 1;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
}

.ticket-cell:last-child {
  border-right: none;
}

.status-cell {
  font-weight: bold;
  text-align: center;
}

.status-cell.open {
  color: #28a745;
}

.status-cell.in_progress {
  color: #ffc107;
}

.status-cell.closed {
  color: #6c757d;
}

.priority-cell.high {
  color: #dc3545;
}

.priority-cell.medium {
  color: #ffc107;
}

.priority-cell.low {
  color: #28a745;
}

.title-cell {
  font-weight: 600;
}

.section-actions {
  text-align: center;
}

.view-all-btn {
  padding: 12px 30px;
  background: linear-gradient(135deg, #4a90e2, #63b8ff);
  color: #fff;
  text-decoration: none;
  border-radius: 25px;
  font-weight: bold;
  transition: all 0.3s ease;
}

.view-all-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(74, 144, 226, 0.4);
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 30px;
}

.action-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 30px;
  border-radius: 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.4s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.action-card:hover {
  transform: scale(1.05);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
  border-color: rgba(255, 255, 255, 0.4);
}

.action-icon {
  font-size: 3rem;
  margin-bottom: 15px;
}

.action-card h3 {
  color: #fff;
  font-size: 1.3rem;
  margin-bottom: 10px;
}

.action-card p {
  color: #e0e0e0;
  font-size: 0.9rem;
}

.profile-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 30px;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.profile-avatar {
  font-size: 4rem;
  margin-bottom: 20px;
  animation: spin 2s linear infinite;
}

.profile-name {
  color: #fff;
  font-size: 1.8rem;
  margin-bottom: 10px;
}

.profile-email {
  color: #e0e0e0;
  margin-bottom: 20px;
}

.profile-stats {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.profile-stat {
  color: #fff;
  font-size: 0.9rem;
}

.profile-btn {
  padding: 10px 20px;
  background: linear-gradient(135deg, #4a90e2, #63b8ff);
  color: #fff;
  border: none;
  border-radius: 25px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

.profile-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(74, 144, 226, 0.4);
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
}

.modal-content {
  background: #fff;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
  text-align: center;
  width: 350px;
  animation: modalBounceIn 0.5s ease-out;
}

.modal-content h3 {
  color: #333;
  margin-bottom: 15px;
}

.form-group {
  margin-bottom: 20px;
  text-align: left;
}

.form-group label {
  display: block;
  color: #333;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
}

.modal-actions {
  display: flex;
  justify-content: center;
  gap: 15px;
}

.modal-btn {
  padding: 12px 25px;
  border: none;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

.modal-btn.confirm {
  background: #28a745;
  color: #fff;
}

.modal-btn.confirm:hover {
  background: #218838;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(40, 167, 69, 0.4);
}

.modal-btn.cancel {
  background: #6c757d;
  color: #fff;
}

.modal-btn.cancel:hover {
  background: #5a6268;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(108, 117, 125, 0.4);
}

.decorative-circle {
  position: absolute;
  border-radius: 50%;
  opacity: 0.2;
  pointer-events: none;
  z-index: 1;
}

.decorative-circle.animated-float {
  animation: float 6s ease-in-out infinite;
}

.secondary-circle {
  top: 70%;
  right: 10%;
  width: 200px;
  height: 200px;
  opacity: 0.15;
}

.wave-background {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 300px;
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
@media (max-width: 1024px) {
  .container {
    flex-direction: column;
  }
  .dashboard-sidebar {
    width: 100%;
    margin-bottom: 30px;
  }
  .dashboard-main {
    width: 100%;
  }
  .stats-grid {
    grid-template-columns: 1fr;
  }
  .decorative-circle {
    width: 150px;
    height: 150px;
  }
  .secondary-circle {
    width: 140px;
    height: 140px;
  }
}

@media (max-width: 480px) {
  .dashboard-title {
    font-size: 2rem;
  }
  .stat-item {
    padding: 20px;
  }
  .progress-circle {
    width: 80px;
    height: 80px;
  }
  .stat-number {
    font-size: 2rem;
  }
  .decorative-circle {
    width: 100px;
    height: 100px;
  }
  .secondary-circle {
    width: 90px;
    height: 90px;
  }
  .wave-background {
    height: 200px;
  }
}
</style>