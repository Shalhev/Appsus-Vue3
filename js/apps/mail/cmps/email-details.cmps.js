import { emailService } from "../services/email-service.js";

export default {
    template: `
    <section class="email-details">
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
        console.log('$route.params.emailId: ', this.$route.params.emailId)
    },
    methods: {},
    computed: {},
    watch: {
        '$route.params.emailId': {
            handler() {
                console.log('this.$route.params.emailId: ', this.$route.params.emailId)
                if (!this.$route.params.emailId) return
                const id = this.$route.params.emailId
                emailService.get(id).then(email => {
                    this.email = email
                    console.log('email: ', email)
                })
            },
            immediate: true
        }

    }
}