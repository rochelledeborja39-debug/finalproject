// Product Data - Images are guaranteed to work!
const products = [
{
        productName: "Pet Toys",
        price: 33,
        currency: "PHP",
        isAvailable: true,
        image: "https://img.kwcdn.com/product/open/2023-10-16/1697456886237-797a454601dd4b9e903b416e58c64081-goods.jpeg?imageMogr2/auto-orient%7CimageView2/2/w/800/q/70/format/avif"
},
{
        productName: "Cat Clothes",
        price: 101,
        currency: "PHP",
        isAvailable: true,
        image: "https://10pounddeals.com/wp-content/uploads/2020/01/Pet-Cat-Clothes-Funny-Dinosaur-Costumes-Coat-Winter-Warm-Fleece-Cat-Clothing-For-Small-Cats-Kitten.jpg_640x640.jpg"
},
{       
        productName: "Cat Litter Sand",
        price: 121,
        currency: "PHP",
        isAvailable: true,
        image: "https://pindotlang.com/cdn/shop/files/CatLitter_2.jpg?v=1752818997&width=1200"
},
{
        productName: "Cat House",
        price: 254,
        currency: "PHP",
        isAvailable: true,
   image: "https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/57f35c3757992610983ce7d0461d5ab4.jpg?imageMogr2/auto-orient%7CimageView2/2/w/800/q/70/format/avif"
},
{
        productName: "Pet Wet Snack",
        price: 36,
        currency: "PHP",
        isAvailable: true,
        image: "https://img.lazcdn.com/g/p/fbf713a6e2bdf4f809e36ef8a2da2e2f.jpg_720x720q80.jpg_.webp"
},
{
        productName: "Pet Cold Medicine Treatment Cought/Cold",
        price: 69,
        currency: "PHP",
        isAvailable: true,
        image: "https://img.lazcdn.com/g/p/206533ebed09c499aee5c2dec532f42b.png_720x720q80.png_.webp"
},
{
        productName: "Cat collar with Bell",
        price: 52,
        currency: "PHP",
        isAvailable: true,
        image: "https://img.lazcdn.com/g/p/b62d52fc29ff76426fed7fe62ec5e8b1.jpg_720x720q80.jpg_.webp"
},
{
        productName: "Cat in Can Wet Food/ CAT CHOIZE",
        price: 80,
        currency: "PHP",
        isAvailable: true,
        image: "https://www.petexpress.com.ph/cdn/shop/files/10343200_1000x.png?v=1764829559"
}    
];

let cart = [];

// Display Products
function renderProducts() {
    let html = "";
    products.forEach((p) => {
        let inCart = cart.find(item => item.productName === p.productName);

        html += `
            <div>
                <img src="${p.image}" alt="${p.productName}" width="100">
                <p>${p.productName}</p>
                <p>${p.currency} ${p.price}</p>
                <p>${p.isAvailable ? "Available" : "Sold Out"}</p>
                <button class="add-button" data-name="${p.productName}" ${inCart ? "disabled" : ""} ${!p.isAvailable ? "disabled" : ""}>
                    ${inCart ? "Already in cart" : "Add to Cart"}
                </button>
            </div>
        `;
    });

    document.getElementById("product-parent").innerHTML = html;

    document.querySelectorAll(".add-button").forEach(btn => {
        btn.addEventListener("click", addtocart);
    });
}

// Display Cart
function renderCart() {
    let html = "";
    let total = 0;
    let count = 0;

    if (cart.length === 0) {
        html = "<p>Cart is empty</p>";
    } else {
        cart.forEach((item, index) => {
            let subtotal = item.price * item.quantity;
            total += subtotal;
            count += item.quantity;

            html += `
                <div>
                    <p>${item.productName} - ${item.currency} ${item.price} x ${item.quantity} = ${item.currency} ${subtotal}</p>
                    <button onclick="increase(${index})">+</button>
                    <button onclick="decrease(${index})">-</button>
                    <button onclick="removeItem(${index})">Remove</button>
                </div>
            `;
        });
    }

    document.getElementById("cart-items").innerHTML = html;
    document.getElementById("cart-total").innerText = "Total: PHP " + total;
    document.getElementById("cart-quantity").innerText = "Items: " + count;
}

// Add to Cart
function addtocart(e) {
    let name = e.target.dataset.name;
    let product = products.find(p => p.productName === name);

    if (!product.isAvailable) {
        alert(product.productName + " is sold out and cannot be added.");
        return;
    }

    let existing = cart.find(item => item.productName === name);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    renderCart();
    renderProducts();
}

// Increase Quantity
window.increase = function(index) {
    cart[index].quantity++;
    renderCart();
};

// Decrease Quantity
window.decrease = function(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    } else {
        cart.splice(index, 1);
    }
    renderCart();
    renderProducts();
};

// Remove Item
window.removeItem = function(index) {
    cart.splice(index, 1);
    renderCart();
    renderProducts();
};

// Clear Cart
document.getElementById("clear-cart").addEventListener("click", function() {
    cart = [];
    renderCart();
    renderProducts();
});

// Start the page
renderProducts();
renderCart();
