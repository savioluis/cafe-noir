let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

let buttonPay = document.getElementById("btn-pay")

openShopping.addEventListener('click', () => {
    body.classList.add('active');
})
closeShopping.addEventListener('click', () => {
    body.classList.remove('active');
})

let products = [];
let listCards = [];

function initApp() {
    axios.get('http://localhost:3000/products')
        .then(function (response) {
            products = response.data;
            if (products.length <= 0) {
                throw new Error('There is no product registered in the database');
            }
            products.forEach((value, key) => {
                let newDiv = document.createElement('div');
                newDiv.classList.add('item');
                newDiv.innerHTML = `
            <div class="title">${value.name}</div>
            <img src="${value.image}"></img>
                <div class="price">U$ ${value.price.toFixed(2).toLocaleString()}</div>
                <button onclick="addToCard(${key})">Add To Card</button>`;
                list.appendChild(newDiv);
            })
        })
        .catch(function (err) {
            document.getElementById("menu_title").innerHTML = '<div class="alert alert-danger" role="alert">' + err.message + " 😢" + '</div>';
        });
}

initApp();

function addToCard(key) {
    if (listCards[key] == null) {
        // copy product form list to list card
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    reloadCard();
}

function reloadCard() {
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;

    listCards.forEach((value, key) => {
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;

        if (value != null) {
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="${value.image}"/></div>
                <div>${value.name}</div>
                <div>U$ ${value.price.toFixed(2).toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
            listCard.appendChild(newDiv);
        }
    })
    total.innerText = `U$ ` + totalPrice.toFixed(2).toLocaleString();
    quantity.innerText = count;
}

function changeQuantity(key, quantity) {
    if (quantity == 0) {
        delete listCards[key];
    } else {
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}

buttonPay.addEventListener("click", () => {
    goToPayment()
})

function goToPayment() {
    let url = ''
    for (let i = 0; i < products.length; i++) {
        if (listCards[i] == undefined) {
            continue;
        } else {
            let idProduct = listCards[i]._id;
            let quantityProduct = listCards[i].quantity;
            let priceProduct = listCards[i].price;
            url += idProduct + '-' + quantityProduct + '-' + priceProduct + '_';
        }
    }

    window.location.href = 'payment.html?id=' + url + '';
}