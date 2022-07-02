import newNote from "../cmps/newNote.cmp.js"
import noteImg from '../cmps/note-img.cmp.js'
import noteTodos from '../cmps/note-todos.cmp.js'
import noteTxt from '../cmps/note-txt.cmp.js'
import noteVideo from '../cmps/note-video.cmp.js'
import noteBtns from '../cmps/note-btns.cmp.js'
import noteLabels from '../cmps/note-labels.cmp.js'

export default {
    template: `

<section class="notes-list">
    <div id="screen" :class="{show:noteToEdit!==null}" @click="noteToEdit=null"></div>
    <div v-if="!selectedLabel" class="notes-top-container">
        <new-note v-if="noteTaking" @save-note="saveNote"/>
        <input v-else type="text" class="shrinked-note-input" placeholder="Take a note..." @click="noteTaking=true">
    </div>
    <div v-if="notes" class="notes-container" @click="noteTaking=false">
        <new-note v-if="noteToEdit" :editedNote="noteToEdit" @save-note="saveNote" @update-note="updateNote"
            class="edit-modal" />
        <div v-show="selectedLabel" class="filtered-by-label">
            <article v-for="note in filteredByLable" :key="note.id" class="note-container"
                @mouseover="note.isEdit=true" @mouseleave="note.isEdit=false">
                <component :is="note.type" class="note" :style="note.style" :note="note" @update-note="updateNote" />
                <note-labels :note="note" @update-note="updateNote" @filter-by-label="filterByLabel"/>
                <note-btns :note="note" @toggle-pin="togglePin" @bin-note="binNote" @archive-note="archiveNote" 
                @set-edit-note="setNoteToEdit"/>
            </article>
            <button @click="selectedLabel=null">All</button>
        </div>
        <article v-show="pinnedNotes && !selectedLabel" v-for="note in pinnedNotes" :key="note.id" class="note-container"
            @mouseover="note.isEdit=true" @mouseleave="note.isEdit=false">
            <component :is="note.type" class="note pinned" :style="note.style" :note="note" @update-note="updateNote" />
            <note-labels :note="note" @update-note="updateNote" @filter-by-label="filterByLabel"/>
            <note-btns :note="note" @toggle-pin="togglePin" @bin-note="binNote" @archive-note="archiveNote" 
             @set-edit-note="setNoteToEdit"/>
        </article>

        <div v-show="pinnedNotes.length &&!selectedLabel" class="pinned-seperator">
            <span class="fa">&#xf08d;</span> pinned
            <hr>other
        </div>

        <article v-if="otherNotes&&!selectedLabel" v-for="note, in otherNotes" :key="note.id" class="note-container"
            @mouseover="note.isEdit=true" @mouseleave="note.isEdit=false">
            <component :is="note.type" class="note" :style="note.style" :note="note" @update-note="updateNote" />
            <note-btns :note="note" @toggle-pin="togglePin" @bin-note="binNote" @archive-note="archiveNote" 
             @set-edit-note="setNoteToEdit"/>
             <note-labels :note="note" @update-note="updateNote" @filter-by-label="filterByLabel"/>
        </article>
    </div>
</section>
`,
    props: ['notes'],
    components: {
        newNote, noteImg, noteTodos, noteVideo, noteTxt, noteBtns, noteLabels
    },
    data() {
        return {
            noteTaking: false,
            noteToEdit: null,
            selectedLabel: null
        };
    },
    created() {
    },
    methods: {
        togglePin(noteId) {
            this.$emit('pin', noteId)
            console.log(JSON.stringify(this.notes))
        },
        binNote(noteId) {
            this.$emit('bin', noteId)
        },
        archiveNote(noteId) {
            this.$emit('archive', noteId)
        },
        saveNote(note) {
            this.noteTaking = false
            this.$emit('save', note)
        },
        updateNote(note) {
            this.$emit('update', note)
            this.cmKey++
        },
        setNoteToEdit(note) {
            this.noteToEdit = note;
        },
        filterByLabel(label) {
            this.selectedLabel = label
        }
    },
    computed: {
        displayNotes() {
            return this.notes.filter(note => !note.isBin && !note.isArch)
        },
        filteredByLable() {
            return this.displayNotes.filter(note => note.info.labels &&
                note.info.labels.includes(this.selectedLabel))
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