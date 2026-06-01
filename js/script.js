let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price){

let item = cart.find(p=>p.name===name);

if(item){
item.qty++;
}
else{
cart.push({
name:name,
price:price,
qty:1
});
}

localStorage.setItem("cart",JSON.stringify(cart));

alert("Added To Cart");
}

function displayCart(){

let container=document.getElementById("cartItems");

if(!container) return;

container.innerHTML="";

cart.forEach((item,index)=>{

container.innerHTML+=`
<div class="card">
<h3>${item.name}</h3>
<p>₹${item.price}</p>

<button onclick="decrease(${index})">-</button>

<span>${item.qty}</span>

<button onclick="increase(${index})">+</button>

</div>
`;
});
}

function increase(index){
cart[index].qty++;
localStorage.setItem("cart",JSON.stringify(cart));
location.reload();
}

function decrease(index){

if(cart[index].qty>1){
cart[index].qty--;
}
else{
cart.splice(index,1);
}

localStorage.setItem("cart",JSON.stringify(cart));
location.reload();
}

displayCart();

function register(){

let email=document.getElementById("regEmail").value;
let password=document.getElementById("regPassword").value;

localStorage.setItem("email",email);
localStorage.setItem("password",password);

alert("Registered Successfully");

window.location.href="login.html";
}

function login(){

let email=document.getElementById("email").value;
let password=document.getElementById("password").value;

let savedEmail=localStorage.getItem("email");
let savedPassword=localStorage.getItem("password");

if(email===savedEmail && password===savedPassword){
window.location.href="index.html";
}
else{
alert("New User! Please Register First");
window.location.href="register.html";
}
}

document.getElementById("themeBtn")?.addEventListener("click",()=>{

document.body.classList.toggle("dark");
});

document.getElementById("searchInput")?.addEventListener("keyup",function(){

let value=this.value.toLowerCase();

let cards=document.querySelectorAll(".card");

cards.forEach(card=>{

let text=card.innerText.toLowerCase();

card.style.display=text.includes(value)
? "block"
: "none";

});
});