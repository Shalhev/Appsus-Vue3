import { keepService } from "../service/keep.service.js";

export default {
    template: `
        <ul class="labels-container">
            <li> <button class="fa add-label" @click="addLabel">&#xf055;</button></li>
            <li v-for="(label,idx) in shownNote.info.labels" :key="idx">
                <span class="label" @click="filterByLabel($event)">{{label}} </span>
                <button @click="removeLabel(idx)" class="fa remove-label">&#xf057;</button>
            </li>
        </ul>
        <div v-show="adding" class="add-label-modal">
            <input ref="labelModal" type="text" maxlength="20" placeholder="enter label" @blur="saveLabel($event)">
        </div>
`, props: ['note'],
    emits: ['filter-by-label'],
    data() {
        return {
            shownNote: this.note,
            adding: false,
        };
    },
    created() {
    },
    methods: {
        updateNote() {
            keepService.updateNote(this.note).then(note => this.shownNote = note)
        },
        removeLabel(labelIdx) {
            this.shownNote.info.labels.splice(labelIdx, 1);
            this.updateNote()
        },
        addLabel() {
            this.adding = true;
            setTimeout(() => this.$refs.labelModal.focus(), 300)
        },
        saveLabel(ev) {
            if (!this.shownNote.info.labels) this.shownNote.info.labels = []
            const label = ev.target.value
            if (label) {
                this.shownNote.info.labels.unshift(label.trim())
                this.updateNote()
            }
            ev.target.value = ''
            this.adding = false
        },
        filterByLabel(ev) {
            const label = ev.target.innerText
            this.$emit('filter-by-label', label)
        }

    },
    computed: {},
    unmounted() { },
};