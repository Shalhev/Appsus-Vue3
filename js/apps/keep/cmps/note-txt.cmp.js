export default {
    template: `
<article class='note-txt'>
    <h3>{{info.title}}</h3>
    <p>{{info.txt}}</p>
</article>
`,
    props: ['info'],
    data() {
        return {};
    },
    created() { },
    methods: {},
    computed: {},
    unmounted() { },
}