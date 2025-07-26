document.addEventListener('DOMContentLoaded', function () {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

/*  function updateCartDisplay() {
    const cartContainer = document.getElementById('cart-items');
    const totalElement = document.getElementById('cart-total');
    const quantityElement = document.getElementById('cart-quantity');

    if (!cartContainer || !totalElement) return;

    cartContainer.innerHTML = '';
    let total = 0;
    let totalQuantity = 0;

    cart.forEach((item, index) => {
      const itemDiv = document.createElement('div');
      itemDiv.classList.add('cart-item');
      itemDiv.innerHTML = `
        <img src="${item.img || 'assets/img/default.jpg'}" alt="${item.name}" />
        <div class="cart-item-info">
          <h3>${item.name}</h3>
          <p>$${item.price} × ${item.quantity}</p>
        </div>
        <button data-index="${index}" class="remove-btn">✕</button>
      `;
      cartContainer.appendChild(itemDiv);
      total += item.price * item.quantity;
      totalQuantity += item.quantity;
    });

    totalElement.textContent = '總計：$' + total;
    if (quantityElement) {
      quantityElement.textContent = '商品數量：' + totalQuantity;
    }
  }
*/
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

  // 刪除項目
  document.addEventListener('click', function (e) {
    if (e.target.classList.contains('remove-btn')) {
      const index = parseInt(e.target.dataset.index);
      cart.splice(index, 1);
      saveCart();
      updateCartDisplay();
    }
  });

  // 初始顯示
  updateCartDisplay();
});
