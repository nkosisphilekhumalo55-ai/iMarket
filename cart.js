import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_DOMAIN",
  projectId: "YOUR_PROJECT"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc, getDocs, deleteDoc, doc };import { addDoc, collection } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

async function saveOrder(cart, total) {
  await addDoc(collection(db, "orders"), {
    items: cart,
    total: total,
    date: new Date().toISOString()
  });
}import { getDocs, collection } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

async function loadAnalytics() {
  const snapshot = await getDocs(collection(db, "orders"));

  let totalOrders = 0;
  let revenue = 0;

  snapshot.forEach(doc => {
    const order = doc.data();
    totalOrders++;
    revenue += Number(order.total);
  });

  document.getElementById("ordersCount").innerText = totalOrders;
  document.getElementById("revenue").innerText = "R" + revenue;
  document.getElementById("profit").innerText = "R" + (revenue * 0.3);
}

loadAnalytics();const defaultProducts = [
  // 📱 iPhone XR
  { name: "iPhone XR - Black", price: 5999, image: "https://images.unsplash.com/photo-1580910051074-3eb694886505" },
  { name: "iPhone XR - White", price: 5999, image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97" },
  { name: "iPhone XR - Blue",  price: 5999, image: "https://images.unsplash.com/photo-1556656793-08538906a9f8" },

  // 📱 iPhone 11
  { name: "iPhone 11 - Black", price: 6999, image: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0" },
  { name: "iPhone 11 - Purple", price: 6999, image: "https://images.unsplash.com/photo-1580910051074-3eb694886505" },
  { name: "iPhone 11 - Red", price: 6999, image: "https://images.unsplash.com/photo-1583394838336-acd977736f90" },

  // 📱 iPhone 12
  { name: "iPhone 12 - Black", price: 8999, image: "https://images.unsplash.com/photo-1603891128711-11b4b6b6a5b2" },
  { name: "iPhone 12 - Blue", price: 8999, image: "https://images.unsplash.com/photo-1607936854279-55e8c1f4c3b0" },
  { name: "iPhone 12 - White", price: 8999, image: "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7" },

  // 📱 iPhone 13
  { name: "iPhone 13 - Pink", price: 10999, image: "https://images.unsplash.com/photo-1632661674596-618c6c9c6f42" },
  { name: "iPhone 13 - Blue", price: 10999, image: "https://images.unsplash.com/photo-1632661674823-5c2a5f4c8d5a" },
  { name: "iPhone 13 - Midnight", price: 10999, image: "https://images.unsplash.com/photo-1632661674596-618c6c9c6f42" },

  // 📱 iPhone 14
  { name: "iPhone 14 - Purple", price: 13999, image: "https://images.unsplash.com/photo-1663696347092-9b5a7a4f5c2c" },
  { name: "iPhone 14 - Blue", price: 13999, image: "https://images.unsplash.com/photo-1663696347092-9b5a7a4f5c2c" },
  { name: "iPhone 14 - Red", price: 13999, image: "https://images.unsplash.com/photo-1663696347092-9b5a7a4f5c2c" },

  // 📱 iPhone 15
  { name: "iPhone 15 - Black", price: 17999, image: "https://images.unsplash.com/photo-1695048133142-1f3d5c2b2b5a" },
  { name: "iPhone 15 - Blue", price: 17999, image: "https://images.unsplash.com/photo-1695048133142-1f3d5c2b2b5a" },
  { name: "iPhone 15 - Pink", price: 17999, image: "https://images.unsplash.com/photo-1695048133142-1f3d5c2b2b5a" },

  // 📱 iPhone 16 (future-ready placeholder)
  { name: "iPhone 16 - Black", price: 21999, image: "https://images.unsplash.com/photo-1695048133142-1f3d5c2b2b5a" },
  { name: "iPhone 16 - White", price: 21999, image: "https://images.unsplash.com/photo-1695048133142-1f3d5c2b2b5a" },
  { name: "iPhone 16 - Titanium", price: 21999, image: "https://images.unsplash.com/photo-1695048133142-1f3d5c2b2b5a" }
];let value = document.getElementById("searchInput").value.toLowerCase();

let filtered = products.filter(p =>
p.name.toLowerCase().includes(value)
);

function renderProducts(list = products) {

let html = "";

list.forEach((p, i) => {

html += `
<div class="card">

<img src="${p.image}" class="phone">

<h4>${p.name}</h4>
<p>R${p.price}</p>

<button onclick="addToCart('${p.name}')">
Add to Cart
</button>

</div>
`;

});

document.getElementById("products").innerHTML = html;
}

renderProducts();<script>
function toggleCart() {
  document.getElementById("cartDrawer").classList.toggle("open");
  renderCart();
}

function renderCart() {
  let itemsBox = document.getElementById("cartItems");
  let totalBox = document.getElementById("cartTotal");

  itemsBox.innerHTML = "";

  let total = 0;

  cart.forEach(item => {
    total += item.price * item.qty;

    let div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      ${item.name}  
      <br>
      R${item.price} × ${item.qty}
    `;
    itemsBox.appendChild(div);
  });

  totalBox.innerHTML = "<b>Total: R" + total + "</b>";
}
</script>function addToCart(name, price) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let existing = cart.find(item => item.name === name);

  if (existing) {
    existing.qty = (existing.qty || 1) + 1;
  } else {
    cart.push({
      name: name,
      price: price,
      qty: 1
    });
  }function sendCartToWhatsApp() {

let cart = JSON.parse(localStorage.getItem("cart")) || [];

if (cart.length === 0) {
alert("Your cart is empty!");
return;
}

let message = "🛒 *iMarket Order*%0A%0A";

let total = 0;

cart.forEach((item, index) => {
message += `${index + 1}. ${item.name} - R${item.price}%0A`;
total += Number(item.price);
});

message += `%0A💰 *Total: R${total}*%0A`;
message += `%0A📦 Please confirm my order.`;

let phone = "27706418906";

let url = `https://wa.me/${phone}?text=${message}`;

window.open(url, "_blank");

}

  localStorage.setItem("cart", JSON.stringify(cart));
}function createAccount(){

let email = document.querySelector('input[type="email"]').value;
let password = document.querySelector('input[type="password"]').value;

localStorage.setItem("userEmail", email);
localStorage.setItem("userPassword", password);

alert("Account created!");

}