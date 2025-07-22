
document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  const container = document.getElementById("product-container");

  if (!productId) {
    container.innerHTML = "<p>無效的商品連結。</p>";
    return;
  }

  try {
    const res = await fetch("products.json");
    const products = await res.json();
    const product = products.find(p => p.id === productId);

    if (!product) {
      container.innerHTML = "<p>找不到該商品。</p>";
      return;
    }

    const images = product.images && product.images.length
      ? product.images
      : [product.image];

    const imageGallery = images.map((img, idx) =>
      `<a href="\${img}" class="glightbox" data-gallery="product">
        <img src="\${img}" alt="\${product.name} \${idx + 1}" class="detail-img" />
      </a>`
    ).join("");

    container.innerHTML = `
      <div class="detail-box">
        <div class="detail-gallery">
          \${imageGallery}
        </div>
        <div class="detail-content">
          <h2>\${product.name}</h2>
          <p class="detail-price">價格：NT$\${product.price}</p>
          <p class="detail-desc">\${product.description || "商品說明將在此顯示。"}</p>
          <div class="detail-actions">
            <input type="number" id="qty" min="1" value="1"/>
            <button onclick="addToCart('\${product.id}')">加入購物車</button>
          </div>
        </div>
      </div>
    `;

    GLightbox({ selector: ".glightbox" });
  } catch (error) {
    container.innerHTML = "<p>載入商品資料時發生錯誤。</p>";
  }
});

function addToCart(id) {
  const qty = parseInt(document.getElementById("qty").value, 10);
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id, qty });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("已加入購物車！");
}
