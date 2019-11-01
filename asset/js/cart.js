const url = "http://localhost:3000/store"

let app = new Vue({
    el: "#app",
    data: {
        title: "Shopping cart",
        showShoppingCart: false,
        storeItems: [],
        cart: [],
        total: 0
    },
    methods: {
        changeView: function () {
            if (this.showShoppingCart === false) {
                this.showShoppingCart = true;
            } else {
                this.showShoppingCart = false;
            }
        },


        addToCart: function (item) {
            this.cart.push(item);
               this.calcTotal()
        },

        removeFromCart: function (item, index) {
            this.cart.splice(index, 1)
               this.calcTotal()
        },
           calcTotal: function () {
               let total = 0
               for(let i=0; i<this.cart.length; i++){
                   total = total + (this.cart[i].price * this.cart[i].quantity)
               }
               this.total = total
         },
         fetchStoreData: async function fetchData(){
             let res = await fetch(url, {
                 method: "GET",
             })
             const decodedResponse = await res.json()
             this.storeItems = decodedResponse.result
         }

    },
    mounted(){
        console.log("app is ready")
        this.fetchStoreData()
    }
})