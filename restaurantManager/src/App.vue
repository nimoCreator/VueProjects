<template>
  <div class="app">
    <header class="app-header">
      <div class="brand">
        <img class="brand-icon" src="/favicon.svg" alt="Restaurant Manager logo" />
        <div>
          <div class="brand-title">Restaurant Manager</div>
        </div>
      </div>
      <nav class="nav">
        <RouterLink to="/" class="nav-link">
          <span class="material-symbols-rounded">home</span>
          Start
        </RouterLink>
        <RouterLink to="/menu" class="nav-link">
          <span class="material-symbols-rounded">restaurant_menu</span>
          Menu
        </RouterLink>
        <RouterLink to="/order" class="nav-link">
          <span class="material-symbols-rounded">add_shopping_cart</span>
          Zamówienia
        </RouterLink>
        <RouterLink to="/kitchen" class="nav-link">
          <span class="material-symbols-rounded">skillet</span>
          Kuchnia
        </RouterLink>
        <RouterLink to="/delivery" class="nav-link">
          <span class="material-symbols-rounded">room_service</span>
          Wydawanie
        </RouterLink>
      </nav>
    </header>

    <main class="app-main">
      <RouterView />
    </main>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 20px 24px;
  background: var(--panel);
  border-bottom: 1px solid var(--border);
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.brand-icon {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  box-shadow: 0 6px 14px rgba(25, 16, 4, 0.18), 0 2px 6px rgba(25, 16, 4, 0.12);
}

.brand-title {
  font-weight: 700;
  font-size: 20px;
}

.nav {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.nav-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  border-radius: 999px;
  border: 1px solid transparent;
  font-size: 14px;
}

.nav-link.router-link-active {
  background: #fff5ef;
  border-color: #f2c9b2;
  color: #9b3e12;
}

.app-main {
  padding: 24px;
  display: grid;
  gap: 24px;
}

.material-symbols-rounded {
  font-size: 20px;
  line-height: 1;
}

@media (max-width: 720px) {
  .app-header {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
