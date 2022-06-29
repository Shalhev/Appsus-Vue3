import { emailService } from "../services/email-service.js";

export default {
    props: ["emails"],
    template: `
    <section class="email-list">
        <table>
        <tbody>
            <tr v-for="email in emails" @click="select(email)" :class="{ notRead: !email.isRead, read: email.isRead }">
                <router-link :to="'/mail/'+email.id">
                <td><img :src="starImg"></td>
                <td>{{email.name}}</td>
                <td>{{email.subject}}</td>
                <td>{{email.body}}</td>
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
            starredImg: '../../../../imgs/apps/mail/starred.png',
            notStarredImg: '../../../../imgs/apps/mail/notStarred.png'
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

        }
    },
    computed: {
        emailRead() {
            const read = this.email.isRead
            return { notRead: !read }
        },
        starImg(email) {
            // console.log('email:', email)
            // if (isStarred) return this.starredImg
            // else return this.notStarredImg
        }
    },
}