export default {
    template: `
         <section class="side-bar" @mouseover="isHover=true" 
         @mouseleave="isHover=false" :class={hovered:isHover}>
            <nav class="side-bar-nav">
                <router-link to="/keep/notes">
                    <span class="fa">&#xf0c6;</span>
                     <span v-if="isHover" class="sidebar-txt">Notes</span>
                    </router-link> 
                 <router-link to="/keep/bin">
                     <span class="fa">&#xf014;</span>
                 <span v-if="isHover" class="sidebar-txt">Trash</span>
                 </router-link> 
                 <router-link to="/keep/archive">
                     <span class="fa">&#xf187;</span>
                 <span v-if="isHover" class="sidebar-txt">Archive</span>
                 </router-link> 
            </nav>
        </section>
`,
    data() {
        return {
            isHover: false,
        };
    },
    created() { },
    methods: {},
    computed: {},
    unmounted() { },
};