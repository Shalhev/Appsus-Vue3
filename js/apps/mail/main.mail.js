import { emailService } from "./services/email-service.js";
import emailList from "./cmps/email-list.cmp.js";
import emailDetails from "./cmps/email-details.cmps.js";
import newEmail from "./cmps/new-email.cmp.js";

export default {
    template: `
    <section class="mail-container">
        <nav class="side-bar">
            <button @click="composeEmail">Compose</button>
            <div class="btn" @click="setFilter('inbox')">Inbox</div>
            <div class="btn" @click="setFilter('starred')">Starred</div>
            <div class="btn" @click="setFilter('important')">Important</div>
            <div class="btn" @click="setFilter('sent')">Sent</div>
            <div class="btn" @click="setFilter('draft')">Drafts</div>
            <div class="btn" @click="setFilter('bin')">Bin</div>
        </nav>
        <div class="mail-box">
            <h2>Mail App</h2>
            <pre>{{emails}}</pre>
            <email-list v-if="emails" :emails="emailsToShow" @selected="selectEmail"/>
            <email-details v-if="selectedEmail" :email="selectedEmail"/>
            <new-email v-if="isCompose"/>
        </div>
        <!-- <router-link v-if="selectedEmail" :email="selectedEmail" :to="'/mail/details/'+selectedEmail.id">hey</router-link> -->
    </section>
`,
    components: {
        emailList,
        emailDetails,
        newEmail,
    },
    data() {
        return {
            emails: null,
            selectedEmail: null,
            isCompose: false,
            filter: null,

        };
    },
    created() {
        emailService.query().then(emails => this.emails = emails)
    },
    methods: {
        selectEmail(email) {
            this.selectedEmail = email
        },
        composeEmail() {
            this.isCompose = true
        },
        setFilter(filter) {
            console.log('filter: ', filter)
            this.filter = filter
        }

    },
    computed: {
        emailsToShow() {
            var emails = this.emails
            const filter = this.filter
            if (!filter) return emails.filter(email => !email.isBin)
            if (filter === 'inbox') return emails.filter(email => email.to === 'user@appsus.com')
            else if (filter === 'starred') return emails.filter(email => email.isStarred && !email.isBin)
            else if (filter === 'important') return emails.filter(email => email.isImportant && !email.isBin)
            else if (filter === 'sent') return emails.filter(email => email.to !== 'user@appsus.com' && !email.isBin)
            else if (filter === 'draft') return emails.filter(email => email.isDraft && !email.isBin)
            else if (filter === 'bin') return emails.filter(email => email.isBin)

        }
    },
    unmounted() { },
};