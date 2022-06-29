// general
import { router } from './router.js'

// cmps
import appHeader from './cmps/header.cmp.js'
import userMsg from './cmps/userMsg.cmp.js'
import appFooter from './cmps/footer.cmp.js'

// apps
// import mailApp from './apps/mail/main.mail.js'
// import keepApp from './apps/keep/note-app.js'

const options = {
    template: `
          <section>
              <app-header />
              <user-msg/>
              <router-view/>
              <!-- <app-footer /> -->
          </section>
      `,
    components: {
        appHeader,
        appFooter,
        userMsg,
    },
};

const app = Vue.createApp(options);
app.use(router)
app.mount("#app");