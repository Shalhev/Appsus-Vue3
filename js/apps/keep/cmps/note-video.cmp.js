export default {
    template: `
<section class="video-note">
    <iframe width="350" height="250" :src="videoUrl"></iframe>
</section>
`,
    props: ['note'],
    data() {
        return {};
    },
    created() {
    },
    methods: {},
    computed: {
        videoUrl() {
            const url = this.note.info.videoUrl
            if (url.length <= 41) return url //the length of the emded adress
            const idStart = url.indexOf('v=') + 2
            const idEnd = idStart + 11 //yt video ids are 11 digits long
            const videoId = url.substring(idStart, idEnd)
            return 'https://www.youtube.com/embed/' + videoId
        }
    },
    unmounted() { },
};