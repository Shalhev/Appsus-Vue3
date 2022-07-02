import { router } from '../../router.js';
import { keepService } from "./service/keep.service.js";
import sideBar from "./cmps/sidebar.cmp.js";
import notesList from "./views/notesList.cmp.js";

export default {
    template: `
    <main class="keep-app">
        <side-bar/>
        <router-view :notes="notes" @pin="togglePin" @bin="binNote"
        @archive="archiveNote" @save="saveNote" @update="updateNote" 
        @delete="deleteNote" @empty-bin="emptyBin" :key='cmpKey'/>
    </main>
`
    , components: {
        sideBar,
        notesList,
    },
    data() {
        return {
            notes: null,
            cmpKey: 0,
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
        updateNote(note) {
            keepService.updateNote(note).then(notes => this.notes = notes)
            this.cmpKey++
        },
        deleteNote(noteId) {
            keepService.removeNote(noteId).then(notes => this.notes = notes)
        },
        emptyBin(notes) {
            keepService.emptyBin(notes).then(updtdNotes => this.notes = updtdNotes)
        }
    },
    computed: {},
    mounted() {
        router.push('/keep/notes')
    },
    unmounted() { },
};