export default {
    props: ["book"],
    template: `
    <section class="book-preview">
        <img :src="book.thumbnail">
        <h4>{{book.title}}</h4>
        <p>Price: {{priceToDisplay}}</p>
    </section>
`,

    data() {
        return {
        };
    },
    created() { },
    methods: {},
    computed: {
		priceToDisplay() {
			return new Intl.NumberFormat('en-EN', { style: 'currency', currency: this.book.listPrice.currencyCode }).format(this.book.listPrice.amount)
		},
    },
    unmounted() { },
};