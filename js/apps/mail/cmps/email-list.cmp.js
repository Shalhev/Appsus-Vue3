import { emailService } from "../services/email-service.js";
import emailPreview from "./email-preview.cmp.js";
import { router } from "../../../router.js";

export default {
    props: ["emails"],
    template: `
    <section class="email-list">
        <table>
        <tbody>
            <tr v-for="email in emails" @click="select(email)" :class="{ notRead: !email.isRead, read: email.isRead }">
                <email-preview :email="email" @changeList="changeList" @selected="select"/>

            </tr>
        </tbody>
        </table>
    </section>
`,
    components: {
        emailService,
        emailPreview,
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
            router.push(email.id)
            this.$emit("selected", email);
        },
        changeList(){
            this.$emit("changeList");

        }
    },
    computed: {

    },
}