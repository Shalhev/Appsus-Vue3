import { bookService } from '../services/book-service.js';
import { eventBus } from "../../../services/eventBus-service.js";
import { utilService } from '../../../services/util-service.js';

export default {
    template: `
    <section class="review-add-container">
        <form @submit.prevent="addReview">
            <input ref="nameInput" type="name" v-model="review.name" placeholder="Full Name" required>
            <!-- <select name="stars" v-model="review.stars" required>
                <option disabled>Rate:</option>
                <option>⭐</option>
                <option>⭐⭐</option>
                <option>⭐⭐⭐</option>
                <option>⭐⭐⭐⭐</option>
                <option>⭐⭐⭐⭐⭐</option>
            </select> -->
            <div class="rate">
                <span v-for="num in 5" :class="{star: num <= review.stars}" @click="setRating(num)">★</span>
            </div>
            <input type="date" v-model="review.date" required>
            <textarea v-model="review.txt" name="txt-review" cols="30" rows="10" placeholder="Enter your review..." required></textarea>
            <button>Submit</button>
        </form>
    </section>
`,
    components: {
        bookService,
        eventBus,
    },
    data() {
        return {
            bookId: this.$route.params.bookId,
            review: {
                id: utilService.makeId(),
                name: '',
                stars: 0,
                date: '',
                txt: '',
            },
        };
    },
    created() { },
    methods: {
        addReview() {
            const review = JSON.parse(JSON.stringify(this.review))
            bookService.addReview(this.bookId, review).then(() => {
                eventBus.emit('show-msg', { txt: 'Book Reviewed', type: 'success' });
                this.review = {}
                this.$emit("reviewed");
            })
        },

        setRating(val) {
            this.review.stars = val
        },
    },
    computed: {},
    unmounted() { },
    mounted() {
        this.$refs.nameInput.focus()
    },
};