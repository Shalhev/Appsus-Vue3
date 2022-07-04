import { keepService } from "../service/keep.service.js";

export default {
    template: `
<article class="note-todos" >
    <h2 @blur="updateNote" ref="title" contentEditable="true" spellcheck="false">  {{note.info.title}}</h2>
    <ul class="tasks-list">
        <li v-for="(task,idx) in todosNote.info.todos">
            <div class="task">
                <span class="task-txt" @click=markAsDone(idx) :class={crossed:task.isDone}>{{task.txt}}</span>
                <span class="remove-task fa" @click="removeTask(idx)">&#xf00d;</span>
            </div>
        </li>

    </ul>
</article>
`,
    props: ['note'],
    data() {
        return {
            todosNote:this.note
        };
    },
    created() {
    },
    methods: {
        updateNote() {
            this.note.info.title = this.$refs.title.innerText
            this.$emit('update-note', this.note)
        },
        markAsDone(idx) {
            this.todosNote.info.todos[idx].isDone = !this.todosNote.info.todos[idx].isDone
            this.$emit('update-note', this.note)
            // keepService.toggleDoneTask(noteId, taskIdx).then(note => this.todosNote = note)
        },
        removeTask(idx) {
            this.todosNote.info.todos.splice(idx, 1)
            this.$emit('update-note', this.note)
        },
    },
    computed: {},
    unmounted() { },
};