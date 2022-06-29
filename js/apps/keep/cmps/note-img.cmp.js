export default {
    template: `
<article class="note-img">
    <img :src="info.url" alt="note-img">
    <p>{{info.title}}</p>
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
};