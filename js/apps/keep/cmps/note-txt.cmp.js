export default {
    template: `
<article class='note-txt'>
    <h3 @blur="updateNote" ref="title" contentEditable="true" spellcheck="false">{{note.info.title}}</h3>
    <p @blur="updateNote" ref="txt" contentEditable="true" spellcheck="false">{{note.info.txt}}</p>
</article>
`,
    props: ['note'],
    data() {
        return {
        };
    },
    created() {
    },
    methods: {
        updateNote() {
            this.note.info.title = this.$refs.title.innerText
            this.note.info.txt = this.$refs.txt.innerText
            this.$emit('update-note', this.note)
        }
    },
    computed: {},
    unmounted() { },
}