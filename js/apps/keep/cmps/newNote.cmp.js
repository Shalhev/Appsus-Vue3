import { keepService } from '../service/keep.service.js'
export default {
    template: `
    <section class="new-note">
        <div class="note-control">
            <div v-if="note.type==='note-txt'">
                <input type="text" placeholder="Take a note..." v-model="note.info.txt">
            </div>
            <div v-if="note.type==='note-img'"> 
                <input type="text" placeholder="Enter image url..." v-model="note.info.url">
                <input type="text" placeholder="Enter image title..." v-model="note.info.title">
            </div>
            <div v-if="note.type==='note-todos'">
                <input type="text" placeholder="Enter todos title" v-model="note.info.label">
                <input type="text" placeholder="tasks separated by ','" v-model="note.info.todos">
            </div>
            <div v-if="note.type==='note-video'">
                <input type="text" placeholder="Enter video url..." v-model="note.info.videoUrl">
            </div>

            <div class="note-type-select">
                <button data-type='note-txt' @click="setType($event)">Txt</button>
                <button data-type='note-img' @click="setType($event)">img</button>
                <button data-type='note-video' @click="setType($event)">video</button>
                <button data-type='note-todos' @click="setType($event)">todos</button>
                <input type="color" v-model="note.style.backgroundColor">
            </div>
            <button @click="save">Save</button>
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
                this.note=keepService.getEmptyNote()
            }
        },
        setType(e) {
            this.note.type = e.target.dataset.type
        },
    },
    computed: {},
    unmounted() { },
};

    // {
    //     type: 'note-txt',
    //     isPinned: false,
    //     info: {
    //         txt: null,
    //         url: null,
    // videoUrl:null,
    //         title: null,
    //         label: null,
    //         todos: null,
    //     },
    //     style: {
    //         backgroundColor: "#00d"
    //     }
    // }