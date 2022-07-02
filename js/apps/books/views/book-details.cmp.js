import { bookService } from '../services/book-service.js';
import { eventBus } from "../../../services/eventBus-service.js";
import longText from '../cmps/long-text.cmp.js'
import reviewAdd from '../cmps/review-add.cmp.js';

export default {
    template: `
<section v-if="book" class="book-details-container">
    <div class="book-details">
        <div class="right-side">
            <h4 v-if="book.listPrice.isOnSale" class="green">ON SALE!</h4>
            <img :src="book.thumbnail">
        </div>
        <div class="center">
            <h2>{{book.title}}</h2>
            <h3>{{book.subtitle}}</h3>
            <p class="authors">By: {{bookAuthors}}</p>
            <p>Categories: {{bookCategs}}</p>
            <p>{{bookPublish}}</p>
            <p>{{bookPages}}</p>
            <p>Language: {{book.language}}</p>
            <long-text :text="book.description"></long-text>
        </div>
        <div class="right-side">
            Price: <p :class="priceColor">{{priceToDisplay}}</p>
                <router-link :to="'/books/' + nextBookId">Next Book</router-link>
        </div>
    </div>

    <div class="reviews-container">
        <review-add @reviewed="renderBook"/>
        <div v-if="book.reviews" class="reviews">
            <p class="reviews-title">Reviews:</p>
            <div class="review" v-for="review in book.reviews">
                <div><span class="review-info">Name: </span>{{review.name}}</div>
                <!-- <div><span class="review-info">Stars: </span>{{review.stars}}</div> -->
                <div><span class="review-info">Stars: </span>
                <span v-for="num in review.stars" class="star">★</span></div>
                <div><span class="review-info">Date: </span>{{review.date}}</div>
                <div><span class="review-info">Review: </span>{{review.txt}}</div>
                <button @click="removeReview(review.id)">X</button>
            </div>
        </div>
        <div v-else><h2>No Reviews</h2></div>
    </div>
</section>
`,
    components: {
        longText,
        reviewAdd
    },
    data() {
        return {
            book: null,
            nextBookId: null,

        };
    },
    created() {
        const id = this.$route.params.bookId
        bookService.get(id).then(book => this.book = book)
    },
    methods: {
        renderBook() {
            const id = this.$route.params.bookId
            bookService.get(id).then(book => this.book = book)
        },
        removeReview(reviewId) {
            bookService.removeReview(this.book.id, reviewId)
                .then(book => {
                    this.book = book;
                    eventBus.emit('show-msg', { txt: `A review on book ${this.book.id} was successfully removed`, type: 'success' });
                })
        },
    },
    computed: {
        bookAuthors() {
            const authors = this.book.authors
            return authors.join()
        },
        bookCategs() {
            const categs = this.book.categories
            return categs
        },
        bookPages() {
            const pages = this.book.pageCount
            if (pages > 500) return 'Long reading'
            else if (pages > 100) return 'Decent Reading'
            else if (pages < 100) return 'Light Reading'
        },
        bookPublish() {
            const date = this.book.publishedDate
            const diff = (new Date).getFullYear() - date
            if (diff > 10) return 'Veteran Book'
            else if (diff < 1) return 'New Book!'
        },
        priceColor() {
            const price = this.book.listPrice.amount
            return { red: price > 150, green: price < 20 }
        },
        priceToDisplay() {
            return new Intl.NumberFormat('en-EN', { style: 'currency', currency: this.book.listPrice.currencyCode }).format(this.book.listPrice.amount)
        },
    },
    watch: {
        '$route.params.bookId': {
            handler() {
                if (!this.$route.params.bookId) return
                const id = this.$route.params.bookId
                bookService.get(id).then(book => {
                    this.book = book
                    bookService.getNextBookId(book.id)
                        .then(nextBookId => this.nextBookId = nextBookId)
                })
            },
            immediate: true
        }

    }
}