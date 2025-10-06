<template>
  <nav class="nav">
    <RouterLink to="/about" class="navlink">O wydarzeniu</RouterLink>
    <RouterLink to="/shop" class="navlink">Sklep</RouterLink>
  </nav>
</template>

<style scoped>
.nav {
  display: flex;
  justify-content: center;
  gap: 10px;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.nav::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, 
    transparent 0%, 
    rgba(0, 170, 255, 0.3) 50%, 
    transparent 100%);
  opacity: 0.5;
}

.navlink {
  position: relative;
  text-decoration: none;
  color: var(--fg);
  padding: 0.75rem 2rem;
  border-radius: 999px;
  font-size: 2rem;
  font-weight: 600;
  letter-spacing: 0.3px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid transparent;
  z-index: 1;
}

.navlink::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 999px;
  background: linear-gradient(135deg, 
    rgba(0, 170, 255, 0.1), 
    rgba(80, 197, 255, 0.05));
  opacity: 0;
  transition: opacity 0.3s ease;
}

.navlink:hover {
  color: var(--accentLight);
  transform: translateY(-2px);
  border-color: rgba(0, 170, 255, 0.2);
}

.navlink:hover::before {
  opacity: 1;
}

.navlink:active {
  transform: translateY(0);
}

.router-link-active,
.router-link-exact-active {
  color: var(--white);
  background: linear-gradient(135deg, 
    rgba(0, 170, 255, 0.25), 
    rgba(0, 170, 255, 0.15));
  border-color: rgba(0, 170, 255, 0.4);
  box-shadow: 0 0 20px rgba(0, 170, 255, 0.2),
              0 0 0 1px rgba(0, 170, 255, 0.1) inset;
}

.router-link-active::before,
.router-link-exact-active::before {
  opacity: 0;
}

/* Subtle glow effect on active */
.router-link-active::after,
.router-link-exact-active::after {
  content: '';
  position: absolute;
  inset: -2px;
  border-radius: 999px;
  background: radial-gradient(circle at center, 
    rgba(0, 170, 255, 0.3) 0%, 
    transparent 70%);
  opacity: 0.4;
  z-index: -1;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.4;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.05);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .nav {
    gap: 6px;
    padding: 6px;
  }
  
  .navlink {
    padding: 10px 20px;
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .nav {
    width: 100%;
  }
  
  .navlink {
    flex: 1;
    text-align: center;
  }
}
</style>