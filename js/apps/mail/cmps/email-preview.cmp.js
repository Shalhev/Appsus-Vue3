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
            <td>{{showTime(email.sentAt)}}</td>
            <td><button @click.stop="binEmail(email)">X</button></td>
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
        // var periods = {
        //     month: 30 * 24 * 60 * 60 * 1000,
        //     week: 7 * 24 * 60 * 60 * 1000,
        //     day: 24 * 60 * 60 * 1000,
        //     hour: 60 * 60 * 1000,
        //     minute: 60 * 1000
        // };
        // var diff = Date.now() - sentAt;
        // if (diff > periods.month) {
        //     // it was at least a month ago
        //     return Math.floor(diff / periods.month) + "month";
        // } else if (diff > periods.week) {
        //     return Math.floor(diff / periods.week) + "w";
        // } else if (diff > periods.day) {
        //     return Math.floor(diff / periods.day) + "d";
        // } else if (diff > periods.hour) {
        //     return Math.floor(diff / periods.hour) + "h";
        // } else if (diff > periods.minute) {
        //     return Math.floor(diff / periods.minute) + "m";
        // }
        // return "Just now";


    },
    computed: {

    },
    unmounted() { },
};