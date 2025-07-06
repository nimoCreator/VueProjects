<template>
    <button @click="openMenu" class="navigationButton" 
        :class="{open: isMenuOpen}">
        <!-- <roundArrowRightIcon /> -->
    </button>

    <div 
        class="colorScheme themeSencative" 
        :class="{open: isMenuOpen}"
        @click="toggleColorScheme"
        >
        <template v-if="colorScheme === 'dark'">
            ☾
        </template>
        <template v-else>
            ✵
        </template>
        <span>
            {{ 
                language === 'pl' ? 'Wybierz motyw' : 'Choose color scheme'
                }}
        </span>
    </div>

    <nav class="navigation themeSencative " :class="{open: isMenuOpen}">
        <router-link to="/">
            <div>✦</div>
            <span>Home</span>
        </router-link>
        <router-link to="#recentProjects">
            <div>✦</div>
            <span>Projects</span>
        </router-link>
        <router-link to="/blog">
            <div>✦</div>
            <span>Blog</span>
        </router-link>
        <router-link to="/about">
            <div>✦</div>
            <span>About</span>
        </router-link>
    </nav>

    <div class="languageSelector" :class="{open: isMenuOpen}"> 
        <div id="pl" :class="{active: language === 'pl'}" @click="updateLanguage('pl')">
            <FlagPLicon />
            <span>Polish</span>
        </div>
        <div id="eng" :class="{active: language === 'en'}" @click="updateLanguage('en')">
            <FlagENGicon />
            <span>English</span>
        </div>
    </div>

</template>

<script>
import FlagENGicon from "@/assets/svg/flagENGicon.vue";
import FlagPLicon from "@/assets/svg/flagPLicon.vue";
import roundArrowRightIcon from "@/assets/svg/roundArrowRightIcon.vue";
export default {
    name: "Navigation",
    components: {
        roundArrowRightIcon,
        FlagENGicon,
        FlagPLicon,
    },
    props: {
        language: String,
        colorScheme: String,
    },
    emits: ['update:language', 'update:colorScheme'],
    methods: {
        openMenu() {
            this.isMenuOpen = !this.isMenuOpen;
        },
        updateLanguage(val) {
            this.$emit('update:language', val)
        },
        updateColorScheme(val) {
            this.$emit('update:colorScheme', val)
        },
        toggleColorScheme() {
            const newScheme = this.colorScheme === 'dark' ? 'light' : 'dark';
            this.updateColorScheme(newScheme);
        }
    },
    data() {
        return {
            isMenuOpen: false,
        };
    },
};
</script>

<style scoped>

.navigationButton {
    position: fixed;
    left: 0.25rem;
    top: 50%; /* later fix this */
    transform: translateY(-50%);
    z-index: 10;
    background-color: transparent;
    border: none;
    cursor: pointer;

    user-select: none;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 3rem;
    height: 6rem;

    opacity: 0.5;
    transition: 0.5s;

    /* outline: dashed 0.125rem red; */
}
.navigationButton:hover {
    opacity: 1;
    transition: 0.1s;
}
.navigationButton.open {
    left: 4rem;
}

.navigationButton::before,
.navigationButton::after {
  content: '';
  position: absolute;
  left: 0;
  width: 0.25rem;
  height: 2rem;
z-index: 10;
  background-color: #fff;
  border-radius: 1rem;
  transition: transform 0.3s ease-out, opacity 0.3s ease;
}
.navigationButton:hover::before,
.navigationButton:hover::after {
  transition: transform 0.2s ease, opacity 0.1s ease;
}

.navigationButton::before {
transform-origin: bottom center;
  transform: translate(0, -0.875rem) rotate(0deg);
}

.navigationButton::after {
transform-origin: top center;
  transform: translate(0, 0.875rem) rotate(0deg);
}

.navigationButton:hover::before {
  transform: translate(1.25rem, -0.875rem) rotate(-30deg);
}
.navigationButton:hover::after {
  transform: translate(1.25rem, 0.875rem) rotate(30deg);
}

.navigationButton.open:hover::before {
  transform: translate(0rem, -0.875rem) rotate(30deg);
}
.navigationButton.open:hover::after {
  transform: translate(0rem, 0.875rem) rotate(-30deg);
}


.navigationButton:active::before,
.navigationButton:active::after {
    transition: 0;
}


.colorScheme {
    position: fixed;

    top: 1rem;
    left: -10rem;
    z-index: 1000;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    width: 2rem;
    height: 2rem;
    border-radius: 50%;

    background-color: var(--navigationColor);
    color: var(--navigationTextColor);

    user-select: none;

    transition: 0.4s 0.2s;
}
.colorScheme.open {
    left: 2rem;
}
.colorScheme span {
    position: absolute;
    width: max-content;
    white-space: nowrap;
    left: 100%;

    opacity: 0;
    margin-left: 0.25rem;

    color: var(--white);
    text-shadow: 0 0 0.125rem var(--black);

    transition: 0.4s;
}
.colorScheme:hover span  {
    opacity: 1;
    margin-left: 0.5rem;

    transition: 0.2s;
}

.navigation {
    position: fixed;
    left: -10rem;
    top: 50%; /* later fix this */
    transform: translateY(-50%);
    background-color: var(--color-bg);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    z-index: 999;

    transition: 0.2s 0s;
}
.navigation.open {
    left: 1rem;
}
.navigation > * {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.navigation > * > div {
    width: 2rem;
    height: 2rem;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 50%;

    background-color: var(--navigationColor);
    color: var(--navigationTextColor);

    transition: 0.4s;
}
.navigation > * > span {
    position: absolute;
    z-index: 1020;
    left: 100%;
    margin-left: 0.25rem;

    opacity: 0;

    background-color: var(--navigationColor);
    color: var(--navigationTextColor);

    display: flex;
    align-items: center;
    justify-content: center;

    padding: 0.25rem 0.5rem;
    border-radius: 5rem;
    white-space: nowrap;

    font-size: 0.875rem;
    line-height: 0.75rem;

    transition: 0.4s;

    pointer-events: none;
    user-select: none;
}
.navigation > *:hover > span {
    margin-left: 0.375rem;
    opacity: 1;
    transition: 0.2s;
}






.languageSelector {
    position: fixed;
    left: -10rem;
    bottom: 1rem;
    z-index: 1000;

    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
    gap: 0.5rem;

    user-select: none;

    transition: 0.4s 0.4s;
}
.languageSelector.open {
    left: 2rem;
}
.languageSelector div {
    position: relative;
    width: 2rem;
    height: 2rem;

    display: flex;
    align-items: flex-end;
    justify-content: center;

    order: 1;
}
.languageSelector div.active {
    order: -1;
}
.languageSelector div svg {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;

    transition: 0.4s;
}
.languageSelector div:not(.active):hover svg {
    width: 1.75rem;
    height: 1.75rem;

    transition: 0.2s;
}
.languageSelector div.active svg {
    width: 2rem;
    height: 2rem;
}
.languageSelector div span {
    position: absolute;
    left: 50%;
    bottom: 50%;
    padding-left: 1.25rem;
    transform-origin: left;
    transform: rotate(-25deg);

    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 0rem;
    pointer-events: none;
    
    color: var(--white);
    text-shadow: 0 0 0.125rem var(--black);

    opacity: 0;

    transition: 0.4s;
}
.languageSelector div.active span {
    transition: 0s !important;
}
.languageSelector div:not(.active):hover span {
    transform: rotate(-45deg);
    opacity: 1;

    transition: 0.2s;
}





</style>