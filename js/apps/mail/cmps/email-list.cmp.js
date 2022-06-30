import { emailService } from "../services/email-service.js";

export default {
    props: ["emails"],
    template: `
    <section class="email-list">
        <table>
        <tbody>
            <tr v-for="email in emails" @click="select(email)" :class="{ notRead: !email.isRead, read: email.isRead }">
                <router-link :to="'/mail/'+email.id">
                <td><img :src="checkBoxImg(email)" @click="email.isSelected = !email.isSelected"/></td>
                <td><img :src="starImg(email)" @click="email.isStarred = !email.isStarred"/></td>
                <td><img :src="importantImg(email)" @click="email.isImportant = !email.isImportant"/></td>
                <td class="name">{{email.name}}</td>
                <td class="subject">{{email.subject}}<span class="body"> - {{email.body}}</span></td>
                <td>{{email.sentAt}}</td>
                <td><button @click.stop="binEmail(email)">X</button></td>
            </router-link>
            </tr>
        </tbody>
        </table>
    </section>
`,
    components: {
        emailService,
    },
    data() {
        return {
        };
    },
    created() { },
    methods: {
        select(email) {
            email.isRead = true
            emailService.updateEmail(email)
            this.$emit("selected", email);
        },
        binEmail(email) {
            console.log('email removed: ', email.id)
            if (email.isBin)
                return emailService.removeEmail(email.id)
                    .then(() => this.$emit("changeList"))
            email.isBin = true
            emailService.updateEmail(email).then(() => this.$emit("changeList"))
        },
        starImg(email) {
            console.log('email:', email)
            if (email.isStarred) return '../../../../imgs/apps/mail/starred.png'
            else return '../../../../imgs/apps/mail/notStarred.png'
        },
        importantImg(email) {
            if (email.isImportant) return '../../../../imgs/apps/mail/important_yellow.png'
            else return '../../../../imgs/apps/mail/important_outline.png'
        },
        checkBoxImg(email) {
            if (email.isSelected) return '../../../../imgs/apps/mail/checkbox_selected.png'
            else return '../../../../imgs/apps/mail/checkbox_outline.png'
        },
    },
    computed: {
        emailRead() {
            const read = this.email.isRead
            return { notRead: !read }
        },
    },
}