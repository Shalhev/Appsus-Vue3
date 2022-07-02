export default {
    template: `
 <div class="home-page">
        <div class="hero">
            <h2>Helpful products.</h2>
            <h2> Built with you in mind.</h2>
        </div>

        <div class="cards">
            <div class="card">
                <img src="./imgs/home/mail-logo.webp" alt="card" style="width:100%">
                <div class="container">
                    <h3>Simple. Secure. Reliable messaging.</h3>
                    <router-link to="/mail"> <button class="app-btn">Mail</button></router-link>
                </div>
            </div> 
            <div class="card">
                <img src="./imgs/home/keep-logo.webp" alt="card" style="width:100%">
                <div class="container">
                    <h3>Save your thoughts, wherever you are.</h3>
                    <router-link to="/keep"> <button class="app-btn">Keep</button></router-link>
                </div>
            </div>
            <div class="card">
                <img src="./imgs/home/books-logo.webp" alt="card" style="width:100%">
                <div class="container">
                    <h3>Search the world's most comprehensive index of books.</h3>
                    <router-link to="/books"> <button class="app-btn">Books</button></router-link>
                </div>
            </div>
        </div>

        <div class="about">
            <h2>About Us</h2>
            <div class="about-container">
                <div class="person">
                    <img src="./imgs/home/shalhev.png" alt="Shalhev">
                    <h2 class="name">Shalhev Nagauker</h2>
                    <b class="title">Head of Fun</b>
                   <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
                    <div class="social-links">
                    <a href="https://www.linkedin.com/in/shalhev-nagauker/" class="fa linkedin">&#xf08c;</a> 
                        <a href="https://github.com/Shalhev" class="fa github">&#xf092;</a> 
                        <a href="https://www.facebook.com/shalhev1/" class="fa facebook">&#xf082;</a> 
                    </div>
                </div>

                <div class="person">
                    <img class="yuval" src="./imgs/home/yuval.jpg" alt="Yuval">
                    <h2 class="name">Shalhev Nagauker</h2>
                    <b class="title">Head of Coffee</b>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
                    <div class="social-links">
                        <a href="https://il.linkedin.com/" class="fa linkedin">&#xf08c;</a> 
                        <a href="https://github.com/YuvalYuvalYuval" class="fa github">&#xf092;</a> 
                        <a href="https://www.facebook.com/yuvalrubin96/" class="fa facebook">&#xf082;</a> 
                    </div>
                </div>
            </div>
        </div>
        <footer>
            <p> Ⓒ 2022</p>
        </footer>
    </div>
    <div />
`,
    data() {
        return {};
    },
    created() { },
    methods: {},
    computed: {},
    unmounted() { },
};