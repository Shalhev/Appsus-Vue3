import { router } from "../../../router.js";

export default {
    template: `
    <section class="side-bar">
            <button class="btn-compose" @click="composeEmail">
                <span class="compose">Compose</span></button>
            <div class="btn btn-inbox" @click="setFilter('inbox')">
                <span class="btn-img img"></span>
                <span class="inbox">Inbox</span></div>
            <div class="btn btn-starred" @click="setFilter('starred')">
                <span class="btn-img img"></span>
                <span class="starred">Starred</span></div>
            <div class="btn btn-important" @click="setFilter('important')">
                <span class="btn-img img"></span>
                <span class="important">Important</span></div>
            <div class="btn btn-sent" @click="setFilter('sent')">
                <span class="btn-img img"></span>
                <span class="sent">Sent</span></div>
            <div class="btn btn-draft" @click="setFilter('draft')">
                <span class="btn-img img"></span>
                <span class="draft">Drafts</span></div>
            <div class="btn btn-bin" @click="setFilter('bin')">
                <span class="btn-img img"></span>
                <span class="bin">Bin</span></div>

    </section>
`,
    data() {
        return {};
    },
    created() { },
    methods: {
        setFilter(filter){
            this.$emit('filtered', filter)
            router.push(`/mail/filter/${filter}`)
        },
        composeEmail(){
            this.$emit('composeEmail')
        }
    },
    computed: {},
    unmounted() { },
};