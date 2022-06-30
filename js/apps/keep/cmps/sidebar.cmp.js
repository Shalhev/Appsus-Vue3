export default {
    template: `
         <section class="side-bar">
            <nav class="side-bar-nav">
                <router-link to="/keep/notes">
                    <span class="fa">&#xf0c6;</span>
                     <span class="sidebar-txt">Notes</span>
                    </router-link> 
                 <router-link to="/keep/bin">
                     <span class="fa">&#xf014;</span>
                 <span class="sidebar-txt">Trash</span>
                 </router-link> 
                 <router-link to="/keep/archive">
                     <span class="fa">&#xf187;</span>
                 <span class="sidebar-txt">Archive</span>
                 </router-link> 
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