import homePage from './views/home-page.cmp.js';
import mailApp from './apps/mail/main.mail.js'
import keepApp from './apps/keep/note-app.js'
import mailDetails from './apps/mail/cmps/email-details.cmps.js'
import keepNoteList from './apps/keep/views/notesList.cmp.js'
import keepBin from './apps/keep/views/notes-bin.cmp.js'
import keepArchive from './apps/keep/views/notes-archive.cmp.js'

const routes = [
    {
        path: '/',
        component: homePage
    },
    {
        path: '/mail',
        component: mailApp,
        children: [
            {
                path: 'filter/:filter',
                component: mailApp,
            },
            {
                path: ':emailId',
                component: mailDetails,
            },
        ]
    },
    {
        path: '/keep',
        component: keepApp,
        children: [
            {
                path: 'notes',
                component: keepNoteList
            },
            {
                path: 'bin',
                component: keepBin
            },
            {
                path: 'archive',
                component: keepArchive
            },
        ]
    },
]

export const router = VueRouter.createRouter({
    routes,
    history: VueRouter.createWebHashHistory()
})