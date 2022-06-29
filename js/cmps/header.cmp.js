export default {
    template: `
    <section class="app-header">
        <div class="logo">
            <span class="logo-blue">A</span>
            <span class="logo-red">p</span>
            <span class="logo-yellow">p</span>
            <span class="logo-blue">s</span>
            <span class="logo-green">u</span>
            <span class="logo-red">s</span>
            </div>
        <nav class="nav-bar">
            <router-link to="/">Home</router-link> |
            <router-link to="/mail">Mail</router-link> |
            <router-link to="/keep">Keep</router-link>
            <!-- <router-link to="/books">Books</router-link> -->
        </nav>
    </section>
`,
    data() {
        return {};
    },
    created() { },
    methods: {},
    computed: {},
    unmounted() { },
};