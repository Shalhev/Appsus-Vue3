import { router } from '../../router.js';
import { keepService } from "./service/keep.service.js";
import sideBar from "./cmps/sidebar.cmp.js";

export default {
    template: `
    <main class="keep-app">
        <side-bar/>
        <router-view :notes="notes"/>
    </main>
`
    , components: {
        sideBar,
    },
    data() {
        return {
            notes: null,
        };
    },
    created() {
        keepService.query().then(notes => this.notes = notes)
    },
    methods: {
    },
    computed: {},
    mounted() {
        router.push('/keep/notes')
    },
    unmounted() { },
};