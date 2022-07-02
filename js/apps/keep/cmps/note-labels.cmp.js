export default {
    template: `
        <ul class="labels-container">
            <li> <button class="fa add-label" @click="addLabel">&#xf055;</button></li>
            <li v-for="(label,idx) in labels" :key="idx">
                <span class="label" @click="filterByLabel($event)">{{label}} </span>
                <button @click="removeLabel(idx)" class="fa remove-label">&#xf057;</button>
            </li>
        </ul>
        <div v-show="adding" class="add-label-modal">
            <input ref="labelModal" type="text" maxlength="10" placeholder="enter label" @blur="saveLabel($event)">
        </div>
`, props: ['note'],
    emits: ['update-note', 'filter-by-label'],
    data() {
        return {
            labels: this.note.info.labels,
            adding: false,
        };
    },
    created() {
    },
    methods: {
        removeLabel(labelIdx) {
            this.note.info.labels.splice(labelIdx, 1);
            this.$emit('update-note', this.note)
        },
        addLabel() {
            this.adding = true;
            setTimeout(() => this.$refs.labelModal.focus(), 100)
        },
        saveLabel(ev) {
            if (!this.note.info.labels) this.note.info.labels = []
            const label = ev.target.value
            if (label) {
                this.note.info.labels.unshift(label.trim())
                this.$emit('update-note', this.note)
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