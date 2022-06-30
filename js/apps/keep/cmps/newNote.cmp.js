import { keepService } from '../service/keep.service.js'
export default {
    template: `
    <section class="new-note">
        <div class="note-control">
            <div v-if="note.type==='note-txt'" class="new-note-inputs">
                <input ref="txtInput" type="text" placeholder="Title" v-model="note.info.title">
                <input type="text" placeholder="Take a note..." v-model="note.info.txt">
            </div>
            <div v-if="note.type==='note-img'" class="new-note-inputs"> 
                <input type="text" placeholder=" Title" v-model="note.info.title">
                <input type="text" placeholder="Enter image url..." v-model="note.info.url">
            </div>
            <div v-if="note.type==='note-todos'" class="new-note-inputs">
                <input type="text" placeholder="Enter todos title" v-model="note.info.label">
                <input type="text" placeholder="tasks separated by ','" v-model="note.info.todos">
            </div>
            <div v-if="note.type==='note-video'" class="new-note-inputs">
                <input type="text" placeholder="Enter video url..." v-model="note.info.videoUrl">
            </div>

            <div class="note-type-select">
                <button data-type='note-txt' @click="setType($event)" class="fa">&#xf040;</button>
                <button data-type='note-img' @click="setType($event)" class="fa">&#xf03e;</button>
                <button data-type='note-video' @click="setType($event)" class="fa">&#xf166;</button>
                <button data-type='note-todos' @click="setType($event)" class="fa">&#xf03a;</button>
                <input type="color" v-model="note.style.backgroundColor">
            </div>
            <div class="new-note-bottom">
                <button @click="save" class="fa">&#xf0c7;</button>
            </div>
        </div>
    </section>
`,

    data() {
        return {
            note: null,
        };
    },
    created() {
        this.note = keepService.getEmptyNote()
    },
    methods: {
        formatTodos(todosStr) {
            const tasks = todosStr.split(',')
            this.note.info.todos = tasks.map(task => {
                return { txt: task, doneAt: null }
            })
        },
        save() {
            if (this.note.info.txt || this.note.info.url || this.note.info.videoUrl || this.note.info.label) {
                if (this.note.info.todos) this.formatTodos(this.note.info.todos)
                this.$emit('save-note', this.note)
                this.note = keepService.getEmptyNote()
            }
        },
        setType(e) {
            this.note.type = e.target.dataset.type
        },
    },
    computed: {},
    mounted() {
        this.$refs.txtInput.focus()
    },
    unmounted() { },
};