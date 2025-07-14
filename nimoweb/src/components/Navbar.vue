<template>
    <button @click="openMenu" class="navbarOpenButton" :class="[colorSchemeClass, { open: isMenuOpen }]">
        <!-- <roundArrowRightIcon /> -->
    </button>

    <div class="navbarPanel" id="settings" :class="[colorSchemeClass, { open: showSettingsPanel }]">
        <div class="navbarButton navbarResponsiveButton colorSchemeButton" @click="toggleColorScheme">
            <span class="materialSymbol" :class="materialSymbolsClass" v-show="colorScheme == 'dark'">
                dark_mode
            </span>
            <span class="materialSymbol" :class="materialSymbolsClass" v-show="colorScheme == 'light'">
                light_mode
            </span>

            <span class="label">{{ colorScheme === 'dark' ? $t('navigation.lightMode') : $t('navigation.darkMode') }}</span>
        </div>
        <hr>
        <div class="navbarButton navbarResponsiveButton animationsButton" @click="toggleAnimations">
            <span class="materialSymbol" :class="materialSymbolsClass">animation</span>
            <span class="cross" :class="materialSymbolsClass">pen_size_2</span>
            <span class="label">{{ animations ? $t('navigation.animationsOn') : $t('navigation.animationsOff') }}</span>
        </div>
        <hr>
        <div class="navbarButton navbarResponsiveButton" :class="{ active: language === 'en' }" @click="updateLanguage('en')">
            <FlagENGicon class="flag" />
            <span class="label">English</span>
        </div>
        <div class="navbarButton navbarResponsiveButton" :class="{ active: language === 'pl' }" @click="updateLanguage('pl')">
            <FlagPLicon class="flag" />
            <span class="label">Polski</span>
        </div>
    </div>
    <div class="navbarPanel" id="user" :class="[colorSchemeClass, { open: showUserPanel }]">
        <span class="shruggie">¯\_(ツ)_/¯</span>
        <hr>
        <span>nimoweb account system is still in development.</span>
        <span>Follow the blog for updates.</span>
        <span>Check the contact info in links if you ahve any questions.</span>
    </div>
    <div id="navBar" :class="[colorSchemeClass, { open: isMenuOpen}]">
        <router-link to="/" class="top navbarButton">
            <div class="logo">
                <nimoSignet :style="{'color': colorScheme == 'dark' ? '#fff' : '#000'}" />
            </div>
            <span class="label correctMargin">{{ $t('navigation.home') }}</span>
        </router-link>
        <div class="middle">
            <nav>
                <router-link to="/blog" class="navbarButton navbarResponsiveButton">
                    <span class="materialSymbol" :class="materialSymbolsClass">newsmode</span>
                    <span class="label">{{ $t('navigation.blog') }}</span>
                </router-link>
                <router-link to="/projects" class="navbarButton navbarResponsiveButton">
                    <span class="materialSymbol hideOnHover" :class="materialSymbolsClass">folder</span>
                    <span class="materialSymbol showOnHover" :class="materialSymbolsClass">folder_open</span>
                    <span class="label">{{ $t('navigation.projects') }}</span>
                </router-link>
                <router-link to="/contact" class="navbarButton navbarResponsiveButton">
                    <span class="materialSymbol" :class="materialSymbolsClass">alternate_email</span>
                    <span class="label">{{ $t('navigation.links') }}</span>
                </router-link>
            </nav>
        </div>
        <div class="lower">
            <!-- <router-link to="/notifications" @click="notificationsCount++" class="navbarButton navbarResponsiveButton">
                <span class="materialSymbol" :class="materialSymbolsClass">notifications</span>
                <span class="label">{{ $t('navigation.notifications') }}</span>
                <span v-if="notificationsCount > 0" class="notificationCount">{{ notificationsCount }}</span>
            </router-link> -->
            <div class="navbarButton navbarResponsiveButton" @click="openSettingsPanel">
                <span class="materialSymbol" :class="materialSymbolsClass">settings</span>
                <span class="label">{{ $t('navigation.settings') }}</span>
            </div>
            <!-- <router-link to="/support" class="navbarButton navbarResponsiveButton">
                <span class="materialSymbol" :class="materialSymbolsClass">support</span>
                <span class="label">{{ $t('navigation.support') }}</span>
            </router-link> -->
        </div>
        <div class="bottom navbarButton">
            <div class="user" @click="openUserPanel">
                <img src="@/assets/img/blankPfp.png" alt="User Avatar" v-if="loggedIn">
                <img src="@/assets/img/user.png" alt="User Avatar" v-else>
            </div>
            <span class="label correctMargin">{{ $t('navigation.userPanel') }}</span>
        </div>
    </div>

</template>

<script>
import FlagENGicon from "@/assets/svg/flagENGicon.vue";
import FlagPLicon from "@/assets/svg/flagPLicon.vue";
import roundArrowRightIcon from "@/assets/svg/roundArrowRightIcon.vue";
import nimoSignet from "@/assets/svg/nimoSignet.vue";

import { useAppSettingsStore } from '@/assets/js/stores/appSettingsStore.js';
import { storeToRefs } from 'pinia';

export default {
    name: "Navigation",
    components: {
        roundArrowRightIcon,
        FlagENGicon,
        FlagPLicon,
        nimoSignet,
    },
    setup() {
        const settings = useAppSettingsStore();
        const { language, colorScheme, animations } = storeToRefs(settings);

        return {
            language,
            colorScheme,
            animations,
            settings
        };
    },
    methods: {
        openMenu() {
            this.closeAllPanels();
            this.isMenuOpen = !this.isMenuOpen;
        },
        updateLanguage(val) {
            this.settings.language = val;
        },
        toggleColorScheme() {
            this.settings.colorScheme = this.colorScheme === 'dark' ? 'light' : 'dark';
        },
        closeAllPanels() {
            this.showUserPanel = false;
            this.showSettingsPanel = false;
        },
        openUserPanel() {
            if (this.showUserPanel) { this.closeAllPanels(); return; }
            this.closeAllPanels();
            this.showUserPanel = true;
        },
        openSettingsPanel() {
            if (this.showSettingsPanel) { this.closeAllPanels(); return; }
            this.closeAllPanels();
            this.showSettingsPanel = true;
        },
        toggleAnimations() {
            this.settings.animations = !this.animations;
        },
    },
    data() {
        return {
            isMenuOpen: false,
            loggedIn: false,
            materialSymbolsClass: 'material-symbols-rounded',
            notificationsCount: 1,
            showPassword: false,
            login: '',
            password: '',
            stayLoggedIn: false,

            showUserPanel: false,
            showSettingsPanel: false,
        };
    },
    computed: {
        colorSchemeClass() {
            return this.colorScheme === 'dark' ? 'darkMode' : 'lightMode';
        },
    },
};
</script>

<style scoped>
/* #region NAVIGATION BUTTON */

.lightMode, .lightMode * {
    --navbarBackground: var(--panelBackground);
    --navbarBorder: var(--panelBorder);
    --navbarText: var(--panelTextColor);

    --navbarHoverText: #111;
    --navbarIcon: #000;
    --navbarLabelBackground: #fff;
    --navbarShadow: #000a;
    --navbarAccent: #00aaff;
    --navbarDanger: #ff4444;
    --navbarLight: #eee;
    --navbarGrayLight: #999;
}

.darkMode, .darkMode * {
    --navbarBackground: var(--panelBackground);
    --navbarBorder: var(--panelBorder);
    --navbarText: var(--panelTextColor);

    --navbarHoverText: var(--grayLight);
    --navbarIcon: var(--white);
    --navbarLabelBackground: var(--darkDark);
    --navbarShadow: #0008;
    --navbarAccent: #00aaff;
    --navbarDanger: var(--red);
    --navbarLight: var(--lightLight);
    --navbarGrayLight: var(--grayLight);
}

.navbarOpenButton {
    --navbarButtonWidth: 0.25rem;
    --navbarButtonHeight: 3rem;
    --rotation: 30deg;

    position: fixed;
    left: 0.25rem;
    top: calc(50vh - var(--navbarButtonHeight) - var(--navbarMargin));
    /* later fix this */
    z-index: 10;
    background-color: transparent;
    border: none;
    cursor: pointer;

    user-select: none;

    display: flex;
    align-items: center;
    justify-content: center;

    width: calc(sin(var(--rotation)) * var(--navbarButtonHeight) + var(--navbarButtonWidth));
    height: calc(var(--navbarButtonHeight) * 2.5);

    opacity: 0.5;
    transition: 0.2s cubic-bezier(0.2, 0, 0.3, 1.8);

    /* outline: dashed 0.125rem red; */
}

.navbarOpenButton:hover {
    opacity: 1;
}

.navbarOpenButton.open {
    left: calc(var(--navbarWidth) + var(--navbarMargin) * 2);
}

.navbarOpenButton::before,
.navbarOpenButton::after {
    content: '';
    position: absolute;
    left: 0;
    width: var(--navbarButtonWidth);
    height: var(--navbarButtonHeight);
    z-index: 10;
    background-color: #fff;
    border-radius: 1rem;
    transition: transform 0.3s ease-out, opacity 0.3s ease;
}

/* .navbarOpenButton::before { display: none;} */

.navbarOpenButton:hover::before,
.navbarOpenButton:hover::after {
    transition: transform 0.2s ease, opacity 0.1s ease;
}

.navbarOpenButton::before {
    transform-origin: bottom center;
    transform: translate(0,
            calc(var(--navbarButtonHeight) / -2 + var(--navbarButtonWidth) / 2)) rotate(0deg);
}

.navbarOpenButton::after {
    transform-origin: top center;
    transform: translate(0,
            calc(var(--navbarButtonHeight) / 2 - var(--navbarButtonWidth) / 2)) rotate(0deg);
}

.navbarOpenButton:hover::before {
    transform: translate(calc(sin(var(--rotation)) * var(--navbarButtonHeight)),
            calc(var(--navbarButtonHeight) / -2 + var(--navbarButtonWidth) / 2)) rotate(calc(var(--rotation) * -1));
}

.navbarOpenButton:hover::after {
    transform: translate(calc(sin(var(--rotation)) * var(--navbarButtonHeight)),
            calc(var(--navbarButtonHeight) / 2 - var(--navbarButtonWidth) / 2)) rotate(calc(var(--rotation) * 1));
}

.navbarOpenButton.open:hover::before {
    transform: translate(0,
            calc(var(--navbarButtonHeight) / -2 + var(--navbarButtonWidth) / 2)) rotate(calc(var(--rotation) * 1));
}

.navbarOpenButton.open:hover::after {
    transform: translate(0,
            calc(var(--navbarButtonHeight) / 2 - var(--navbarButtonWidth) / 2)) rotate(calc(var(--rotation) * -1));
}

.navbarOpenButton:active::before,
.navbarOpenButton:active::after {
    transition: 0;
}

/* #endregion NAVIGATION BUTTON */

/* #region NAVIAGTION MENU */

#navBar {
    --lowerSectionHeight: calc(1 * (var(--navbarWidth) - 2 * var(--navbarMargin)) + 2 * var(--navbarMargin));

    position: fixed;
    top: var(--navbarMargin);
    left: calc(-1 * var(--navbarWidth) - var(--navbarMargin));
    width: var(--navbarWidth);
    bottom: var(--navbarMargin);

    padding-block: var(--navbarPadding);

    border-radius: calc(4 * var(--navbarMargin));

    display: flex;
    flex-direction: column;
    gap: var(--navbarMargin);

    transition: 0.2s cubic-bezier(0.2, 0, 0.3, 1.8);

    z-index: 20;

    background: var(--navbarBackground);
    border: 0.0625rem solid var(--navbarBorder);
    box-shadow: -0.0625rem 0.0625rem 0.25rem var(--navbarShadow);
}

#navBar.open {
    left: var(--navbarMargin);
}

#navBar hr {
    height: 2px;
    margin-inline: calc(var(--navbarPadding) / 2);
    background-color: var(--navbarBorder);
    border-radius: 1rem;
    border: none;
}


#navBar .top,
#navBar .middle,
#navBar .lower,
#navBar .bottom {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--navbarMargin);
}

#navBar .top {
    justify-content: flex-start;

    margin-inline: calc(var(--navbarPadding) / 2);
    border-bottom: 0.125rem solid var(--navbarBorder);
}

#navBar .middle {
    justify-content: center;
    flex-grow: 1;
    transition: 0.4s;
}

#navBar:hover .middle {
    margin-top: min(
        calc( var(--lowerSectionHeight) - 0.25rem),
        calc(50vh - 4 * (var(--navbarWidth) - 2 * var(--navbarMargin)) - 4 * var(--navbarPadding))
    );
}

#navBar .lower {
    justify-content: center;
    border-block: 0.125rem solid var(--navbarBorder);
    margin-inline: calc(var(--navbarPadding) / 2);
    transition: 0.4s height, 0.4s gap, 0.4s padding-block, 0s 0s border-block;
    height: var(--lowerSectionHeight);
}

#navBar:not(:hover) .lower {
    height: 0;
    gap: 0;
    padding-block: 0;
    border-block: 0.0625rem solid var(--navbarBorder);
    transition: 0.4s height, 0.4s gap, 0.4s padding-block, 0.2s 0.2s border-block;
}

#navBar:not(:hover) .lower * {
    opacity: 0;
    pointer-events: none;
    transition: 0.2s 0s color, 0.2s 0s transform, 0.2s 0s opacity;
}

#navBar:hover .lower * {
    opacity: 1;
    pointer-events: all;
    transition: 0.2s 0s color, 0.2s 0s transform, 0.2s 0.2s opacity;
}

#navBar .bottom {
    justify-content: flex-end;
}



#navBar .top svg {
    width: calc(var(--navbarWidth) - var(--navbarPadding) * 2);
}

#navBar .middle nav {
    display: flex;
    flex-direction: column;
    gap: var(--navbarMargin)
}

#navBar .bottom .user {
    display: flex;
    align-items: center;
    justify-content: center;

    width: calc(var(--navbarWidth) - var(--navbarPadding) * 2);
    height: calc(var(--navbarWidth) - var(--navbarPadding) * 2);

    cursor: pointer;
}

#navBar .bottom .user img {
    width: calc(var(--navbarWidth) - var(--navbarPadding) * 2);
    height: calc(var(--navbarWidth) - var(--navbarPadding) * 2);
    border-radius: 50%;
    object-fit: cover;
    outline: 0.0625rem solid var(--navbarBorder);
}




.navbarButton {
    cursor: pointer;

    display: flex;
    align-content: center;
    justify-content: center;

    color: var(--navbarText);
    position: relative;

    transition: 0.2s;

    user-select: none;
    -webkit-user-drag: none;
}

.navbarResponsiveButton:not(.active):hover {
    color: var(--navbarHoverText);
    transition: 0.2s 0s color, 0.2s 0s transform, 0.2s 0.2s opacity !important;
}
.navbarResponsiveButton:not(.active):hover span.materialSymbol {
    transform: scale(1.1);
    transition: 0.2s 0s color, 0.2s 0s transform, 0.2s 0.2s opacity !important;
}
.navbarResponsiveButton:not(.active):active span.materialSymbol {
    transform: scale(0.9);
    color: var(--navbarLight);
    transition: 0s 0s color, 0s 0s transform, 0.2s 0.2s opacity !important;
}

.navbarButton span.label {
    pointer-events: none;

    white-space: nowrap;

    position: absolute;
    left: 100%;

    display: flex;

    font-size: 0.875rem;
    font-weight: 700;
    margin-left: 0rem;

    padding: 0.25rem 1rem;
    background-color: var(--navbarLabelBackground);
    color: var(--navbarGrayLight);
    box-shadow: -0.0625rem 0.0625rem 0.25rem var(--navbarShadow);
    border-radius: 1rem;

    opacity: 0 !important;

    transition: 0.4s 0.2s !important;
}

.navbarButton:not(.active):hover span.label {
    opacity: 1 !important;
    left: calc(100% + 2 * var(--navbarMargin)) !important;
    z-index: 15;

    transition: 0.2s 0.6s;
}

.navbarButton:hover span.label.correctMargin {
    left: calc(100% + var(--navbarMargin)) !important;
}

.materialSymbol {
    font-size: 2rem;
    font-variation-settings:
        'FILL' 0,
        'wght' 100,
        'GRAD' 1,
        'opsz' 24;
}


.notificationCount {
    position: absolute;
    bottom: 50%;
    left: 50%;

    padding: 0.375rem;
    height: 1rem;
    min-width: 1rem;

    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 0.75rem;
    font-weight: 700;

    color: var(--navbarLabelBackground);
    background-color: var(--navbarDanger);

    border-radius: 1rem;
}

/* #endregion NAVIGATION BUTTON */

/* #region SHOW HIDE ON HOVER */

*:not(:hover)>.showOnHover,
*:hover>.hideOnHover {
    display: none !important;
}

/* #endregion SHOW HIDE ON HOVER */



/* #region NAVBAR PANEL */
.navbarPanel#settings {
    --panelWidth: calc(var(--navbarWidth) - 2 * var(--navbarPadding));
}

.navbarPanel#user {
    --panelWidth: 30rem;
}

.navbarPanel {
    width: var(--panelWidth);

    position: fixed;
    bottom: var(--navbarMargin);

    background: var(--navbarBackground);
    border: 0.0625rem solid var(--navbarBorder);
    box-shadow: -0.0625rem 0.0625rem 0.25rem var(--navbarShadow);

    border-radius: calc(3 * var(--navbarMargin));

    display: flex;
    flex-direction: column;
    /* gap: var(--navbarMargin); */

    transition: 0.2s cubic-bezier(0.2, 0, 0.3, 1.8);

    z-index: 10;
}

.navbarPanel hr {
    height: 2px;
    margin-inline: calc(var(--navbarPadding) / 2);
    background-color: var(--navbarBorder);
    border-radius: 1rem;
    border: none;
}

.navbarPanel:not(.open) {
    left: calc(-1 * var(--panelWidth));
}

.navbarPanel.open {
    left: calc(var(--navbarWidth) + 2 * var(--navbarMargin));
}

.navbarButton .flag {
    border-radius: 50%;
    aspect-ratio: 1 / 1;
    width: calc(var(--panelWidth) - var(--navbarPadding) * 2.5);
    height: calc(var(--panelWidth) - var(--navbarPadding) * 2.5);
    margin-block: calc(var(--navbarPadding) * 1);
    transition: 0.2s;
    box-shadow: 0 0 0.125rem #000;
}

.navbarButton.active .flag {
    width: calc(var(--panelWidth) - var(--navbarPadding) * 1.5) !important;
    height: calc(var(--panelWidth) - var(--navbarPadding) * 1.5) !important;
    margin-block: calc(var(--navbarPadding) / 2);
}

.navbarButton:not(.active):hover .flag {
    transform: scale(1.1);
}

.navbarButton.colorSchemeButton {
    margin-block: calc(var(--navbarPadding) / 1.5);
}


.navbarButton.colorSchemeButton span.materialSymbol {
    font-size: 2rem;
}
.navbarButton.animationsButton {
    margin-block: calc(var(--navbarPadding) / 1.5);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    
    color: var(--navbarText);

    transition: 0.2s;
}
.animationsOff .navbarButton.animationsButton  {
    color: var(--grayDark);
}
.navbarButton.animationsButton .cross {
    position: absolute;
    transform: rotate(90deg);
    font-size: 0rem;

    opacity: 0;

    transition: 0.2s;
}

.animationsOff .navbarButton.animationsButton .cross {
    font-size: 2rem !important;
    color: var(--navbarText);
    opacity: 1;
}
.animationsOff .navbarButton.animationsButton:hover .cross {
    font-size: 2rem !important;
    color: var(--navbarHoverText);
}



.navbarPanel#user {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}
.navbarPanel#user span {
    color: var(--panelTextColor);
    font-size: 0.875rem;
}
.navbarPanel#user .shruggie {
    color: var(--panelTextColor);
    font-size: 2rem;
    text-align: center;
    margin-bottom: 0.5rem;
}

/* #endregion NAVBARPANEL */
</style>