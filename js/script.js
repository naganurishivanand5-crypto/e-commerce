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

function addToCart(name, price) {

    let item =
        cart.find(
            product => product.name === name
        );

    if (item) {

        item.qty++;

    } else {

        cart.push({
            name: name,
            price: price,
            qty: 1
        });

    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    alert("Added To Cart");
}


function displayCart() {

    const cartContainer =
        document.getElementById("cartItems");

    if (!cartContainer) return;

    cartContainer.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {

        total +=
            item.price * item.qty;

        cartContainer.innerHTML += `

        <div class="cart-item">

            <div>
                <h3>${item.name}</h3>
                <p>₹${item.price}</p>
            </div>

            <div>

                <button
                class="qty-btn"
                onclick="decreaseQty(${index})">
                -
                </button>

                <span>
                ${item.qty}
                </span>

                <button
                class="qty-btn"
                onclick="increaseQty(${index})">
                +
                </button>

            </div>

        </div>

        `;
    });

    cartContainer.innerHTML += `

        <div class="total-box">
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