import { emailService } from "./services/email-service.js";
import emailList from "./cmps/email-list.cmp.js";
import emailDetails from "./cmps/email-details.cmps.js";
import newEmail from "./cmps/new-email.cmp.js";
import sideBar from "./cmps/side-bar.cmp.js";

export default {
    template: `
    <section class="mail-container">
        <side-bar @filtered="setFilter" :unReadCount="unReadCount" @composeEmail="composeEmail"/>
        <div class="mail-box">
            <email-details v-if="selectedEmail"/>
            <email-list v-else-if="emails" :emails="emailsToShow" @selected="selectEmail" @changeList="updateEmails"/>
            <new-email v-if="isCompose" @closedCompose="closeCompose"/>
        </div>
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
            loggedinUserr: null,
            unReadCount: null,

        };
    },
    created() {
        this.loggedinUserr = emailService.getLoggedinUser()
        emailService.query().then(emails => {
            this.emails = emails
            this.unReadCount = this.emails.filter(email => !email.isRead && !email.isBin).length
        })
        this.filter = this.$route.params.filter
        const { emailId } = this.$route.params
        if (!this.$route.params.emailId) return
        emailService.get(emailId)
            .then(email => this.selectedEmail = email)

    },
    methods: {
        selectEmail(email) {
            this.selectedEmail = email
            this.updateEmails()
        },
        composeEmail() {
            this.isCompose = true
        },
        setFilter(filter) {
            this.filter = filter
            this.selectedEmail = null
        },
        updateEmails() {
            emailService.query().then(emails => {
                this.emails = emails
                this.unReadCount = this.emails.filter(email => !email.isRead && !email.isBin).length
            })
        },
        closeCompose() {
            this.isCompose = false
        },
    },
    computed: {
        emailsToShow() {
            var emails = this.emails.sort(function (a, b) { return b.sentAt - a.sentAt });
            const filter = this.filter
            if (!filter) return emails.filter(email => email.to === this.loggedinUserr.email && !email.isBin)
            if (filter === 'inbox') return emails.filter(email => email.to === this.loggedinUserr.email && !email.isBin)
            else if (filter === 'starred') return emails.filter(email => email.isStarred && !email.isBin)
            else if (filter === 'important') return emails.filter(email => email.isImportant && !email.isBin)
            else if (filter === 'sent') return emails.filter(email => email.to !== this.loggedinUserr.email && !email.isBin)
            else if (filter === 'draft') return emails.filter(email => email.isDraft && !email.isBin)
            else if (filter === 'bin') return emails.filter(email => email.isBin)
        },

    },
    unmounted() { },
};