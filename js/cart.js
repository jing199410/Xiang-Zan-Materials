// cart.js

document.addEventListener('DOMContentLoaded', function () {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  function updateCartDisplay() {
    const cartContainer = document.getElementById('cart-items');
    const totalElement = document.getElementById('cart-total');
    const quantityElement = document.getElementById('cart-quantity');

    if (!cartContainer || !totalElement) return;

    cartContainer.innerHTML = '';
    let total = 0;
    cart.forEach((item, index) => {
      const itemDiv = document.createElement('div');
      itemDiv.innerHTML = `
        <div class="cart-item">
          <strong>${item.name}</strong> - $${item.price} × ${item.quantity}
          <button data-index="${index}" class="remove-btn">移除</button>
        </div>
      `;
      cartContainer.appendChild(itemDiv);
      total += item.price * item.quantity;
    });

    totalElement.textContent = '總計：$' + total;
    if (quantityElement) {
    quantityElement.textContent = '商品數量：' + totalQuantity;
};
  }

  // 對外提供此函式：可從其他頁面使用
  window.addToCart = function (product) {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    saveCart();
    updateCartDisplay();
  }

  // 支援按鈕 data 屬性加入
  const buttons = document.querySelectorAll('.add-to-cart');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const name = btn.dataset.name;
      const price = parseInt(btn.dataset.price);
      window.addToCart({ id, name, price });
    });
  });

  // 移除購物車項目
  document.addEventListener('click', function (e) {
    if (e.target.classList.contains('remove-btn')) {
      const index = parseInt(e.target.dataset.index);
      cart.splice(index, 1);
      saveCart();
      updateCartDisplay();
    }
  });

  // 頁面載入時更新購物車
  updateCartDisplay();
});
