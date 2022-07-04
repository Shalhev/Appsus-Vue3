import { keepService } from "../service/keep.service.js";
import notePreview from "../cmps/note-preview.cmp.js"

export default {
    template: `
   <section class="notes-list">
            <div class="notes-top-container">
                  <h2>Your Archived Notes</h2>
            </div>
            <div class="notes-container">
                <article v-if="notes" v-for="note in archNotes" :key="note.id" class="note-container">
                    <note-preview :note="note"/>
                </article>
            </div>
    </section>
`, props: ['notes'],
    components: { notePreview },
    data() {
        return {};
    },
    created() {
    },
    methods: {
    },
    computed: {
        archNotes() {
            return this.notes.filter(note => !note.isBin && note.isArch)
        }
    },
    unmounted() { },
};