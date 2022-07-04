import { keepService } from "../service/keep.service.js";

export default {
    template: `
         <div v-if="note.isEdit || !isPrimary">
                <div v-if="isPrimary" class="note-edit">
                    <button @click="togglePin" class="fa" title="pin/unpin"
                        :class="{pinned:note.isPinned}">&#xf08d;</button>
                    <button @click="setNoteToEdit" class="fa" title="edit">&#xf044;</button>
                    <button @click="archiveNote" class="fa" title="archive">&#xf187;</button>
                    <button @click="binNote" class="fa" title="move to bin">&#xf014;</button>
                </div>
                <div v-else class="note-edit">
                    <button @click="restoreNote" title="restore" class="fa">&#xf0c7;</button>
                    <button @click="binNote" title="remove" class="fa">&#xf014;</button>
                </div>
         </div>

`,
    props: ['note'],
    data() {
        return {
            shownNote: this.note,
            isPrimary: true,
        };
    },
    created() {
        if (this.note.isBin || this.note.isArch) this.isPrimary = false
    },
    methods: {
        updateNote() {
            keepService.updateNote(this.note).then(note => this.shownNote = note)
        },
        togglePin() {
            this.shownNote.isPinned = !this.shownNote.isPinned
            this.updateNote()
        },
        archiveNote() {
            this.shownNote.isArch = !this.shownNote.isArch
            this.updateNote()
        },
        binNote() {
            if (this.note.isBin) this.$emit('delete-note', this.note.id)
            else {
                this.shownNote.isBin = !this.shownNote.isBin
                this.updateNote()
            }
        },
        restoreNote() {
            if (this.note.isBin) this.shownNote.isBin = !this.shownNote.isBin
            else this.shownNote.isArch = !this.shownNote.isArch
            this.updateNote()
        },
        setNoteToEdit() {
            this.$emit('set-edit-note', this.note)
        },
    },
    computed: {},
    unmounted() { },
};