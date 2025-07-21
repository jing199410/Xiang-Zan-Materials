
let products = [];
let filtered = [];
let currentPage = 1;
const perPage = 10;

fetch("products.json")
  .then(res => res.json())
  .then(data => {
    products = data;
    filtered = [...products];
    renderCategories();
    render();
  });

function renderCategories() {
  const categories = [...new Set(products.map(p => p.category))];
  const container = document.getElementById("categories");
  container.innerHTML = '<button onclick="filterCategory(\'全部\')">全部</button>' +
    categories.map(c => `<button onclick="filterCategory('${c}')">${c}</button>`).join("");
}

function filterCategory(cat) {
  document.getElementById("searchInput").value = "";
  if (cat === "全部") {
    filtered = [...products];
  } else {
    filtered = products.filter(p => p.category === cat);
  }
  currentPage = 1;
  render();
}

document.getElementById("searchInput").addEventListener("input", e => {
  const q = e.target.value.toLowerCase();
  filtered = products.filter(p => p.name.toLowerCase().includes(q));
  currentPage = 1;
  render();
});

document.getElementById("sortSelect").addEventListener("change", e => {
  const v = e.target.value;
  if (v === "asc") filtered.sort((a, b) => a.price - b.price);
  else if (v === "desc") filtered.sort((a, b) => b.price - a.price);
  render();
});

function render() {
  const list = document.getElementById("productList");
  const start = (currentPage - 1) * perPage;
  const paged = filtered.slice(start, start + perPage);
  list.innerHTML = paged.map(p => {
    const input = p.rental ? `<input type='number' min='1' placeholder='租借天數' id='days-${p.id}'/>` : '';
    return `<div class="card">
      <div class="name">${p.name}</div>
      <div class="price">NT$ ${p.price}${p.rental ? "／日" : ""}</div>
      ${input}
      <button onclick="addToCart(${p.id})">加入購物車</button>
    </div>`;
  }).join("");

  const totalPages = Math.ceil(filtered.length / perPage);
  const pageDiv = document.getElementById("pagination");
  pageDiv.innerHTML = "";
  for (let i = 1; i <= totalPages; i++) {
    pageDiv.innerHTML += `<button onclick="goPage(${i})"${i === currentPage ? ' class="active"' : ''}>${i}</button>`;
  }
}

function goPage(p) {
  currentPage = p;
  render();
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  let days = 1;
  if (product.rental) {
    const input = document.getElementById("days-" + id);
    days = parseInt(input.value);
    if (!days || days < 1) {
      alert("請輸入正確租借天數");
      return;
    }
  }
  const total = product.price * days;
  alert(`已加入購物車：${product.name} ${product.rental ? `（租 ${days} 天，共 NT$${total}）` : ""}`);
}
