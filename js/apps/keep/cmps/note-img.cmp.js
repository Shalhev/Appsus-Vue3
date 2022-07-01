export default {
    template: `
<article class="note-img">
    <img :src="note.info.url" alt="note-img">
    <p @blur="updateNote" ref="title" contentEditable="true" spellcheck="false">{{note.info.title}}</p>
</article>
`,
    props: ['note'],
    data() {
        return {};
    },
    created() { },
    methods: {
        updateNote() {
            this.note.info.title = this.$refs.title.innerText
            this.$emit('update-note', this.note)
        }
    },
    computed: {},
    unmounted() { },
};