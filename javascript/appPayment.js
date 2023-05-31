const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

var urlSplit = id.split('_');
var mapProducts = [];
var totalPrice=0;
for (var i = 0; i < urlSplit.length-1; i++) {
    idQuantitySplit = urlSplit[i].split('-')
    mapActualProduct = new Map()
    mapActualProduct.set('id', idQuantitySplit[0])
    mapActualProduct.set('quantity', idQuantitySplit[1])
    mapActualProduct.set('price', idQuantitySplit[2])
    mapProducts.push(mapActualProduct)
}

for (var i = 0; i < mapProducts.length; i++) {
    totalPrice+=parseFloat(mapProducts[i].get('price'))
}
console.log(totalPrice)



console.log(mapProducts)
const listAux = mapProducts.map((map) => Object.fromEntries(map));
const listJSON = JSON.stringify(listAux, null, 2);



//payment informations

const cardHolderInput = document.getElementById("card-holder");
const creditCardNumberInput = document.getElementById("card-number");
const expirationDateInput = document.getElementById("expiration-date");
const cvvInput = document.getElementById("cvv");

//address informations

const address1Input = document.getElementById("address1");
const address2Input = document.getElementById("address2");
const zipCodeInput = document.getElementById("zip-code");
const countryInput = document.getElementById("country");
const complementInput = document.getElementById("complement");

const button = document.getElementById("btn");

const creditCardNumberValidation = (number) => {
    if (number.length == 16)
        return true;
    else
        throw new Error("Invalid Credit Card");
}

const cvvValidation = (number) => {
    if (number.length == 3)
        return true;
    else
        throw new Error("Invalid CVV");
}

const expirationDateValidation = (date) => {
    if (date.length == 4)
        return true;
    else
        throw new Error("Invalid Expiration Date");
}


button.addEventListener("click", () => {
    const cardHolder = cardHolderInput.value
    const creditCardNumber = creditCardNumberInput.value
    const expirationDate = expirationDateInput.value
    const cvv = cvvInput.value
    const address1 = address1Input.value
    const address2 = address2Input.value
    const zipCode = zipCodeInput.value
    const country = countryInput.value
    const complement = complementInput.value

    try {
        //creditCardNumberValidation(creditCardNumber)
        //cvvValidation(cvv)
        //expirationDateValidation(expirationDate)

        axios.post("http://localhost:3000/purchases", {
            cardHolder: cardHolder,
            creditCardNumber: creditCardNumber,
            expirationDate: expirationDate,
            cvv: cvv,
            address1: address1,
            address2: address2,
            zipCode: zipCode,
            country: country,
            complement: complement,
            products:listJSON,
            totalPrice:totalPrice,

        })
    } catch (error) {
        alert(error)
    }
})

