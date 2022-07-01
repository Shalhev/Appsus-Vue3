import newNote from "../cmps/newNote.cmp.js"
import noteImg from '../cmps/note-img.cmp.js'
import noteTodos from '../cmps/note-todos.cmp.js'
import noteTxt from '../cmps/note-txt.cmp.js'
import noteVideo from '../cmps/note-video.cmp.js'

export default {
    template: `
<section class="notes-list">
    <div id="screen" :class="{show:noteToEdit!==null}" @click="noteToEdit=null"></div>
    <div class="notes-top-container">
        <new-note v-if="noteTaking" @save-note="saveNote" />
        <input v-else type="text" class="shrinked-note-input" placeholder="Take a note..." @click="noteTaking=true">
    </div>
    <div v-if="notes" class="notes-container" @click="noteTaking=false">
        <new-note v-if="noteToEdit" :editedNote="noteToEdit" @save-note="saveNote" @update-note="updateNote"
            class="edit-modal" />

        <article v-show="pinnedNotes" v-for="note, in pinnedNotes" :key="note.id" class="note-container"
            @mouseover="note.isEdit=true" @mouseleave="note.isEdit=false">
            <component :is="note.type" class="note pinned" :style="note.style" :note="note" @update-note="updateNote"/>
            <div v-if="note.isEdit" class="note-edit">
                <button @click="togglePin(note.id)" class="fa" title="pin/unpin"
                    :class="{pinned:note.isPinned}">&#xf08d;</button>
                <button @click="noteToEdit=note" class="fa" title="edit">&#xf044;</button>
                <button @click="archiveNote(note.id)" class="fa" title="archive">&#xf187;</button>
                <button @click="binNote(note.id)" class="fa" title="move to bin">&#xf014;</button>
            </div>
        </article>

        <div v-show="pinnedNotes.length" class="pinned-seperator">
            <span class="fa">&#xf08d;</span> pinned
            <hr>
            other
        </div>

        <article v-if="otherNotes" v-for="note, in otherNotes" :key="note.id" class="note-container"
            @mouseover="note.isEdit=true" @mouseleave="note.isEdit=false">
            <component :is="note.type" class="note" :style="note.style" :note="note" @update-note="updateNote" />
            <div v-if="note.isEdit" class="note-edit">
                <button @click="togglePin(note.id)" class="fa" title="pin/unpin"
                    :class="{pinned:note.isPinned}">&#xf08d;</button>
                <button @click="noteToEdit=note" class="fa" title="edit">&#xf044;</button>
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
            noteToEdit: null,
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
        saveNote(note) {
            console.log('saving note', note);
            this.noteTaking = false
            this.$emit('save', note)
        },
        updateNote(note) {
            this.noteToEdit = null
            this.$emit('update', note)
        },
    },
    computed: {
        displayNotes() {
            return this.notes.filter(note => !note.isBin && !note.isArch)
        },
        pinnedNotes() {
            return this.displayNotes.filter(note => note.isPinned)
        },
        otherNotes() {
            return this.displayNotes.filter(note => !note.isPinned)
        },
    },
    unmounted() { },
};