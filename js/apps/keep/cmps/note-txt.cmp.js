export default {
    template: `
<article class='note-txt'>
    <h3>{{note.info.title}}</h3>
    <p >{{note.info.txt}}</p>
</article>
`,
    props: ['note'],
    data() {
        return {};
    },
    created() { },
    methods: {},
    computed: {},
    unmounted() { },
}