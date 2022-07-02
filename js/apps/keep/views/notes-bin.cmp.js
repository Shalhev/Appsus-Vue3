import newNote from "../cmps/newNote.cmp.js"
import noteImg from '../cmps/note-img.cmp.js'
import noteTodos from '../cmps/note-todos.cmp.js'
import noteTxt from '../cmps/note-txt.cmp.js'
import noteVideo from '../cmps/note-video.cmp.js'
import noteBtns from '../cmps/note-btns.cmp.js'

export default {
    template: `
   <section class="notes-list">
            <div class="notes-top-container bin-top-container">
                  <h2>Your Deleted Notes</h2>
                  <button class="empty-bin" @click="emptyBin">Empty bin</button>
            </div>
            <div class="notes-container">
                <div v-if="notes" v-for="note in binnedNotes" :key="note.id" class="note-container">
                        <component :is="note.type" class="note" :style="note.style"
                        :note="note" @update-note="updateNote">
                    </component>
                    <note-btns :note="note"  @bin-note="unbinNote" @delete-note="deleteNote" />
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
        unbinNote(noteId) {
            this.$emit('bin', noteId)
        },
        deleteNote(noteId) {
            this.$emit('delete', noteId)
        },
        emptyBin() {
            this.$emit('empty-bin', this.notes)
        },
        updateNote(note) {
            this.$emit('update', note)
        }
    },
    computed: {
        binnedNotes() {
            return this.notes.filter(note => note.isBin)
        }
    },
    unmounted() { },
};