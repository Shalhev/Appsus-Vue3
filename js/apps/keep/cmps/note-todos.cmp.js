export default {
    template: `
<h2>{{info.label}}</h2>
<article class="note-todos" >
    <ul>
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