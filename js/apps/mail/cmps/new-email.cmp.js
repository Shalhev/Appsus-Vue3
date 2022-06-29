import { storageService } from "../../../services/async-storage-service.js";
import { emailService } from "../services/email-service.js";


export default {
    template: `
    <input type="email" v-model="email.to" placeholder="To">
    <input type="text" v-model="email.subject" placeholder="Subject">
    <textarea name="" v-model="email.body" id="" cols="30" rows="10"></textarea>
    <button @click="sendEmail">Send</button>
    <pre>{{email}}</pre>
`,
    data() {
        return {
            email: {
                id: storageService.makeId(),
                subject: '',
                body: '',
                sentAt: 1551133930594,
                to: '',
                name: 'Momo',
                isRead: false,
                isStarred: false,
                isImportant: false,
                isDraft: false,
                isBin: false,
            }
        }
    },
    created() {
        // this.email = emailService.getEmptyEmail()
    },
    methods: {
        sendEmail() {
            emailService.addEmail(this.email)
            this.email = emailService.getEmptyEmail()
        }
    },
    computed: {},
    unmounted() { },
};