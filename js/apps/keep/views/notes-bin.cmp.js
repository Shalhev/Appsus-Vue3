import { keepService } from "../service/keep.service.js";
import notePreview from "../cmps/note-preview.cmp.js"

export default {
    template: `
   <section class="notes-list">
            <div class="notes-top-container bin-top-container">
                  <h2>Your Deleted Notes</h2>
                  <button class="empty-bin" @click="emptyBin">Empty bin</button>
            </div>
            <div class="notes-container">
                <div v-if="allNotes" v-for="note in binnedNotes" :key="note.id" class="note-container">
                    <note-preview :note="note" @delete-note="deleteNote"/>
                </div>
            </div>
    </section>
`, props: ['notes'],
    components: { notePreview },
    data() {
        return {
            allNotes: this.notes
        };
    },
    created() {
        console.log(this.allNotes);
    },
    methods: {
        deleteNote(noteId) {
            this.allNotes = this.allNotes.filter(note => note.id !== noteId)
            keepService.removeNote(noteId)
        },
        emptyBin() {
            this.allNotes = null
            keepService.emptyBin(this.notes)
        },
    },
    computed: {
        binnedNotes() {
            return this.allNotes.filter(note => note.isBin)
        }
    },
    unmounted() { },
};