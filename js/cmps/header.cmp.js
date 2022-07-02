export default {
    template: `
    <section class="app-header">
        <div class="logo">
            <a href="#">
            <span class="logo-blue">A</span>
            <span class="logo-red">p</span>
            <span class="logo-yellow">p</span>
            <span class="logo-blue">s</span>
            <span class="logo-green">u</span>
            <span class="logo-red">s</span>
            </a>
            </div>
        <nav class="nav-bar">
            <ul>
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/mail">Mail</router-link></li>
            <li><router-link to="/keep/notes">Keep</router-link></li>
            <!-- <router-link to="/books">Books</router-link> -->
            </ul>
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