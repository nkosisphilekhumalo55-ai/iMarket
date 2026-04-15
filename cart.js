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

loadAnalytics();