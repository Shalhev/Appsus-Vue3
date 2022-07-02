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
        <input v-for="(task,idx) in tasks" v-model="tasks[idx]" type="text" placeholder="enter task..."
            @click="addTask(idx)"  @blur="blurSave">
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
            <!-- colors -->
            <div @click="setColor('#FFFFFF')" class="color white" style="background-color:#FFFFFF"></div>
            <div @click="setColor('#F28B82')" class="color red" style="background-color:#F28B82"></div>
            <div @click="setColor('#FBBC02')" class="color orange" style="background-color:#FBBC02"></div>
            <div @click="setColor('#FFF476')" class="color yellow" style="background-color:#FFF476"></div>
            <div @click="setColor('#CCFF8F')" class="color green" style="background-color:#CCFF8F"></div>
            <div @click="setColor('#A7FFEB')" class="color cyan" style="background-color:#A7FFEB"></div>
            <div @click="setColor('#CBF0F8')" class="color blue" style="background-color:#CBF0F8"></div>
            <div @click="setColor('#AECBFA')" class="color dark-blue" style="background-color:#AECBFA"></div>
            <div @click="setColor('#D7AEFB')" class="color purple" style="background-color:#D7AEFB"></div>
            <div @click="setColor('#FBCFE8')" class="color pink" style="background-color:#FBCFE8"></div>
            <div @click="setColor('#E6C9A8')" class="color brown" style="background-color:#E6C9A8"></div>
            <div @click="setColor('#E8EAED')" class="color gray" style="background-color:#E8EAED"></div>
            <!-- backgrounds -->
            <div @click="setBackImg(1)" class="color bg1" style="backgroundImage:url('./imgs/apps/keep/bg1.webp')"></div>
            <div @click="setBackImg(2)" class="color bg2" style="backgroundImage:url('./imgs/apps/keep/bg2.webp')"></div>
            <div @click="setBackImg(3)" class="color bg3" style="backgroundImage:url('./imgs/apps/keep/bg3.webp')"></div>
            <div @click="setBackImg(4)" class="color bg4" style="backgroundImage:url('./imgs/apps/keep/bg4.webp')"></div>
            <div @click="setBackImg(5)" class="color bg5" style="backgroundImage:url('./imgs/apps/keep/bg5.webp')"></div>
            <div @click="setBackImg(6)" class="color bg6" style="backgroundImage:url('./imgs/apps/keep/bg6.webp')"></div>
            <div @click="setBackImg(7)" class="color bg7" style="backgroundImage:url('./imgs/apps/keep/bg7.webp')"></div>
            <div @click="setBackImg(8)" class="color bg8" style="backgroundImage:url('./imgs/apps/keep/bg8.webp')"></div>
            <div @click="setBackImg(9)" class="color bg9" style="backgroundImage:url('./imgs/apps/keep/bg9.webp')"></div>
            <div @click="setBackImg(10)" class="color bg10" style="backgroundImage:url('./imgs/apps/keep/bg10.webp')"></div>
            <div @click="setBackImg(11)" class="color bg11" style="backgroundImage:url('./imgs/apps/keep/bg11.webp')"></div>
            <div @click="setBackImg(12)" class="color bg12" style="backgroundImage:url('./imgs/apps/keep/bg12.webp')"></div>
        </div>
    </div>
</section>
`,
    props: ['editedNote'],

    data() {
        return {
            note: null,
            colorSelect: false,
            tasks: ['']
        };
    },
    created() {
        if (this.editedNote) {
            this.note = this.editedNote
            if (this.editedNote.type === 'note-todos')
                this.tasks = this.loadTodos(this.editedNote.info.todos)
        }
        else this.note = keepService.getEmptyNote()
    },
    methods: {
        addTask(idx) {
            if (idx === this.tasks.length - 1) this.tasks.push('')
        },
        toggleColor() {
            this.colorSelect = !this.colorSelect
        },
        formatTodos() {
            this.note.info.todos = this.tasks.map(task => {
                if (!task) return ' '
                return { txt: task.trim(), isDone: false }
            })
        },
        loadTodos(todos) {
            if (!todos.length) return ['']
            return this.note.info.todos.map(noteObj => noteObj.txt)
        },
        save() {
            if (this.note.type === 'note-todos') this.formatTodos()
            this.$emit('save-note', this.note)
        },
        blurSave() {
            if (this.note.type === 'note-todos') this.formatTodos()
            if (this.editedNote) this.$emit('update-note', this.note)
        },
        setType(e) {
            this.note.type = e.target.dataset.type
        },
        setColor(color) {
            this.note.style.backgroundImage = null
            this.$refs.newNote.style.backgroundImage = null
            this.$refs.newNote.style.backgroundColor = color
            this.note.style.backgroundColor = color
            this.toggleColor()
            if (this.editedNote) this.blurSave()
        },
        setBackImg(imgNum) {
            const imgLink = `url('./imgs/apps/keep/bg${imgNum}.webp')`
            this.$refs.newNote.style.backgroundImage = imgLink
            this.note.style.backgroundImage = imgLink
            this.toggleColor()
            if (this.editedNote) this.blurSave()
        },
    },
    computed: {},
    mounted() {
        if (!this.editedNote) this.$refs.txtInput.focus()
    },
    unmounted() { },
};