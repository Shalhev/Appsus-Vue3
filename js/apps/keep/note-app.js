import { keepService } from "./service/keep.service.js";
import sideBar from "./cmps/notesList.cmp.js";
import notesList from "./cmps/sidebar.cmp.js";

export default {
    template: `
    <main class="keep-app">
        <notes-list :notes="notes"/>
        <side-bar/>
    </main>
`, components: {
        sideBar,
        notesList,
    },
    data() {
        return {
        };
    },
    created() {
    },
    methods: {
    },
    computed: {},
    unmounted() { },
};