import { emailService } from "../services/email-service.js";


export default {
    props: ['email'],
    template: `
    <section class="email-preview">
        <router-link class="tr-router" :to="'/mail/'+email.id">
        <td class="btns">
            <span class="checkbox"><img :src="checkBoxImg(email)" @click.stop="email.isSelected = !email.isSelected"/></span>
            <img :src="starImg(email)" @click.stop="email.isStarred = !email.isStarred"/>
            <span class="important"><img :src="importantImg(email)" @click.stop="email.isImportant = !email.isImportant"/></span>
        </td>
            <td class="name">{{email.name}}</td>
            <td class="subject">{{email.subject}}<span class="body"> - {{email.body}}</span></td>
            <td class="date">{{showTime(email.sentAt)}}</td>
            <td class="bin"><img src="./imgs/apps/mail/bin.png" @click.stop="binEmail(email)"></td>
        </router-link>
    </section>
`,
    data() {
        return {};
    },
    created() { },
    methods: {
        binEmail(email) {
            console.log('email removed: ', email.id)
            if (email.isBin)
                return emailService.removeEmail(email.id)
                    .then(() => this.$emit("changeList"))
            email.isBin = true
            emailService.updateEmail(email).then(() => this.$emit("changeList"))
        },
        starImg(email) {
            if (email.isStarred) return './imgs/apps/mail/starred.png'
            else return './imgs/apps/mail/notStarred.png'
        },
        importantImg(email) {
            if (email.isImportant) return './imgs/apps/mail/important_yellow.png'
            else return './imgs/apps/mail/important_outline.png'
        },
        checkBoxImg(email) {
            if (email.isSelected) return './imgs/apps/mail/checkbox_selected.png'
            else return './imgs/apps/mail/checkbox_outline.png'
        },
        showTime(sentAt) {
            const diff = Date.now() - sentAt;
            const day = 24 * 60 * 60 * 1000
            const date = new Date(sentAt)

            if (diff < day) {
                return `${date.getHours()}:${date.getMinutes()}`
            } else {
                return `${date.getDate()} ${date.toLocaleString('en', { month: 'short' })}`

            }
        },
    },
    computed: {

    },
    unmounted() { },
};