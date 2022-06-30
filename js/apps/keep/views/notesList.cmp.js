import newNote from "../cmps/newNote.cmp.js"
import noteImg from '../cmps/note-img.cmp.js'
import noteTodos from '../cmps/note-todos.cmp.js'
import noteTxt from '../cmps/note-txt.cmp.js'
import noteVideo from '../cmps/note-video.cmp.js'

export default {
    template: `
 <section class="notes-list">
    <div class="notes-top-container">
        <new-note v-if="noteTaking" @save-note="saveNote" />
        <input v-else type="text" class="shrinked-note-input" placeholder="Take a note..." @click="noteTaking=true">
    </div>
    <div class="notes-container" @click="noteTaking=false">
        <article v-if="notes" v-for="note, in orderedNotes" :key="note.id" class="note-container"
            @mouseover="note.isEdit=true" @mouseleave="note.isEdit=false" @click="showEditModal">
            <component :is="note.type" class="note" :style="note.style" :note="note"></component>
            <div v-if="note.isEdit" class="note-edit">
                <button @click="togglePin(note.id)" class="fa" title="pin/unpin"
                    :class="{pinned:note.isPinned}">&#xf08d;</button>
                <button @click="archiveNote(note.id)" class="fa" title="archive">&#xf187;</button>
                <button @click="binNote(note.id)" class="fa" title="move to bin">&#xf014;</button>
            </div>
        </article>
    </div>
</section>
`,
    props: ['notes'],
    components: {
        newNote, noteImg, noteTodos, noteVideo, noteTxt
    },
    data() {
        return {
            noteTaking: false,
        };
    },
    created() {
    },
    methods: {
        togglePin(noteId) {
            this.$emit('pin', noteId)
        },
        binNote(noteId) {
            this.$emit('bin', noteId)
        },
        archiveNote(noteId) {
            this.$emit('archive', noteId)
        },
        saveNote(noteId) {
            this.noteTaking = false
            this.$emit('save', noteId)
        },
        showEditModal(){
            console.log('now editing');
        }
    },
    computed: {
        orderedNotes() {
            const pinned = []
            const notPinned = []
            this.notes.forEach(note => {
                if (note.isBin || note.isArch) return
                note.isPinned ? pinned.push(note) : notPinned.push(note)
            })
            return [...pinned, ...notPinned]
        }
    },
    unmounted() { },
};