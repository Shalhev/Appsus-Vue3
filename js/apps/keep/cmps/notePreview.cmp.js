import noteImg from './note-img.cmp.js'
import noteTodos from './note-todos.cmp.js'
import noteTxt from './note-txt.cmp.js'
import noteVideo from './note-video.cmp.js'
import noteBtns from './note-btns.cmp.js'
import noteLabels from './note-labels.cmp.js'

export default {
    template: `
        <component :is="note.type" class="note" :style="note.style" :note="note" @update-note="updateNote" />
        <note-btns :note="note" @toggle-pin="togglePin" @bin-note="binNote" @archive-note="archiveNote" 
         @set-edit-note="setNoteToEdit"/>
         <note-labels :note="note" @update-note="updateNote" @filter-by-label="filterByLabel"/>
`,
    props: ['note'],
    emits: ['update-note', 'toggle-pin', 'bin-note', 'archive-note', 'set-note-to-edit', 'filter-by-label'],
    components: {
         noteImg, noteTodos, noteVideo, noteTxt, noteBtns, noteLabels
    },
    data() {
        return {};
    },
    created() {
    },
    methods: {
        updateNote() {
            this.$emit('update-note', this.note)
        },
        togglePin() {
            this.$emit('toggle-pin', this.note.id)
        },
        binNote() {
            this.$emit('bin-note', this.note.id)
        },
        archiveNote() {
            this.$emit('archive-note', this.note.id)
        },
        setNoteToEdit() {
            this.$emit('set-note-to-edit', this.note)
        },
        filterByLabel(label) {
            this.$emit('filter-by-label', label)
        }
    },
    computed: {},
    unmounted() { },
};



