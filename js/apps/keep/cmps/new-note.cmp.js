import { keepService } from '../service/keep.service.js'
export default {
    template: `
<section ref="newNote" class="new-note">
    <div v-if="note.type==='note-txt'" class="new-note-inputs">
        <input ref="txtInput" type="text" placeholder="Title" v-model="note.info.title" @blur="blurSave">
        <input type="text" placeholder="Take a note..." v-model="note.info.txt" @blur="blurSave">
    </div>
    <div v-if="note.type==='note-img'" class="new-note-inputs">
        <input type="text" placeholder=" Title" v-model="note.info.title" @blur="blurSave">
        <input type="text" placeholder="Enter image url..." v-model="note.info.url" @blur="blurSave">
    </div>
    <div v-if="note.type==='note-video'" class="new-note-inputs">
        <input type="text" placeholder="Enter video url..." v-model="note.info.videoUrl" @blur="blurSave">
    </div>

    <div v-if="note.type ==='note-todos'" class="new-note-inputs">
        <input type="text" placeholder="Enter todos title" v-model="note.info.title" @blur="blurSave">
        <input v-for="(todo,idx) in note.info.todos" v-model="note.info.todos[idx].txt" type="text" placeholder="enter task..."
            @click="addTodo(idx)"  @blur="blurSave">
    </div>

    <div class="new-note-bottom">
        <div v-if="!editedNote" class="note-type-select">
            <button data-type='note-txt' @click="setType($event)" class="fa">&#xf040;</button>
            <button data-type='note-img' @click="setType($event)" class="fa">&#xf03e;</button>
            <img id="yt" data-type='note-video' @click="setType($event)" src="./imgs/apps/keep/youtube.png"
                alt="video" />
            <button data-type='note-todos' @click="setType($event)" class="fa">&#xf03a;</button>
            <img @click="toggleColor" src="./imgs/apps/keep/color-palette.png" alt="color">
            <button id="save" @click="save" class="fa">&#xf0c7;</button>
        </div>
        <div v-else>
            <img @click="toggleColor" src="./imgs/apps/keep/color-palette.png" alt="color">
        </div>
        <div class="color-select" :class="{open:colorSelect}">
            <div v-for="color in colors" class="color" @click="setColor(color)" :style="{backgroundColor:color}"></div>    
            <div v-for="num in 11" class="color" @click="setBackImg(num + 1)" :style="getBgImg(num+1)"></div>
        </div>
    </div>
</section>
`,
    props: ['editedNote'],

    data() {
        return {
            note: null,
            colorSelect: false,
            colors: ["#FFFFFF", "#F28B82", "#FBBC02", "#FFF476", "#CCFF8F", "#A7FFEB",
                "#CBF0F8", "#AECBFA", "#D7AEFB", "#FBCFE8", "#E6C9A8", "#E8EAED"],
        };
    },
    created() {
        if (this.editedNote) this.note = this.editedNote
        else this.note = keepService.getEmptyNote()
    },
    methods: {
        addTodo(idx) {
            if (idx === this.note.info.todos.length - 1)
             this.note.info.todos.push({txt:'',isDone:false})
        },
        toggleColor() {
            this.colorSelect = !this.colorSelect
        },
        save() {
            if (this.editedNote) keepService.updateNote(this.note)
            else this.$emit('save-note', this.note)
        },
        blurSave() {
            keepService.updateNote(this.note)
        },
        setType(e) {
            this.note.type = e.target.dataset.type
            this.note.info.todos.push({txt:'',isDone:false})
        },
        setColor(color) {
            this.note.style.backgroundImage = null
            this.$refs.newNote.style.backgroundImage = null
            this.$refs.newNote.style.backgroundColor = color
            this.note.style.backgroundColor = color
            this.toggleColor()
            if (this.editedNote) this.save()
        },
        getBgImg(imgNum) {
            return `background-image: url('./imgs/apps/keep/bg${imgNum}.webp')`
        }
        ,
        setBackImg(imgNum) {
            const imgLink = `url('./imgs/apps/keep/bg${imgNum}.webp')`
            this.$refs.newNote.style.backgroundImage = imgLink
            this.note.style.backgroundImage = imgLink
            this.toggleColor()
            if (this.editedNote) this.save()
        },
    },
    computed: {},
    mounted() {
        if (!this.editedNote) this.$refs.txtInput.focus()
    },
    unmounted() { },
};