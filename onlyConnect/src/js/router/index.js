import { createRouter, createWebHistory } from 'vue-router'
import AdminView from '@/views/AdminView.vue'
import DisplayView from '@/views/DisplayView.vue'
import LandingView from '@/views/LandingView.vue'
import DisplayControls from '@/views/admin/DisplayControls.vue'
import TeamsControls from '@/views/admin/TeamsControlsAdminView.vue'
import ScoreControls from '@/views/admin/ScoreControlsAdminView.vue'
import Round1 from '@/views/admin/Round1AdminView.vue'
import Round2 from '@/views/admin/Round2AdminView.vue'
import Round3 from '@/views/admin/Round3AdminView.vue'
import Round4 from '@/views/admin/Round4AdminView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: LandingView },

    { path: '/admin', component: AdminView },

    { path: "/admin/displayControls", component: DisplayControls },
    { path: "/admin/teamsControls", component: TeamsControls },
    { path: "/admin/scoreControls", component: ScoreControls },
    { path: "/admin/round1", component: Round1 },
    { path: "/admin/round2", component: Round2 },
    { path: "/admin/round3", component: Round3 },
    { path: "/admin/round4", component: Round4 },

    { path: '/display', component: DisplayView }
  ],
})

export default router
