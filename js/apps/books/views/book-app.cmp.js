import { bookService } from "../services/book-service.js";
import bookFilter from "../cmps/book-filter.cmp.js";
import bookList from "../cmps/book-list.cmp.js";
import bookDetails from "./book-details.cmp.js";


export default {
    name: 'book-app',
    template: `
    <section class="book-app">
        <book-filter @filtered="setFilter"/>
        <router-link to="/books/:bookId"/>
        <book-list :books="booksToShow" @selected="selectBook"/>
        <!-- <book-details v-if="selectedBook" :book="selectedBook"/> -->
    </section>
`,
    components: {
        bookFilter,
        bookList,
        bookDetails,
    },
    data() {
        return {
            books: null,
            filterBy: null,
            selectedBook: null,
        }
    },
    created() {
        bookService.query().then(books => this.books = books)
    },
    methods: {
        setFilter(filterBy) {
            this.filterBy = filterBy;
        },
        selectBook(book) {
            this.selectedBook = book
        }
    },
    computed: {
        booksToShow() {
            if (!this.filterBy) return this.books
            const regex = new RegExp(this.filterBy.byName, "i");
            var books = this.books
            return books.filter((book) => regex.test(book.title) &&
                book.listPrice.amount > this.filterBy.fromPrice &&
                book.listPrice.amount < this.filterBy.toPrice);
        }
    },
    unmounted() { },
};