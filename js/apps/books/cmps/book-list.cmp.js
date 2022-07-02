import bookPreview from "../cmps/book-preview.cmp.js";

export default {
    props: ["books"],
    template: `
    <section class="books-list">
        <ul>
            <li v-for="book in books" :key="books.id" class="book-preview-container" @click="select(book)">
                <router-link :to="'/books/'+book.id">
                <book-preview :book="book"/>
                </router-link>
                <!-- <button @click="select(book)">Select</button> -->
            </li>
        </ul>
    </section>
`,
    emits: ['selected'],
    components: {
        bookPreview,
    },
    data() {
        return {};
    },
    created() { },
    methods: {
        select(book) {
            this.$emit("selected", book);
        }
    },
    computed: {},
    unmounted() { },
};