export default {
    template: `
<article class="note-todos" >
    <h2>{{info.label}}</h2>
    <ul class="tasks-list">
        <li v-for="task in info.todos">
            {{task.txt}}
        </li>

    </ul>
</article>
`,
    props: ['info'],
    data() {
        return {
        };
    },
    created() {
    },
    methods: {},
    computed: {},
    unmounted() { },
};