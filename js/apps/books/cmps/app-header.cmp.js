export default {
    template: `
    <header class="app-header">
       <div class="logo">
           <h3>MISSBOOKS!</h3>
       </div>
       <nav class="nav-bar">
            <router-link to="/">Home</router-link> |
            <router-link to="/book">Books</router-link> |
            <router-link to="/about">About</router-link> |
            <router-link to="/bookadd">Add Book</router-link>
       </nav>
    </header>
   `,
    data() {
        return {
        }
    },
    methods: {},
    computed: {}
}