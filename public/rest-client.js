const app = Vue.createApp({
    data() {
        return {
            games: [],
            gameInModal: { id: null, name: '', price: 0 },
            newGame: { name: '', price: 0 }
        };
    },
    methods: {
        loadGames() {
            fetch('/games')
                .then((response) => response.json())
                .then((games) => {
                    this.games = games;
                });
        },
        openNewGameModal() {
            this.newGame = { name: '', price: 0 };
            document.getElementById('newGameModal').style.display = 'block';
        },
        insertNewGame() {
            fetch('/games', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.newGame)
            }).then(() => {
                document.getElementById('newGameModal').style.display = 'none';
                this.loadGames();
            });
        },
        editGame(game) {
            this.gameInModal = { ...game };
            document.getElementById('gameInfoModal').style.display = 'block';
        },
        updateGame() {
            fetch(`/games/${this.gameInModal.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.gameInModal)
            }).then(() => {
                document.getElementById('gameInfoModal').style.display = 'none';
                this.loadGames();
            });
        },
        deleteGame(id) {
            fetch(`/games/${id}`, {
                method: 'DELETE'
            }).then(() => {
                this.loadGames();
            });
        },
        closeModal() {
            document.getElementById('gameInfoModal').style.display = 'none';
            document.getElementById('newGameModal').style.display = 'none';
        }
    },
    mounted() {
        this.loadGames();
    }
}).mount('#app');