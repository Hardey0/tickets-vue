<template>
  <div class="ticket-management-page">
    <header class="ticket-header animated-fadeIn">
      <div class="container">
        <div class="header-content">
          <h1 class="ticket-title animated-slideDown">Ticket Management</h1>
          <div class="header-actions">
            <router-link to="/dashboard" class="back-btn animated-bounce">Back to Dashboard</router-link>
            <button class="new-ticket-btn animated-bounce" @click="setActiveTab('create')">+ New Ticket</button>
            <button class="logout-btn animated-pulse" @click="handleLogout">Logout</button>
          </div>
        </div>
      </div>
    </header>

    <div class="ticket-main">
      <nav class="ticket-sidebar animated-slideUp delay-1">
        <h3 class="sidebar-title">Menu</h3>
        <ul class="sidebar-nav">
          <li :class="{ active: activeTab === 'list' }">
            <button @click="setActiveTab('list')">Ticket List</button>
          </li>
          <li :class="{ active: activeTab === 'create' }">
            <button @click="setActiveTab('create')">Create Ticket</button>
          </li>
          <li :class="{ active: activeTab === 'summary' }">
            <button @click="setActiveTab('summary')">Summary</button>
          </li>
        </ul>
        <div class="filter-section">
          <label for="filter">Filter By:</label>
          <select v-model="filter" id="filter" @change="applyFilter">
            <option value="all">All</option>
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="closed">Closed</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>
        </div>
      </nav>

      <main class="ticket-content">
        <section class="welcome-section animated-slideUp delay-2">
          <h2 class="section-title">Welcome to Ticket Management</h2>
          <p class="welcome-text">Manage your tickets efficiently with real-time updates. Use the menu to navigate and filter your tasks.</p>
        </section>

        <div v-if="activeTab === 'list'" class="ticket-table-section animated-slideUp delay-3">
          <h2 class="section-title">Ticket List</h2>
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
                  <th>Actions</th>
                </tr>
              </thead>
            </table>
            <div class="tickets-body">
              <div v-for="ticket in filteredTickets" :key="ticket.id" class="ticket-row animated-slideLeft">
                <span class="ticket-cell">{{ ticket.id }}</span>
                <span class="ticket-cell title-cell">{{ ticket.title }}</span>
                <span :class="`ticket-cell status-cell ${ticket.status}`" :title="ticket.status">{{ ticket.status }}</span>
                <span :class="`ticket-cell priority-cell ${ticket.priority}`" :title="ticket.priority">{{ ticket.priority }}</span>
                <span class="ticket-cell">{{ ticket.assignedTo || 'Unassigned' }}</span>
                <span class="ticket-cell">{{ ticket.date }}</span>
                <span class="ticket-cell actions-cell">
                  <button class="edit-btn animated-bounce" @click="startEdit(ticket)">Edit</button>
                  <button class="delete-btn animated-bounce" @click="deleteTicket(ticket.id)">Delete</button>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div v-if="activeTab === 'create'" class="ticket-form-section animated-slideUp delay-3">
          <h2 class="section-title">Create New Ticket</h2>
          <form @submit.prevent="createTicket" class="ticket-form">
            <div class="form-group">
              <label for="title">Title</label>
              <input
                v-model="newTicket.title"
                type="text"
                id="title"
                name="title"
                placeholder="Enter ticket title"
                required
              />
            </div>
            <div class="form-group">
              <label htmlFor="status">Status</label>
              <select v-model="newTicket.status" id="status" name="status">
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="closed">Closed</option>
              </select>
            </div>
            <div class="form-group">
              <label htmlFor="priority">Priority</label>
              <select v-model="newTicket.priority" id="priority" name="priority">
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            <div class="form-group">
              <label htmlFor="assignedTo">Assigned To</label>
              <input
                v-model="newTicket.assignedTo"
                type="text"
                id="assignedTo"
                name="assignedTo"
                placeholder="Enter assignee"
              />
            </div>
            <div class="form-group">
              <label htmlFor="date">Date</label>
              <input
                v-model="newTicket.date"
                type="date"
                id="date"
                name="date"
              />
            </div>
            <button type="submit" class="submit-btn animated-bounce">Create Ticket</button>
          </form>
        </div>

        <div v-if="activeTab === 'edit' && editTicket" class="ticket-form-section animated-slideUp delay-3">
          <h2 class="section-title">Edit Ticket</h2>
          <form @submit.prevent="updateTicket" class="ticket-form">
            <div class="form-group">
              <label htmlFor="title">Title</label>
              <input
                v-model="editTicket.title"
                type="text"
                id="title"
                name="title"
                placeholder="Enter ticket title"
                required
              />
            </div>
            <div class="form-group">
              <label htmlFor="status">Status</label>
              <select v-model="editTicket.status" id="status" name="status">
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="closed">Closed</option>
              </select>
            </div>
            <div class="form-group">
              <label htmlFor="priority">Priority</label>
              <select v-model="editTicket.priority" id="priority" name="priority">
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            <div class="form-group">
              <label htmlFor="assignedTo">Assigned To</label>
              <input
                v-model="editTicket.assignedTo"
                type="text"
                id="assignedTo"
                name="assignedTo"
                placeholder="Enter assignee"
              />
            </div>
            <div class="form-group">
              <label htmlFor="date">Date</label>
              <input
                v-model="editTicket.date"
                type="date"
                id="date"
                name="date"
              />
            </div>
            <button type="submit" class="submit-btn animated-bounce">Update Ticket</button>
            <button type="button" class="cancel-btn animated-bounce" @click="cancelEdit">Cancel</button>
          </form>
        </div>

        <div v-if="activeTab === 'summary'" class="ticket-summary-section animated-slideUp delay-3">
          <h2 class="section-title">Ticket Summary</h2>
          <div class="summary-cards">
            <div class="summary-card">
              <h4>Total Tickets</h4>
              <p>{{ ticketStats.total }}</p>
            </div>
            <div class="summary-card">
              <h4>Open</h4>
              <p>{{ ticketStats.open }}</p>
            </div>
            <div class="summary-card">
              <h4>In Progress</h4>
              <p>{{ ticketStats.inProgress }}</p>
            </div>
            <div class="summary-card">
              <h4>Closed</h4>
              <p>{{ ticketStats.closed }}</p>
            </div>
          </div>
        </div>
      </main>
    </div>

    <Footer />

    <img src="@/assets/decorative-shape.svg" alt="" aria-hidden="true" class="decorative-circle animated-float" />
    <img src="@/assets/decorative-shape.svg" alt="" aria-hidden="true" class="decorative-circle secondary-circle animated-float" />
    <svg class="wave-background" viewBox="0 0 1440 320" preserveAspectRatio="none">
      <path fill="#0099ff" fill-opacity="0.8" d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,133.3C672,117,768,139,864,149.3C960,160,1056,160,1152,144C1248,128,1344,96,1392,80L1440,64L1440,320L1392,320C1344,320,1243,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
    </svg>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import Footer from '../components/Footer.vue';

export default defineComponent({
  name: 'TicketManagement',
  components: { Footer },
  setup() {
    const router = useRouter();
    const toast = useToast();
    const tickets = ref([]);
    const newTicket = ref({
      title: '',
      status: 'open',
      priority: 'medium',
      assignedTo: '',
      date: new Date().toISOString().split('T')[0],
    });
    const editTicket = ref(null);
    const activeTab = ref('list');
    const filter = ref('all');

    onMounted(() => {
      const session = localStorage.getItem('ticketapp_session');
      if (!session) {
        toast.error('Please log in to access Ticket Management', { position: 'top-center' });
        router.push('/auth/login');
        return;
      }
      const storedTickets = JSON.parse(localStorage.getItem('ticketapp_tickets') || '[]');
      tickets.value = storedTickets;
    });

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      if (editTicket.value) {
        editTicket.value = { ...editTicket.value, [name]: value };
      } else {
        newTicket.value = { ...newTicket.value, [name]: value };
      }
    };

    const createTicket = () => {
      if (!newTicket.value.title.trim()) {
        toast.error('Title is required!', { position: 'top-center' });
        return;
      }
      const newTicketData = {
        id: Date.now(),
        ...newTicket.value,
      };
      const updatedTickets = [...tickets.value, newTicketData];
      localStorage.setItem('ticketapp_tickets', JSON.stringify(updatedTickets));
      tickets.value = updatedTickets;
      newTicket.value = {
        title: '',
        status: 'open',
        priority: 'medium',
        assignedTo: '',
        date: new Date().toISOString().split('T')[0],
      };
      setActiveTab('list');
      toast.success('Ticket created successfully!', { position: 'top-center' });
    };

    const updateTicket = () => {
      if (!editTicket.value.title.trim()) {
        toast.error('Title is required!', { position: 'top-center' });
        return;
      }
      const updatedTickets = tickets.value.map(ticket =>
        ticket.id === editTicket.value.id ? editTicket.value : ticket
      );
      localStorage.setItem('ticketapp_tickets', JSON.stringify(updatedTickets));
      tickets.value = updatedTickets;
      cancelEdit();
      toast.success('Ticket updated successfully!', { position: 'top-center' });
    };

    const deleteTicket = (id) => {
      const updatedTickets = tickets.value.filter(ticket => ticket.id !== id);
      localStorage.setItem('ticketapp_tickets', JSON.stringify(updatedTickets));
      tickets.value = updatedTickets;
      toast.success('Ticket deleted successfully!', { position: 'top-center' });
    };

    const startEdit = (ticket) => {
      editTicket.value = { ...ticket };
      setActiveTab('edit');
    };

    const cancelEdit = () => {
      editTicket.value = null;
      setActiveTab('list');
    };

    const handleLogout = () => {
      localStorage.removeItem('ticketapp_session');
      toast.success('Logged out successfully!', { position: 'top-center' });
      router.push('/');
    };

    const setActiveTab = (tab) => {
      activeTab.value = tab;
    };

    const applyFilter = () => {
      // Filter is applied reactively via v-model, no additional logic needed here
    };

    const filteredTickets = computed(() =>
      filter.value === 'all'
        ? tickets.value
        : tickets.value.filter(ticket => ticket.status === filter.value || ticket.priority === filter.value)
    );

    const ticketStats = computed(() => ({
      total: tickets.value.length,
      open: tickets.value.filter(t => t.status === 'open').length,
      inProgress: tickets.value.filter(t => t.status === 'in_progress').length,
      closed: tickets.value.filter(t => t.status === 'closed').length,
    }));

    return {
      tickets,
      newTicket,
      editTicket,
      activeTab,
      filter,
      filteredTickets,
      ticketStats,
      handleInputChange,
      createTicket,
      updateTicket,
      deleteTicket,
      startEdit,
      cancelEdit,
      handleLogout,
      setActiveTab,
      applyFilter,
    };
  },
});
</script>

<style scoped>
.ticket-management-page {
  position: relative;
  min-height: 100vh;
  background: linear-gradient(135deg, #007bff 0%, #4b6cb7 100%);
  overflow: hidden;
  font-family: 'Arial', sans-serif;
  color: #fff;
}

.ticket-header {
  padding: 20px 0;
  background: rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 10;
}

.container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 20px;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.ticket-title {
  font-size: 2.5rem;
  font-weight: 900;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
  margin: 0;
}

.header-actions {
  display: flex;
  gap: 15px;
}

.back-btn,
.new-ticket-btn {
  padding: 10px 20px;
  background: linear-gradient(135deg, #4a90e2, #63b8ff);
  color: #fff;
  text-decoration: none;
  border-radius: 25px;
  font-weight: bold;
  transition: all 0.3s ease;
}

.back-btn:hover,
.new-ticket-btn:hover {
  transform: translateY(-2px);
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

.ticket-main {
  display: flex;
  padding: 20px 0;
}

.ticket-sidebar {
  width: 250px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 20px;
  border-radius: 15px;
  margin-right: 20px;
  height: calc(100vh - 100px);
  position: sticky;
  top: 80px;
}

.sidebar-title {
  font-size: 1.5rem;
  margin-bottom: 20px;
  text-align: center;
}

.sidebar-nav {
  list-style: none;
  padding: 0;
}

.sidebar-nav li {
  margin-bottom: 10px;
}

.sidebar-nav li button {
  color: #fff;
  text-decoration: none;
  padding: 10px;
  display: block;
  border: none;
  background: none;
  width: 100%;
  text-align: left;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.sidebar-nav li button:hover,
.sidebar-nav li.active button {
  background: rgba(255, 255, 255, 0.2);
  transform: translateX(5px);
}

.filter-section {
  margin-top: 20px;
}

.filter-section label {
  display: block;
  margin-bottom: 5px;
}

.filter-section select {
  width: 100%;
  padding: 10px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.05) !important;
  color: #dbd5d5;
}

.ticket-content {
  flex-grow: 1;
}

.welcome-section {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 30px;
  border-radius: 15px;
  margin-bottom: 20px;
  text-align: center;
}

.welcome-text {
  font-size: 1.1rem;
  color: #d0d0d0; /* Adjusted for better contrast */
}

.section-title {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 30px;
  font-weight: 700;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
}

.ticket-table-section,
.ticket-form-section,
.ticket-summary-section {
  margin-bottom: 40px;
}

.tickets-table {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
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
  max-height: 400px;
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

.actions-cell {
  display: flex;
  gap: 5px;
}

.edit-btn,
.delete-btn,
.submit-btn,
.cancel-btn {
  padding: 8px 15px;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-right: 5px;
}

.edit-btn {
  background: linear-gradient(135deg, #ffc107, #ffed4e);
  color: #fff;
}

.edit-btn:hover {
  background: linear-gradient(135deg, #e0a800, #d4b106);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(255, 193, 7, 0.4);
}

.delete-btn {
  background: linear-gradient(135deg, #dc3545, #ff6b6b);
  color: #fff;
}

.delete-btn:hover {
  background: linear-gradient(135deg, #c82333, #e74c3c);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(220, 53, 69, 0.4);
}

.submit-btn {
  background: linear-gradient(135deg, #28a745, #20c997);
  color: #fff;
}

.submit-btn:hover {
  background: linear-gradient(135deg, #218838, #1e7e34);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(40, 167, 69, 0.4);
}

.cancel-btn {
  background: #6c757d;
  color: #fff;
}

.cancel-btn:hover {
  background: #5a6268;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(108, 117, 125, 0.4);
}

.ticket-form {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.form-group {
  margin-bottom: 20px;
  text-align: left;
}

.form-group label {
  display: block;
  color: #fff;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 10px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.05) !important;
  color: #dddbdb;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #4a90e2;
  box-shadow: 0 0 5px rgba(74, 144, 226, 0.5);
}

.ticket-summary-section .summary-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.summary-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 20px;
  border-radius: 15px;
  text-align: center;
  transition: all 0.3s ease;
}

.summary-card:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
}

.summary-card h4 {
  margin: 0 0 10px;
  font-size: 1.2rem;
}

.summary-card p {
  margin: 0;
  font-size: 1.5rem;
  font-weight: bold;
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

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
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

.delay-1 {
  animation-delay: 0.2s;
}

.delay-2 {
  animation-delay: 0.4s;
}

.delay-3 {
  animation-delay: 0.6s;
}

/* Responsive */
@media (max-width: 1024px) {
  .ticket-main {
    flex-direction: column;
  }
  .ticket-sidebar {
    width: 100%;
    height: auto;
    margin-bottom: 20px;
    position: static;
  }
  .ticket-content {
    width: 100%;
  }
  .tickets-table-header th,
  .ticket-cell {
    padding: 10px;
  }
}

@media (max-width: 480px) {
  .ticket-title {
    font-size: 2rem;
  }
  .section-title {
    font-size: 1.8rem;
  }
  .tickets-body {
    max-height: 300px;
  }
  .ticket-form {
    padding: 20px;
  }
  .header-actions {
    flex-direction: column;
    gap: 10px;
  }
  .back-btn,
  .new-ticket-btn,
  .logout-btn {
    width: 100%;
  }
}
</style>