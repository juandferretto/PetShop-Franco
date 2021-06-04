const app = Vue.createApp({
    data() {
        return {
            productos: [],
            juguetes: [],
            juguetesDestacados: [],
            medicamentos: [],
            juguetesMasStock: [],
            juguetesMenosStock: [],
            medicamentosMasStock: [],
            medicamentosMenosStock: [],
            carrito: [],
        }
    },

    created() {
        var endpoint = "https://apipetshop.herokuapp.com/api/articulos"

        fetch(endpoint)
            .then(res => res.json())
            .then(data => {
                this.productos = data.response
                this.juguetes = this.productos.filter(juguete => juguete.tipo == "Juguete");
                this.juguetesDestacados = this.juguetes.filter(juguete => juguete.stock > 10)
                this.juguetesMasStock = this.juguetes.filter(juguete => juguete.stock > 5)
                this.juguetesMenosStock = this.juguetes.filter(juguete => juguete.stock < 5)
                this.medicamentos = this.productos.filter(medicamento => medicamento.tipo == "Medicamento")
                this.medicamentosMasStock = this.medicamentos.filter(medicamento => medicamento.stock > 5)
                this.medicamentosMenosStock = this.medicamentos.filter(medicamento => medicamento.stock < 5)
                let datos = localStorage.getItem("carrito")
                if (datos != null) {
                    this.carrito = JSON.parse(datos)
                }
            })
    },



    methods: {

        agregarAlCarrito(juguete) {
            const articulosCarrito = this.carrito.findIndex(item => item._id == juguete._id);

            if (articulosCarrito == -1) {
                this.carrito.push({
                    "_id": juguete._id,
                    "nombre": juguete.nombre,
                    "precio": juguete.precio,
                    "imagen": juguete.imagen,
                    "cant": 1,
                })
            } else {
                this.carrito[articulosCarrito].cant += 1
            }

            juguete.stock--;
            localStorage.setItem("carrito", JSON.stringify(this.carrito))

        },

        limpiarCarrito(){
            this.carrito = []
            localStorage.removeItem("carrito")
        },

        
    },

    computed: {

        cantidadDeProductos() {
            return this.carrito.reduce((acumulador, item) => acumulador + item.cant, 0)
        },

        precioTotalCarrito() {
            return this.carrito.reduce((acumulador, item) => acumulador + (item.cant * item.precio), 0)
        }


    }

})

app.mount("#app");

let btnForm = document.getElementById("boton-contacto")

if (btnForm) {
    btnForm.addEventListener("click", (e) => {
        e.preventDefault();
        swal({
            title: "Buen trabajo!",
            text: "Gracias por contactarte con nosotros",
            icon: "success",
            button: "Volver",
        });
    })
}


let btnComprar = document.getElementById("boton-comprar")


if (btnComprar) {
    btnComprar.addEventListener("click", (e) => {
        e.preventDefault();
        swal({
            title: "Buen trabajo!",
            text: "Gracias por tu compra (revisa el correo con el estado de tu pedido)",
            icon: "success",
            button: "Volver",
        });
    })
}
