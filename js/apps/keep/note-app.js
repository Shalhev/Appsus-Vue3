import { router } from '../../router.js';
import { keepService } from "./service/keep.service.js";
import sideBar from "./cmps/sidebar.cmp.js";
import notesList from "./views/notesList.cmp.js";

export default {
    template: `
    <main class="keep-app">
        <side-bar/>
        <router-view :notes="notes" @pin="togglePin" @bin="binNote"
        @archive="archiveNote" @save="saveNote" @delete="deleteNote" />
    </main>
`
    , components: {
        sideBar,
        notesList,
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
        togglePin(noteId) {
            keepService.togglePinNote(noteId).then(notes => this.notes = notes)
            this.$emit('pin')
        },
        binNote(noteId) {
            keepService.toggleBinNote(noteId).then(notes => this.notes = notes)
        },
        archiveNote(noteId) {
            keepService.toggleArchNote(noteId).then(notes => this.notes = notes)
        },
        saveNote(note) {
            keepService.addNote(note).then(notes => this.notes = notes)
        },
        deleteNote(noteId) {
            keepService.removeNote(noteId).then(notes => this.notes = notes)
        },
    },
    computed: {},
    mounted() {
        router.push('/keep/notes')
    },
    unmounted() { },
};