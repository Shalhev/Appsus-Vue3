import newNote from "../cmps/newNote.cmp.js"
import noteImg from '../cmps/note-img.cmp.js'
import noteTodos from '../cmps/note-todos.cmp.js'
import noteTxt from '../cmps/note-txt.cmp.js'
import noteVideo from '../cmps/note-video.cmp.js'

export default {
    template: `
   <section class="notes-list">
            <div class="notes-top-container">
                  <h2>Your Deleted Notes</h2>
            </div>
            <div class="notes-container">
                <div v-if="notes" v-for="note in binnedNotes" :key="note.id" class="note-container">
                        <component :is="note.type" class="note"
                        :style="note.style"
                        :info="note.info">
                    </component>
                    <div class="note-edit">
                        <button @click="unbinNote(note.id)" title="restore" class="fa">&#xf0c7;</button>
                        <button @click="deleteNote(note.id)" title="delete forever" class="fa">&#xf00d;</button>
                    </div>
                </div>
            </div>
    </section>
`, props: ['notes'],
    components: {
        newNote, noteImg, noteTodos, noteVideo, noteTxt
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
        }
    },
    computed: {
        binnedNotes() {
            return this.notes.filter(note => note.isBin)
        }
    },
    unmounted() { },
};