export default {
    name: 'book-filter',
    template: `
    <section class="books-filter">
        <div class="book-add-btn">
            <router-link class="book-add" to="/bookadd">Add Book</router-link>
        </div>
        <form @submit.prevent="filter">
            <label for="book-name">Book Name:</label>
            <input name="book-name" type="text" v-model="filterBy.byName" placeholder="Book Name...">
            
            <label for="min-price">Min Price:</label>
            <input name="min-price" type="number" v-model.number="filterBy.fromPrice" placeholder="Min price">
            
            <label for="max-price">Max Price:</label>
            <input name="max-price" type="number" v-model.number="filterBy.toPrice" placeholder="Max price">
            
            <button>Search</button>
        </form>
    </section>
`,
    emits: ['filtered'],
    data() {
        return {
            filterBy: {
                byName: '',
                fromPrice: 0,
                toPrice: 200,
            },
        };
    },
    created() { },
    methods: {
        filter() {
            const filter = JSON.parse(JSON.stringify(this.filterBy))
            this.$emit("filtered",filter);
        },
    },
    computed: {},
    unmounted() { },
};