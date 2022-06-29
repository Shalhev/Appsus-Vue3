import homePage from './views/home-page.cmp.js';
import mailApp from './apps/mail/main.mail.js'
import keepApp from './apps/keep/note-app.js'

const routes = [
    {
        path: '/',
        component: homePage
    },
    {
        path: '/mail',
        component: mailApp
    },
    {
        path: '/keep',
        component: keepApp
    },
]

export const router = VueRouter.createRouter({
    routes,
    history: VueRouter.createWebHashHistory()
})