export default {
    template: `
<article class="note-img">
    <img :src="note.info.url" alt="note-img">
    <p>{{note.info.title}}</p>
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
};