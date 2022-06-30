import { storageService } from "../../../services/async-storage-service.js";
import { emailService } from "../services/email-service.js";


export default {
    template: `
    <section class="new-email-container">
        <div class="new-msg-header">New Message</div>
        <input type="email" id="email" v-model="email.to" placeholder="To">
        <input type="text" v-model="email.subject" placeholder="Subject">
        <textarea name="" v-model="email.body" id="" cols="30" rows="20"></textarea>
        <div>
            <button class="sendEmail-btn" @click="sendEmail">Send</button>
        </div>
    </section>
    <!-- <pre>{{email}}</pre> -->
`,
    data() {
        return {
            email: {
                id: storageService.makeId(),
                subject: '',
                body: '',
                sentAt: null,
                to: '',
                name: '',
                isRead: true,
                isStarred: false,
                isImportant: false,
                isDraft: false,
                isSelected: false,
                isBin: false,
            }
        }
    },
    created() {
        const loggedinUserr = emailService.getLoggedinUser()
        this.email.name = loggedinUserr.fullname
        // this.email = emailService.getEmptyEmail()
    },
    methods: {
        sendEmail() {
            this.email.sentAt = Date.now()
            emailService.addEmail(this.email)
            this.email = emailService.getEmptyEmail()
        }
    },
    computed: {},
    unmounted() { },
};