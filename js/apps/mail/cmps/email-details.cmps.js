import { emailService } from "../services/email-service.js";

export default {
    template: `
    <section v-if="email" class="email-details">
        <!-- TOP NAV HERE -->
        <!-- TOP NAV HERE -->
        <header class="msg-header">
            <span class="subject">{{email.subject}}</span>
            <div class="btn header-important"><img :src="importantImg(email)" @click.stop="email.isImportant = !email.isImportant"/></div>
        </header>
        <div class="msg-container">
            <div class="left-side-msg">
                <div class="user-icon"><img src="./imgs/apps/mail/profile_icon.png"></div>
            </div>
            <div class="main-side-msg">
                <div class="msg-info">
                    <div class="left">
                        <div class="username">{{email.name}} <span class="email">&lt;{{email.to}}&gt;</span></div>
                    </div>
                    <div class="right">
                        <div class="btn msg-time">{{showTime(email.sentAt)}}</div>
                        <div class="btn starred"  @click.stop="email.isStarred = !email.isStarred"><img :src="starImg(email)"/></div>
                        <div class="btn replay-btn"><img src="./imgs/apps/mail/replay.png"></div>
                    </div>
                </div>
                <pre class="msg-body">{{email.body}}</pre>
                <div class="btns">
                    <div class="replay">
                        <img src="./imgs/apps/mail/replay.png">
                        <span>Replay</span>
                    </div>
                    <div class="forward">
                        <img src="./imgs/apps/mail/forward.png">
                        <span>Forward</span>
                    </div>
                </div>

            </div>
        </div>
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
        },
        starImg(email) {
            if (email.isStarred) return './imgs/apps/mail/starred.png'
            else return './imgs/apps/mail/notStarred.png'
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