const productsContainer = document.getElementById("products");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");
const productDetails = document.getElementById("productDetails");

let cart = [];

fetch("http://localhost:5000/api/products")
    .then(response => response.json())
    .then(products => {
        products.forEach(product => {
            productsContainer.innerHTML += `
                <div class="product">
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <h4>₹${product.price}</h4>

                    <button onclick='showDetails(${JSON.stringify(product)})'>
                        View Details
                    </button>

                    <button onclick='addToCart(${JSON.stringify(product)})'>
                        Add to Cart
                    </button>
                </div>
            `;
        });
    });

function showDetails(product) {
    productDetails.innerHTML = `
        <div class="product">
            <img src="${product.image}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p>${product.description}</p>
            <h3>₹${product.price}</h3>
            <p>Category: ${product.category}</p>

            <button onclick='addToCart(${JSON.stringify(product)})'>
                Add to Cart
            </button>
        </div>
    `;

    document.getElementById("details").scrollIntoView();
}

function addToCart(product) {
    cart.push(product);
    displayCart();
}

function displayCart() {
    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach((product, index) => {
        total += product.price;

        cartItems.innerHTML += `
            <div>
                ${product.name} - ₹${product.price}
                <button onclick="removeFromCart(${index})">
                    Remove
                </button>
            </div>
        `;
    });

    cartTotal.textContent = total;
    cartCount.textContent = cart.length;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    displayCart();
}

function placeOrder() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    const email = document.getElementById("customerEmail").value;

    if (!email) {
        alert("Please enter your email!");
        return;
    }

    const items = cart.map(product => ({
        name: product.name,
        price: product.price,
        quantity: 1
    }));

    const total = cart.reduce((sum, product) => sum + product.price, 0);

    fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            items: items,
            total: total,
            customerEmail: email
        })
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById("orderMessage").textContent =
                data.message;

            if (data.message === "Order placed successfully") {
                cart = [];
                displayCart();
            }
        });
}