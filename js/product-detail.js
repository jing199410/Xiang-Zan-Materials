document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");
  const container = document.getElementById("product-container");

  if (!productId) {
    container.innerHTML = "<p>無效的商品連結。</p>";
    return;
  }

  try {
    const res = await fetch('/Xiang-Zan-Materials/products.json');
   
    const products = await res.json();
   
    console.log(products);
    const product = products.find(p => p.id === productId);

    if (!product) {
      container.innerHTML = "<p>找不到該商品。</p>";
      return;
    }

    let images = [];
    if (Array.isArray(product.img)) {
      images = product.img;
    } else if (typeof product.img === "string" && product.img.trim() !== "") {
      images = [product.img];
    } else {
      images = ["assets/img/placeholder.jpg"]; // 預設圖片
    }

    const imageGallery = images.map((img, idx) =>
      `<a href="${img}" class="glightbox" data-gallery="product">
        <img src="${img}" alt="${product.id} ${idx + 1}" class="detail-img" />
      </a>`
    ).join("");

    container.innerHTML = `
      <div class="detail-box">
        <div class="detail-gallery">
          ${imageGallery}
        </div>
        <div class="detail-content">
          <h2>${product.name}</h2>
          <p class="detail-price">價格：NT$${product.price.toLocaleString()}</p>

          <div class="detail-specs">
            <h3>商品規格</h3>
            <table id="spec-table"></table>
          </div>

          <p class="detail-desc">${product.description || "商品說明將在此顯示。"}</p>

          <div class="detail-rental" id="rental-box" style="display:none;">
            <label>租借天數：
              <input type="number" id="rental-days" value="1" min="1" />
            </label>
            <p id="rental-total">總計：NT$0</p>
          </div>

          <div class="detail-actions">
            <input type="number" id="qty" min="1" value="1"/>
            <button onclick="addToCart('${product.id}')">加入購物車</button>
          </div>
        </div>
      </div>
    `;

    // 啟動圖片燈箱
    if (typeof GLightbox === "function") {
      GLightbox({ selector: ".glightbox" });
    }

    // 處理租借功能
    if (product.rental) {
      const pricePerDay = product.price;
      const rentalBox = document.getElementById("rental-box");
      const daysInput = document.getElementById("rental-days");
      const totalDisplay = document.getElementById("rental-total");

      rentalBox.style.display = "block";

      const updateTotal = () => {
        const days = parseInt(daysInput.value, 10) || 1;
        totalDisplay.textContent = `總計：NT$${(pricePerDay * days).toLocaleString()}`;
      };
      daysInput.addEventListener("input", updateTotal);
      updateTotal();
    }

    // 填寫規格表
    if (product.specs) {
      const table = document.getElementById("spec-table");
      table.innerHTML = Object.entries(product.specs)
        .map(([key, val]) => `<tr><th>${key}</th><td>${val}</td></tr>`)
        .join("");
    }

  } catch (error) {
    console.error("商品資料載入失敗：", error);
    container.innerHTML = "<p>載入商品資料時發生錯誤。</p>";
  }
});

// 加入購物車
/*function addToCart(id) {
  const qty = parseInt(document.getElementById("qty").value, 10) || 1;
  const daysInput = document.getElementById("rental-days");
  const days = daysInput ? parseInt(daysInput.value, 10) : undefined;

  const cart = JSON.parse(localStorage.getItem("cart_B")) || [];
  const existing = cart.find(item => item.id === id && item.days === days);

  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id, qty, days });
  }

  localStorage.setItem("cart_B", JSON.stringify(cart));
  alert("已加入購物車！");
}
  function updateCartDisplay() {
}*/
  function updateCartDisplay() {
  const cartContainer = document.getElementById('cart-items');
  const totalElement = document.getElementById('cart-total');
  //const quantityElement = document.getElementById('cart-quantity'); // 確認有此元素

  if (!cartContainer || !totalElement) return;

  cartContainer.innerHTML = '';
  let total = 0;
  let totalQuantity = 0;

  if (cart.length === 0) {
    cartContainer.innerHTML = '<p>購物車是空的</p>';
  }

  cart.forEach((item, index) => {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('cart-item');
    itemDiv.innerHTML = `
      <img src="${item.img || 'assets/img/default.jpg'}" alt="${item.name}" />
      <div class="cart-item-info">
        <h3>${item.name}</h3>
        <p>$${Number(item.price)} × ${Number(item.quantity)}</p>
      </div>
      <button data-index="${index}" class="remove-btn">✕</button>
    `;
    cartContainer.appendChild(itemDiv);
    total += Number(item.price) * Number(item.quantity);
    totalQuantity += Number(item.quantity);
  });

  totalElement.textContent = '總計：$' + total.toLocaleString();

  if (quantityElement) {
    quantityElement.textContent = '商品數量：' + totalQuantity;
  }

  // 同時更新右上購物車小徽章數量（若有的話）
  const cartCount = document.getElementById('cart-count');
  if (cartCount) cartCount.textContent = totalQuantity;
}

 // 加入商品函式（可從其他頁面調用）
  window.addToCart = function (product) {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    saveCart();
    updateCartDisplay();
  };


  // 綁定 .add-to-cart 按鈕（用於商品頁）
  const buttons = document.querySelectorAll('.add-to-cart');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const name = btn.dataset.name;
      const price = parseInt(btn.dataset.price);
      const img = btn.dataset.img;
      window.addToCart({ id, name, price, img });
    });
  });
