import { keepService } from "../service/keep.service.js";

export default {
    template: `
<article class="note-todos" >
    <h2 @blur="updateNote" ref="title" contentEditable="true" spellcheck="false">  {{note.info.title}}</h2>
    <ul class="tasks-list">
        <li v-for="(task,idx) in tasks">
            <div class="task">
                <span class="task-txt" @click=markAsDone(note.id,idx) :class={crossed:task.isDone}>{{task.txt}}</span>
                <span class="remove-task fa" @click="removeTask(note.id,idx)">&#xf00d;</span>
            </div>
        </li>

    </ul>
</article>
`,
    props: ['note'],
    data() {
        return {
            tasks: this.note.info.todos
        };
    },
    created() {
    },
    methods: {
        markAsDone(noteId, taskIdx) {
            keepService.toggleDoneTask(noteId, taskIdx).then(note => this.tasks = note.info.todos)
        },
        removeTask(noteId, taskIdx) {
            keepService.removeTask(noteId, taskIdx).then(note => this.tasks = note.info.todos)
        },
        updateNote() {
            this.note.info.title = this.$refs.title.innerText
            this.$emit('update-note', this.note)
        }
    },
    computed: {},
    unmounted() { },
};