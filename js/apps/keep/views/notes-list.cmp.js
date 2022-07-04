import { keepService } from "../service/keep.service.js";
import newNote from "../cmps/new-note.cmp.js"
import notePreview from "../cmps/note-preview.cmp.js"

export default {
    template: `
<section class="notes-list">
    <div id="screen" :class="{show:noteToEdit!==null}" @click="noteToEdit=null"></div>
    <div v-if="!selectedLabel" class="notes-top-container">

        <new-note v-if="noteTaking" @save-note="saveNote"/>
        <input v-else type="text" class="shrinked-note-input" placeholder="Take a note..." @click="noteTaking=true">
    </div>

    <div v-if="notes" class="notes-container" @click="noteTaking=false">
        <new-note v-if="noteToEdit" :editedNote="noteToEdit" @save-note="saveNote"
            class="edit-modal"/>
            
        <div v-show="selectedLabel" class="filtered-by-label">
            <article v-for="note in filteredByLabel" :key="note.id" class="note-container"
                @mouseover="note.isEdit=true" @mouseleave="note.isEdit=false">
                <note-preview :note="note" @set-note-to-edit="setNoteToEdit" @filter-by-label="filterByLabel"/>
            </article>
            <button @click="selectedLabel=null">All</button>
        </div>

        <article v-show="pinnedNotes && !selectedLabel" v-for="note in pinnedNotes" :key="note.id" class="note-container"
            @mouseover="note.isEdit=true" @mouseleave="note.isEdit=false">
            <note-preview :note="note" @set-note-to-edit="setNoteToEdit" @filter-by-label="filterByLabel"/>
        </article>

        <div v-show="pinnedNotes.length &&!selectedLabel" class="pinned-seperator">
            <span class="fa">&#xf08d;</span> pinned
            <hr>other
        </div>

        <article v-if="otherNotes&&!selectedLabel" v-for="note, in otherNotes" :key="note.id" class="note-container"
            @mouseover="note.isEdit=true" @mouseleave="note.isEdit=false">
            <note-preview :note="note" @set-note-to-edit="setNoteToEdit" @filter-by-label="filterByLabel"/>
        </article>
    </div>
</section>
`,
    props: ['notes'],
    components: {
        newNote, notePreview
    },
    data() {
        return {
            noteTaking: false,
            noteToEdit: null,
            selectedLabel: null,
        };
    },
    created() {
    },
    methods: {
        setNoteToEdit(note) {
            this.noteToEdit = note;
        },
        filterByLabel(label) {
            this.selectedLabel = label
        },
        saveNote(note) {
            keepService.addNote(note).then(() =>this.notes.unshift(note))
            this.noteTaking = false
        }
    },
    computed: {
        displayNotes() {
            return this.notes.filter(note => !note.isBin && !note.isArch)
        },
        filteredByLabel() {
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