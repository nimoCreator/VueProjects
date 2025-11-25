<template>
  <section class="card stack" style="text-align:center">
    <h1>Sklep — Limitowana Edycja</h1>
    <p class="muted">Kup przez formularz Google. To zajmie chwile.</p>

    <div class="card" style="display:grid;gap:16px;justify-items:center; overflow: hidden;">
      <figure class="artWrap">
        <div class="blobField" aria-hidden="true">
          <span class="blob b1"></span>
          <span class="blob b2"></span>
          <span class="blob b3"></span>
        </div>
        <img class="productArt" src="../assets/img/cd.png" alt="Limitowana plyta CD — Dfoxy DJ set" />
      </figure>
      <h2>Limitowana plyta CD — DJ set</h2>
      <small>Dostępne jest tylko 5 sztuk!</small>
      <small v-if="!canBuy" class="muted">Sprzedaz startuje 13 listopada 2025</small>
      <div class="flexRow">
        <button class="btn" :disabled="!canBuy" :title="canBuy ? 'Kup teraz' : 'Dostepne 1 dzien przed wydarzeniem'"
          @click="openForm">Kup teraz</button>
        <a class="lower_btn" :class="{ disabledLink: !canBuy }" href="" target="_blank" rel="noopener"
          :aria-disabled="!canBuy" :tabindex="!canBuy ? -1 : 0"
          @click.prevent="!canBuy ? blockClick() : openInNewTab()">
          Otworz formularz w nowej karcie
        </a>
      </div>
    </div>
    <dialog ref="dlg" class="gform-dialog" @close="onClose">
      <div class="gform-shell">
        <header class="gform-bar">
          <strong>Formularz zakupu</strong>
          <button class="gform-close" @click="closeForm" aria-label="Zamknij">✕</button>
        </header>
        <iframe ref="iframe" title="Google Form — Dfoxy" loading="lazy" allow="clipboard-write *" :src="formUrl" />

        <footer class="gform-foot">
          <button class="btn" @click="copyLink">Kopiuj link</button>
          <a class="lower_btn" :href="formUrl" target="_blank" rel="noopener">Otworz w nowej
            karcie</a>
        </footer>
      </div>
    </dialog>
  </section>
</template>

<script lang="ts">

import { defineComponent } from 'vue'

const FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSd2aZDjnqP_hoSjUCs4RzNU4viMi8jGMPX9jBnJrRiiBTlE_Q/viewform?usp=dialog' 
export default defineComponent({
  name: 'ShopView',

  data() {
    return {
    }
  },

  computed: {
    canBuy(): boolean {
      const target = new Date('2025-11-13T15:00:00')
      return new Date() >= target
    },
    formUrl(): string {
      return this.getFormUrl()
    }
  },

  mounted() {
    const dlg = this.$refs.dlg as HTMLDialogElement | undefined
    try { if (dlg?.open) dlg.close() } catch {}
  },

  beforeUnmount() {
    const handler = (this as any)._cheatHandler as ((e: KeyboardEvent) => void) | undefined
    if (handler) window.removeEventListener('keydown', handler)
  },

  methods: {
    // prosty decoder; w razie bledu zwraca url jawny
    getFormUrl(): string {
      try { return FORM_URL } catch { return 'https://docs.google.com/forms/d/e/1FAIpQLSd2aZDjnqP_hoSjUCs4RzNU4viMi8jGMPX9jBnJrRiiBTlE_Q/viewform?usp=dialog' }
    },

    openInNewTab() {
      window.open(this.getFormUrl(), '_blank', 'noopener')
    },

    blockClick() {
      alert('Sprzedaz rozpocznie sie wkrótce.')
    },

    openForm() {
      if (!this.canBuy) return
      this.forceOpen()
    },

    forceOpen() {
      const dlg = this.$refs.dlg as HTMLDialogElement | undefined
      if (dlg?.showModal) {
        dlg.showModal()
      } else {
        this.openInNewTab()
      }
    },

    closeForm() {
      const dlg = this.$refs.dlg as HTMLDialogElement | undefined
      dlg?.close()
    },

    onClose() {},

    async copyLink() {
      const url = this.getFormUrl()
      try {
        await navigator.clipboard.writeText(url)
        alert('Skopiowano link do schowka')
      } catch {
        prompt('Skopiuj recznie:', url)
      }
    }
  }
})
</script>

<style scoped>
.flexRow {
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
}

.lower_btn {
  font-size: 0.8rem;
  color: #aaa;
  text-decoration: none;
}

.btn:disabled {
  opacity: .5;
  cursor: not-allowed;
  filter: grayscale(20%);
}

.disabledLink {
  pointer-events: none;
  opacity: .5;
}

.gform-dialog:not([open]) {
  display: none !important;
}

.gform-dialog {
  padding: 0;
  border: 1px solid var(--panelBorder);
  border-radius: 16px;
  width: min(960px, 96vw);
  max-height: 90vh;
  background: var(--panel);
  color: var(--textColorPrimary);
  box-shadow: var(--shadow);
  margin: auto;
  inset: 0;
}

.gform-dialog::backdrop {
  background: rgba(0, 0, 0, .6);
  animation: fadeIn 2s ease-out;
}

@media (max-width: 640px) {
  .gform-dialog {
    width: 96vw;
    max-height: 92vh;
  }
}

.gform-dialog[open] {
  animation: dlgPop 1s cubic-bezier(.2, .7, .2, 1);
  transform-origin: center;
}

.gform-shell {
  display: grid;
  grid-template-rows: auto 1fr auto;
  height: min(80vh, 900px);
}

.gform-bar,
.gform-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: .5rem;
  padding: .75rem 1rem;
  border-bottom: 1px solid var(--panelBorder);
}

.gform-foot {
  border-top: 1px solid var(--panelBorder);
  border-bottom: none;
}

.gform-close {
  background: transparent;
  border: 1px solid var(--panelBorder);
  color: var(--textColorPrimary);
  border-radius: 10px;
  padding: .4rem .7rem;
  cursor: pointer;
}

.gform-close:hover:not(:disabled) {
  border-color: var(--accent);
}

.gform-shell iframe {
  width: 100%;
  height: 100%;
  border: none;
  background: var(--backgroundPrimary);
}


@keyframes dlgPop {
  from {
    transform: translateY(50px) scale(.5);
    opacity: 0;
  }

  to {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: .6;
  }
}



/* --- Product artwork with blurred blobs background --- */
.artWrap {
  position: relative;
  display: inline-grid;
  place-items: center;
  padding: clamp(12px, 2.2vw, 18px);
  border-radius: 22px;
}

/* puchate, zblurowane bloby pod PNG (widoczne przez przezroczystosc) */
.blobField {
  position: absolute;
  inset: -10%;
  pointer-events: none;
  filter: blur(42px);
  opacity: .85;
  z-index: 0;
}

.blob {
  position: absolute;
  width: 48%;
  height: 48%;
  border-radius: 50%;
  mix-blend-mode: screen;
  opacity: .8;
  transform: translate(-50%, -50%) scale(1);
  animation: blobFloat 14s ease-in-out infinite;
}

.blob.b1 {
  left: 35%;
  top: 35%;
  background: radial-gradient(circle at 20% 50%, rgba(6, 120, 226, 0.45) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(17, 0, 255, 0.1) 0%, transparent 50%);
  animation-duration: 5.5s;
}

.blob.b2 {
  left: 75%;
  top: 35%;
  background: radial-gradient(circle at 20% 50%, rgba(208, 255, 0, 0.55) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(255, 238, 0, 0.1) 0%, transparent 50%);
  animation-duration: 5s;
  animation-delay: -3s;
}

.blob.b3 {
  left: 50%;
  top: 60%;
  width: 60%;
  height: 60%;
  background: radial-gradient(circle at 20% 50%, rgba(6, 90, 199, 0.35) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(0, 81, 255, 0.1) 0%, transparent 50%);
  animation-duration: 4s;
  animation-delay: -6s;
}

@keyframes blobFloat {

  0%,
  100% {
    transform: translate(-50%, -50%) scale(1);
  }

  50% {
    transform: translate(-50%, -52%) scale(1.08);
  }
}

.productArt {
  position: relative;
  z-index: 1;
  width: min(420px, 50vw);
  aspect-ratio: 1/1;
  object-fit: contain;
  border-radius: 16px;
  background: transparent;
  /* wazne przy PNG */
  transition: transform .3s cubic-bezier(.2, .7, .2, 1);
}

/* prefers-reduced-motion: mniej ruchu */
@media (prefers-reduced-motion: reduce) {
  .blobField {
    filter: blur(30px);
  }

  .blob {
    animation: none;
  }

  .artWrap:hover .productArt {
    transform: none;
  }
}
</style>
