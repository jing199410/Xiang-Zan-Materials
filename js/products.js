
document.addEventListener("DOMContentLoaded", async () => {
  const list = document.getElementById("product-list");
  const categoryFilter = document.getElementById("category-filter");
  const sortFilter = document.getElementById("sort-filter");

  try {
    const res = await fetch("products.json");
    const products = await res.json();

    // 取得所有分類
    const categories = Array.from(new Set(products.map(p => p.category))).sort();
    categories.forEach(cat => {
      const option = document.createElement("option");
      option.value = cat;
      option.textContent = cat;
      categoryFilter.appendChild(option);
    });

    let filtered = [...products];

    const render = () => {
      const selectedCategory = categoryFilter.value;
      const sortBy = sortFilter.value;

      let shown = [...filtered];

      if (selectedCategory !== "全部") {
        shown = shown.filter(p => p.category === selectedCategory);
      }

      if (sortBy === "price-asc") {
        shown.sort((a, b) => a.price - b.price);
      } else if (sortBy === "price-desc") {
        shown.sort((a, b) => b.price - a.price);
      }

      list.innerHTML = shown.map(p => `
        <div class="product-card" data-aos="fade-up">
          <a href="product.html?id=${p.id}">
           <!--<img src="${p.image}" alt="${p.name}" />-->
            <img src="${p.img}" alt="${p.name}" data-id="${p.id}" onerror="this.src='assets/img/鋁梯.jpg'" />

          </a>
          <div class="info">
            <h3>${p.name}</h3>
            <p>NT$${p.price}</p>
            <button onclick="addToCart('${p.id}')">加入購物車</button>
          </div>
        </div>
      `).join("");
    };

    categoryFilter.addEventListener("change", render);
    sortFilter.addEventListener("change", render);

    render();
  } catch (err) {
    list.innerHTML = "<p>載入商品時發生錯誤。</p>";
  }
});

function addToCart(id) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id, qty: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("已加入購物車！");
}
