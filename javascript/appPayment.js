let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', () => {
    body.classList.add('active');
})
closeShopping.addEventListener('click', () => {
    body.classList.remove('active');
})

let products = [


    {
        id: 1,
        type: 'coffee',
        subtype: 'cold coffee',
        name: 'COLD COFFEE',
        image: '7.PNG',
        price: 10,
        size: 'small'
    },
    {
        id: 2,
        type: 'coffee',
        subtype: 'cold coffee',
        name: 'HOT COFFEE',
        image: '7.PNG',
        price: 5
    },
    {
        id: 3,
        name: 'COOKIE MILKSHAKE',
        type: 'coffee',
        subtype: 'hot coffee',
        image: '8.PNG',
        price: 6
    },
    {
        id: 4,
        name: 'Hot Chocolate',
        type: 'drink',
        size: 'small',
        subtype: 'cold drink',
        image: '9.PNG',
        price: 8
    },
    {
        id: 5,
        name: 'PRODUCT NAME 5',
        type: 'drink',
        subtype: 'hot drink',
        image: '10.PNG',
        price: 7
    },
    {
        id: 6,
        name: 'PRODUCT NAME 6',
        type: 'drink',
        subtype: 'iced tea',
        image: '11.PNG',
        price: 1.50
    },
    {
        id: 7,
        name: 'PRODUCT NAME 6',
        type: 'drink',
        subtype: 'hot tea',
        image: '12.PNG',
        price: 3.50
    },
    {
        id: 8,
        name: 'PRODUCT NAME 6',
        type: 'food',
        subtype: 'pastry',
        image: '6.PNG',
        price: 5.50
    },
    {
        id: 9,
        name: 'PRODUCT NAME 6',
        type: 'food',
        subtype: 'sweet',
        image: '1.PNG',
        price: 15
    },
    {
        id: 10,
        name: 'PRODUCT NAME 6',
        type: 'merchandise',
        subtype: 'coffee beans',
        image: '2.PNG',
        price: 20
    },
    {
        id: 11,
        name: 'PRODUCT NAME 6',
        type: 'merchandise',
        subtype: 'mug',
        image: '3.PNG',
        price: 22
    },
    {
        id: 12,
        name: 'PRODUCT NAME 6',
        type: 'merchandise',
        subtype: 'cups',
        image: '4.PNG',
        price: 14
    },
    {
        id: 13,
        name: 'PRODUCT NAME 6',
        image: '5.PNG',
        price: 6
    }
];



let listCards = [];

function initApp() {
    products.forEach((value, key) => {
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="../imgs/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">U$ ${value.price.toFixed(2).toLocaleString()}</div>
            <button onclick="addToCard(${key})">Add To Card</button>`;
        list.appendChild(newDiv);
    })
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
                <div><img src="../imgs/${value.image}"/></div>
                <div>${value.name}</div>
                <div>Size: ${value.size}</div>
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