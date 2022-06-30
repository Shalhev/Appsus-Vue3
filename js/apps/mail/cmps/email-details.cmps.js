import { emailService } from "../services/email-service.js";

export default {
    template: `
    <section v-if="email" class="email-details">
        <!-- TOP NAV HERE -->
        <!-- TOP NAV HERE -->
        <header class="msg-header">
            <span class="subject">{{email.subject}}</span>
        <span class=important><img :src="importantImg(email)"/></span>
        </header>
        <div class="msg-container">
            <div class="left-side-msg">
                <div class="user-icon">icon</div>
            </div>
            <div class="main-side-msg">
                <div class="msg-info">
                    <div class="username">Jory from Font Awesome<span class="email">&lt;jory@m.fontawesome.com&gt;</span></div>
                    <div class="msg-time">11:11 (4 hours ago)</div>
                    <div class="starred">{{email.isStarred}}</div>
                    <div class="replay-btn">replay-btn</div>
                </div>
                <div class="msg-body">
                    {{email.body}}
                </div>
                <div class="btns">
                    <button class="replay-btn">Replay</button>
                    <button class="forward-btn">Forward</button>
                </div>

            </div>
        </div>
            <pre>{{email}}</pre>
    </section>
`,
    components: {
        emailService,
    },
    data() {
        return {
            email: null,
        };
    },
    created() {

    },
    methods: {
        importantImg(email) {
            if (email.isImportant) return './imgs/apps/mail/important_yellow.png'
            else return './imgs/apps/mail/important_outline.png'
        }
    },
    computed: {},
    watch: {
        '$route.params.emailId': {
            handler() {
                if (!this.$route.params.emailId) return
                const id = this.$route.params.emailId
                emailService.get(id).then(email => {
                    this.email = email
                })
            },
            immediate: true
        }

    }
}