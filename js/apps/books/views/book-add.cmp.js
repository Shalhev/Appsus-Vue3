import { bookService } from '../services/book-service.js';
import { eventBus } from "../../../services/eventBus-service.js";

export default {
    template: `
 <section class="book-add-page">
    <h3>add book</h3>
    <input type="search" placeholder="Search new book..." v-model="searchTxt" @change="getBooks"/>
    <ul>
        <li v-for="book in googleBooks">
        <p>{{book.volumeInfo.title}}
            <button @click="addBook(book)">+</button>
        </p>
        </li>
        </ul>
 </section>
`,
    components: {
        bookService,
        eventBus,
    },
    data() {
        return {
            searchTxt: null,
            googleBooks: null,
        };
    },
    created() { },
    methods: {
        getBooks() {
            return axios.get(`https://www.googleapis.com/books/v1/volumes?printType=books&q=${this.searchTxt}`).then(res => res.data)
                .then(books => {
                    console.log('books.items: ', books.items)
                    this.googleBooks = books.items
                    return books.items
                })
        },
        addBook(book) {
            bookService.addGoogleBook(book)
            console.log('book: ', book)
        }
    },
    computed: {},
    unmounted() { },
};