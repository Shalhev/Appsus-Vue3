import { emailService } from "./services/email-service.js";
import emailList from "./cmps/email-list.cmp.js";
import emailDetails from "./cmps/email-details.cmps.js";
import newEmail from "./cmps/new-email.cmp.js";
import sideBar from "./cmps/side-bar.cmp.js";

export default {
    template: `
    <section class="mail-container">
        <side-bar @filtered="setFilter" @composeEmail="composeEmail"/>
        <div class="mail-box">
            <email-details v-if="selectedEmail"/>
            <email-list v-else-if="emails" :emails="emailsToShow" @selected="selectEmail" @changeList="updateEmails"/>
            <new-email v-if="isCompose"/>
        </div>
        <!-- <router-link v-if="selectedEmail" :email="selectedEmail" :to="'/mail/details/'+selectedEmail.id">hey</router-link> -->
    </section>
`,
    components: {
        emailList,
        emailDetails,
        newEmail,
        sideBar
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
        this.filter = this.$route.params.filter
        const { emailId } = this.$route.params
        if (!this.$route.params.emailId) return
        emailService.get(emailId)
            .then(email => this.selectedEmail = email)

    },
    methods: {
        selectEmail(email) {
            this.selectedEmail = email
        },
        composeEmail() {
            this.isCompose = true
        },
        setFilter(filter) {
            this.filter = filter
            this.selectedEmail = null
        },
        updateEmails() {
            emailService.query().then(emails => this.emails = emails)
        }

    },
    computed: {
        emailsToShow() {
            var emails = this.emails.sort(function (a, b) { return b.sentAt - a.sentAt });
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