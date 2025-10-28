<template>
  <footer class="footer">
    <div class="container">
      <p>&copy; 2025 TicketMaster. All rights reserved.</p>
    </div>
  </footer>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Footer',
});
</script>

<style scoped>
.footer {
  padding: 20px;
  text-align: center;
  background: rgba(0, 0, 0, 0.2);
  margin-top: 40px;
}

@media (max-width: 480px) {
  .footer { padding: 15px; }
}
</style>