import { keepService } from "../service/keep.service.js";
import noteImg from './note-img.cmp.js'
import noteTodos from './note-todos.cmp.js'
import noteTxt from './note-txt.cmp.js'
import noteVideo from './note-video.cmp.js'
import noteBtns from './note-btns.cmp.js'
import noteLabels from './note-labels.cmp.js'

export default {
    template: `
        <component :is="note.type" class="note" :style="note.style" :note="showedNote" @update-note="updateNote" />
        <note-btns :note="showedNote" @set-edit-note="setNoteToEdit" @delete-note="deleteNote"/>
         <note-labels :note="showedNote" @filter-by-label="filterByLabel"/>
`,
    props: ['note'],
    emits: ['set-note-to-edit', 'filter-by-label', 'delete-note'],
    components: {
        noteImg, noteTodos, noteVideo, noteTxt, noteBtns, noteLabels
    },
    data() {
        return {
            showedNote: this.note
        };
    },
    created() {
    },
    methods: {
        deleteNote(noteId) {
            this.$emit('delete-note', noteId)
        },
        updateNote(note) {
            keepService.updateNote(note).then(note=>this.showedNote=note)
        },
        setNoteToEdit(note) {
            this.$emit('set-note-to-edit', note)
        },
        filterByLabel(label) {
            this.$emit('filter-by-label', label)
        }
    },
    computed: {},
    unmounted() { },
};



