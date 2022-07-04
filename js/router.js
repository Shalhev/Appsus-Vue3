import homePage from './views/home-page.cmp.js';
import mailApp from './apps/mail/main.mail.js'
import keepApp from './apps/keep/note-app.js'
import mailDetails from './apps/mail/cmps/email-details.cmps.js'
import keepNoteList from './apps/keep/views/notes-list.cmp.js'
import keepBin from './apps/keep/views/notes-bin.cmp.js'
import keepArchive from './apps/keep/views/notes-archive.cmp.js'
import bookApp from './apps/books/views/book-app.cmp.js';
import bookDetails from './apps/books/views/book-details.cmp.js';
import bookAdd from './apps/books/views/book-add.cmp.js'

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
    {
        path: '/books',
        component: bookApp
    },
    {
        path: '/books/:bookId',
        component: bookDetails
    },
    {
        path: '/bookadd',
        component: bookAdd
    },
]

export const router = VueRouter.createRouter({
    routes,
    history: VueRouter.createWebHashHistory()
})