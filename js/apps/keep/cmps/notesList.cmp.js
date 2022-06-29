import { keepService } from "../service/keep.service.js";
import newNote from "./newNote.cmp.js";
import noteImg from './note-img.cmp.js'
import noteTodos from './note-todos.cmp.js'
import noteTxt from './note-txt.cmp.js'
import noteVideo from './note-video.cmp.js'

export default {
    template: `
    <section class="notes-list">
        <new-note @save-note="saveNote"/>
            <div v-for="(note,idx) in notes" :key="note.id" class="note-container">
                    <component :is="note.type" class="note"
                    :style="note.style"
                    :info="note.info">
                </component>
            </div>
    </section>
  ˝˝
`,
    components: {
        newNote, noteImg, noteTodos, noteVideo, noteTxt
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
        saveNote(note) {
            keepService.addNote(note).then(notes => this.notes = notes)
        },

    },
    computed: {
    },
    unmounted() { },
};