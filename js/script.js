/* ==========================
   DARK MODE
========================== */

const themeBtn = document.getElementById("themeBtn");

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
}

themeBtn?.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
});


/* ==========================
   SEARCH PRODUCTS
========================== */

const searchInput = document.getElementById("searchInput");

searchInput?.addEventListener("keyup", function () {

    const value = this.value.toLowerCase();

    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {

        const text = card.innerText.toLowerCase();

        if (text.includes(value)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }

    });

});


/* ==========================
   REGISTER
========================== */

function register() {

    const name =
        document.getElementById("name")?.value;

    const email =
        document.getElementById("regEmail")?.value;

    const password =
        document.getElementById("regPassword")?.value;

    const phone =
        document.getElementById("phone")?.value;

    const address =
        document.getElementById("address")?.value;

    if (!email || !password) {

        alert("Please fill all fields");

        return;
    }

    const user = {
        name,
        email,
        password,
        phone,
        address
    };

    localStorage.setItem(
        "user",
        JSON.stringify(user)
    );

    alert("Registration Successful");

    window.location.href = "login.html";
}


/* ==========================
   LOGIN
========================== */

function login() {

    const email =
        document.getElementById("email")?.value;

    const password =
        document.getElementById("password")?.value;

    const user =
        JSON.parse(
            localStorage.getItem("user")
        );

    if (!user) {

        alert("New User! Register First");

        window.location.href =
            "register.html";

        return;
    }

    if (
        email === user.email &&
        password === user.password
    ) {

        localStorage.setItem(
            "loggedIn",
            "true"
        );

        alert("Login Successful");

        window.location.href =
            "index.html";

    } else {

        alert("Invalid Email or Password");

    }
}


/* ==========================
   LOGOUT
========================== */

function logout() {

    localStorage.removeItem("loggedIn");

    alert("Logged Out Successfully");

    window.location.href =
        "index.html";
}


/* ==========================
   CART
========================== */

let cart =
    JSON.parse(
        localStorage.getItem("cart")
    ) || [];

function addToCart(name, price, image, features, specs) {

    let item = cart.find(p => p.name === name);

    if (item) {
        item.qty++;
    } else {
        cart.push({
            name,
            price,
            image,
            features,
            specs,
            qty: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Added To Cart");
}


function displayCart() {

    const cartContainer =
        document.getElementById("cartItems");

    if (!cartContainer) return;

    cartContainer.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {

        total += item.price * item.qty;

        cartContainer.innerHTML += `

        <div class="cart-card">

            <div class="cart-img">
                <img src="images/product${index + 1}.jpg" alt="${item.name}">
            </div>

            <div class="cart-info">

                <h2>${item.name}</h2>

                <p class="price">₹${item.price}</p>

                <div class="qty-box">

                    <button onclick="decreaseQty(${index})">-</button>

                    <span>${item.qty}</span>

                    <button onclick="increaseQty(${index})">+</button>

                </div>

                <button class="remove-btn" onclick="removeItem(${index})">
                    Remove
                </button>

            </div>

        </div>

        `;
    });

    cartContainer.innerHTML += `
        <div class="cart-total">
            Total: ₹${total}
        </div>
    `;
}


function increaseQty(index) {

    cart[index].qty++;

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    displayCart();
}


function decreaseQty(index) {

    if (cart[index].qty > 1) {

        cart[index].qty--;

    } else {

        cart.splice(index, 1);

    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    displayCart();
}

function removeItem(index){

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();
}


/* ==========================
   WISHLIST
========================== */

let wishlist =
    JSON.parse(
        localStorage.getItem("wishlist")
    ) || [];

function addToWishlist(name, price) {

    wishlist.push({
        name,
        price
    });

    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );

    alert("Added To Wishlist");
}


function displayWishlist() {

    const wishlistBox =
        document.getElementById("wishlistItems");

    if (!wishlistBox) return;

    wishlistBox.innerHTML = "";

    wishlist.forEach((item) => {

        wishlistBox.innerHTML += `

        <div class="card">

            <h3>${item.name}</h3>

            <p>₹${item.price}</p>

        </div>

        `;
    });
}


/* ==========================
   PROFILE
========================== */

function loadProfile() {

    const user =
        JSON.parse(
            localStorage.getItem("user")
        );

    if (!user) return;

    const profileName =
        document.getElementById("profileName");

    const profileEmail =
        document.getElementById("profileEmail");

    const profilePhone =
        document.getElementById("profilePhone");

    const profileAddress =
        document.getElementById("profileAddress");

    if(profileName)
        profileName.value = user.name || "";

    if(profileEmail)
        profileEmail.value = user.email || "";

    if(profilePhone)
        profilePhone.value = user.phone || "";

    if(profileAddress)
        profileAddress.value = user.address || "";

    const profilePreview =
        document.getElementById("profilePreview");

    const savedImage =
        localStorage.getItem("profileImage");

    if(profilePreview && savedImage){
        profilePreview.src = savedImage;
    }
}

/* ==========================
   CHECKOUT
========================== */

function placeOrder(){

const cart =
JSON.parse(
localStorage.getItem(
"cart"
)
) || [];

localStorage.setItem(
"orders",
JSON.stringify(cart)
);

alert(
"Order Placed Successfully!"
);

localStorage.removeItem(
"cart"
);

window.location.href =
"profile.html";

}


/* ==========================
   CONTACT FORM
========================== */

function sendMessage() {

    alert(
        "Message Sent Successfully!"
    );

}


/* ==========================
   PAGE LOAD
========================== */


/* ==========================
   SHOW PROFILE AFTER LOGIN
========================== */

function showUserSection() {

    const userSection =
        document.getElementById("userSection");

    if (!userSection) return;

    const isLoggedIn =
        localStorage.getItem("loggedIn");

    if (isLoggedIn === "true") {

        const user =
            JSON.parse(
                localStorage.getItem("user")
            );

        userSection.innerHTML = `

        <div class="account-menu">

            <div class="account-btn">
                👋 Hello,
                ${user.name}
            </div>

            <div class="dropdown-content">

                <a href="profile.html">
                My Profile
                </a>

                <a href="wishlist.html">
                Wishlist
                </a>

                <a href="cart.html">
                Cart
                </a>

                <a href="#"
                onclick="logout()">
                Logout
                </a>

            </div>

        </div>

        `;
    }
}

/* ==========================
   SAVE PROFILE
========================== */

function saveProfile() {

    const updatedUser = {

        name:
        document.getElementById(
        "profileName").value,

        email:
        document.getElementById(
        "profileEmail").value,

        phone:
        document.getElementById(
        "profilePhone").value,

        address:
        document.getElementById(
        "profileAddress").value,

        password:
        JSON.parse(
        localStorage.getItem("user")
        )?.password || ""

    };

    localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
    );

    alert(
    "Profile Updated Successfully"
    );

}

/* PROFILE IMAGE */

function uploadProfileImage(event){

const file =
event.target.files[0];

if(!file) return;

const reader =
new FileReader();

reader.onload = function(e){

document.getElementById(
"profilePreview"
).src = e.target.result;

localStorage.setItem(
"profileImage",
e.target.result
);

};

reader.readAsDataURL(file);
}

/* CHANGE PASSWORD */

function changePassword(){

const password =
document.getElementById(
"newPassword"
).value;

if(password === ""){
alert(
"Enter New Password"
);
return;
}

let user =
JSON.parse(
localStorage.getItem(
"user"
)
);

user.password =
password;

localStorage.setItem(
"user",
JSON.stringify(user)
);

alert(
"Password Updated"
);

}

/* ORDER HISTORY */

function loadOrders(){

const box =
document.getElementById(
"orderHistory"
);

if(!box) return;

const orders =
JSON.parse(
localStorage.getItem(
"orders"
)
) || [];

if(
orders.length === 0
){
box.innerHTML =
"No Orders Yet";
return;
}

box.innerHTML = "";

orders.forEach(order=>{

box.innerHTML += `

<div class="cart-item">

<h4>
${order.name}
</h4>

<p>
₹${order.price}
</p>

</div>

`;

});
}

/* ==========================
   PROFILE IMAGE UPLOAD
========================== */

function uploadProfileImage(event){

const file =
event.target.files[0];

if(!file) return;

const reader =
new FileReader();

reader.onload = function(e){

document.getElementById(
"profilePreview"
).src = e.target.result;

localStorage.setItem(
"profileImage",
e.target.result
);

};

reader.readAsDataURL(file);
}

/* ==========================
   PRODUCT DETAILS
========================== */

function loadProduct(){

const params =
new URLSearchParams(window.location.search);
const id =
params.get("id");

if(!id) return;

const products = {

1:{
name:"Smart Watch",
price:1999,
image:"images/product1.jpg",
features:[
"Heart Rate Monitor",
"Fitness Tracking",
"Water Resistant"
],
specs:
"AMOLED Display | Battery 7 Days"
},

2:{
name:"Wireless Headphones",
price:2999,
image:"images/product2.jpg",
features:[
"Bluetooth 5.3",
"Noise Cancellation",
"40 Hour Battery"
],
specs:
"Brand: Sony | Color: Black | Weight: 250g"
},

3:{
name:"Shoes",
price:999,
image:"images/product3.jpg",
features:[
"Midsole Cushioning",
"Breathable Material",
"Durable Outsole"
],
specs:
"Available in Sizes 6-12"
},

4:{
name:"Laptop Bag",
price:1499,
image:"images/product4.jpg",
features:[
"Water Resistant",
"Large Storage",
"Comfortable Strap"
],
specs:
"Fits 15.6 inch Laptop"
},


5:{
name:"Speaker",
price:799,
image:"images/product5.jpg",
features:[
"Deep Bass",
"12 Hour Battery",
"Portable"
],
specs:
"Bluetooth 5.0"
},

6:{
name:"Mobile Phone",
price:2499,
image:"images/product6.jpg",
features:[
"128GB Storage",
"8GB RAM",
"5000mAh Battery"
],
specs:
"Android 15"
},

7:{
name:"Wireless Mouse",
price:14999,
image:"images/product7.jpg",
features:[
"Ergonomic Design",
"Silent Click",
"Long Battery Life"
],
specs:
"2.4GHz Wireless"
},

8:{
name:"Perfume",
price:1299,
image:"images/product8.jpg",
features:[
"Long Lasting",
"Pleasant Fragrance",
"Elegant Bottle"
],
specs:
"100ml | Unisex"
},

9:{
name:"Sunglasses",
price:299,
image:"images/product9.jpg",
features:[
"UV Protection",
"Stylish Design",
"Lightweight"
],
specs:
"Polarized Lenses"
},

10:{
name:"School Bag",
price:9999,
image:"images/product10.jpg",
features:[
"Spacious Compartments",
"Durable Material",
"Comfortable Straps"
],
specs:
"Fits Laptops up to 17 inch"
},

11:{
name:"Keyboard",
price:6999,
image:"images/product11.jpg",
features:[
"Mechanical Keys",
"RGB Backlight",
"Ergonomic Design"
],
specs:
"USB Wired"
},

12:{
name:"Wireless earbuds",
price:1999,
image:"images/product12.jpg",
features:[
"Bluetooth 5.2",
"Noise Cancellation",
"24 Hour Battery"
],
specs:
"True Wireless"
},

13:{
name:"Water Bottle",
price:2499,
image:"images/product13.jpg",
features:[
"Insulated",
"Keeps Drinks Cold for 24 Hours",
"Durable Stainless Steel"
],
specs:
"500ml Capacity"
},

14:{
name:"Office chair",
price:3499,
image:"images/product14.jpg",
features:[
"Ergonomic Design",
"Lumbar Support",
"Adjustable Height"
],
specs:
"Mesh Back | Weight Capacity: 250 lbs"
},

15:{
name:"Camera",
price:54999,
image:"images/product15.jpg",
features:[
"High Resolution",
"4K Video Recording",
"Optical Zoom"
],
specs:
"24MP | 3x Optical Zoom"
}

};

const product = products[id];

if(!product) return;

const nameBox =
document.getElementById("productName");

if(nameBox){
nameBox.innerText = product.name;
}

const priceBox =
document.getElementById("productPrice");

if(priceBox){
priceBox.innerText = "₹" + product.price;
}

const imageBox =
document.getElementById("productImage");

if(imageBox){
imageBox.src = product.image;
}

const specsBox =
document.getElementById("productSpecs");

if(specsBox){
specsBox.innerText = product.specs;
}

const featureBox =
document.getElementById("productFeatures");

if(featureBox){

featureBox.innerHTML = "";

product.features.forEach(feature => {

featureBox.innerHTML +=
`<li>${feature}</li>`;

});

}

document.getElementById("cartBtn").onclick =
function(){

addToCart(
product.name,
product.price
);

};

}

window.onload = function () {

    if(typeof displayCart === "function"){
        displayCart();
    }

    if(typeof displayWishlist === "function"){
        displayWishlist();
    }

    if(typeof loadProfile === "function"){
        loadProfile();
    }

    if(typeof loadOrders === "function"){
        loadOrders();
    }

    if(typeof showUserSection === "function"){
        showUserSection();
    }

    if(typeof loadProduct === "function"){
        loadProduct();
    }

};

