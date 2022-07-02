import newNote from "../cmps/newNote.cmp.js"
import noteImg from '../cmps/note-img.cmp.js'
import noteTodos from '../cmps/note-todos.cmp.js'
import noteTxt from '../cmps/note-txt.cmp.js'
import noteVideo from '../cmps/note-video.cmp.js'
import noteBtns from '../cmps/note-btns.cmp.js'

export default {
    template: `
   <section class="notes-list">
            <div class="notes-top-container">
                  <h2>Your Archived Notes</h2>
            </div>
            <div class="notes-container">
                <div v-if="notes" v-for="note in archNotes" :key="note.id" class="note-container">
                        <component :is="note.type" class="note"
                        :style="note.style" :note="note" @update-note="updateNote"> </component>
                        <note-btns :note="note"  @bin-note="binNote" @archive-note="unarchNote" />
                </div>
            </div>
    </section>
`, props: ['notes'],
    components: {
        newNote, noteImg, noteTodos, noteVideo, noteTxt, noteBtns
    },
    data() {
        return {};
    },
    created() {
    },
    methods: {
        unarchNote(noteId) {
            this.$emit('archive', noteId)
        },
        binNote(noteId) {
            this.$emit('bin', noteId)
        },
        updateNote(note) {
            this.$emit('update', note)
        }
    },
    computed: {
        archNotes() {
            return this.notes.filter(note => !note.isBin && note.isArch)
        }
    },
    unmounted() { },
};