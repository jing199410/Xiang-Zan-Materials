
const categories = [
  "全部", "水泥", "五金", "油漆黏劑類",
  "土木工具", "手工具類", "電動工具",
  "器材租借", "地板壁材", "實木板材"
];

const products = [
  { id: 1, name: "台泥水泥 50kg", price: 200, category: "水泥" },
  { id: 2, name: "五金螺絲組", price: 120, category: "五金" },
  { id: 3, name: "立邦水泥漆 白 5L", price: 800, category: "油漆黏劑類" },
  { id: 4, name: "鷹架組（每日）", price: 300, category: "器材租借", isRental: true }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderProducts(filter = "全部") {
  const container = document.getElementById("product-list");
  if (!container) return;
  container.innerHTML = "";
  const filtered = filter === "全部" ? products : products.filter(p => p.category === filter);
  filtered.forEach(p => {
    const div = document.createElement("div");
    div.className = "product-card";
    div.innerHTML = `
      <h3>${p.name}</h3>
      <p>價格: NT$${p.price}${p.isRental ? " /日" : ""}</p>
      ${p.isRental ? '<input type="number" min="1" value="1" id="days-'+p.id+'" placeholder="租借天數">' : ""}
      <button onclick="addToCart(${p.id})">加入購物車</button>
    `;
    container.appendChild(div);
  });
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(item => item.id === id);
  let days = 1;
  if (product.isRental) {
    const dayInput = document.getElementById("days-" + id);
    days = parseInt(dayInput.value) || 1;
  }
  if (existing) {
    existing.qty += 1;
    if (product.isRental) existing.days = days;
  } else {
    cart.push({ ...product, qty: 1, days });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("已加入購物車");
}

function renderCategories() {
  const catList = document.getElementById("category-list");
  if (!catList) return;
  categories.forEach(cat => {
    const btn = document.createElement("button");
    btn.innerText = cat;
    btn.onclick = () => renderProducts(cat);
    catList.appendChild(btn);
  });
}

function renderCart() {
  const container = document.getElementById("cart-items");
  if (!container) return;
  container.innerHTML = "";
  let total = 0;
  cart.forEach(item => {
    const subtotal = item.isRental ? item.price * item.days * item.qty : item.price * item.qty;
    total += subtotal;
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <h3>${item.name}</h3>
      <p>數量: ${item.qty}</p>
      ${item.isRental ? `<p>租期: ${item.days} 天</p>` : ""}
      <p>小計: NT$${subtotal}</p>
    `;
    container.appendChild(div);
  });
  const totalElem = document.getElementById("cart-total");
  if (totalElem) totalElem.innerText = "總金額: NT$" + total;
}

document.addEventListener("DOMContentLoaded", () => {
  renderCategories();
  renderProducts();
  renderCart();
});
