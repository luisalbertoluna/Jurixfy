import KEYS from "./Keys.js"

const options = { headers: { Authorization: `Bearer ${KEYS.secret}` } }


let products, prices;


Promise.all([
    fetch("https://api.stripe.com/v1/products", options),
    fetch("https://api.stripe.com/v1/prices", options)
])
    .then(responses => Promise.all(responses.map(res => res.json())))
    .then(json => {
        products = json[0].data;
        prices = json[1].data;
        prices.forEach(el => {
            let productData = products.find(product => product.id === el.product);

            document.getElementById("producto").innerText = productData.name;
            document.getElementById("productoDesc").innerText = productData.description;
            document.getElementById("ImgProduc").src = productData.images[0];

            let precioFormateado = (parseFloat(el.unit_amount_decimal) / 100).toFixed(2);

            document.getElementById("pagar").setAttribute('data-id', el.id);
            document.getElementById("precioM").innerText = `${precioFormateado} ${el.currency.toUpperCase()}`;
            document.getElementById("precioT").innerText = `${precioFormateado} ${el.currency.toUpperCase()}`;

        });
    })
    .catch(error => {
        let message = error.statusText || "Ocurrió un error en la petición";
        alert(`Error: ${error.status}: ${message}`);
    });





$('#pagar').click(function () {

    let priceId = document.getElementById("pagar").getAttribute("data-id");

    var baseUrl = window.location.origin;

    var correo = $('#coreoEncrypt').data('corro-url');

    var urlSucces = baseUrl + '/Jurixfy/Succes?correo=' + correo;
    var urlCancel = baseUrl + '/Jurixfy/Cancel';

    Stripe(KEYS.public).redirectToCheckout({
        lineItems: [{
            price: priceId,
            quantity: 1
        }],
        mode: "payment",
        successUrl: urlSucces,
        cancelUrl: urlCancel
    })
        .then(res => {
            if (res.error) {
                $arepas.insertAdjacentElement("afterend", res.error.message)
            }
        })

});

