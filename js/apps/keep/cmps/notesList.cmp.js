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
            <div v-for="(note,idx) in orderedNotes" :key="note.id" class="note-container">
                    <component :is="note.type" class="note"
                    :style="note.style"
                    :info="note.info">
                </component>
                <div class="note-edit">
                    <button @click="pinNote(note.id)" class="fa" :class="{pinned:note.isPinned}">&#xf08d;</button>
                    <button @click="deleteNote(note.id)" class="fa">&#xf014;</button>
                </div>
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
        deleteNote(noteId) {
            keepService.removeNote(noteId).then(notes => this.notes = notes)
        },
        pinNote(noteId) {
            keepService.togglePinNote(noteId).then(notes => this.notes = notes)
        }

    },
    computed: {
        orderedNotes() {
            if(!this.notes) return
            const pinned = []
            const notPinned = []
            this.notes.forEach(note => {
                if (note.isPinned) pinned.push(note)
                else notPinned.push(note)
            })
            return [...pinned, ...notPinned]
        }
    },
    unmounted() { },
};