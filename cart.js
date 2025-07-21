
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(id) {
  const product = allProducts.find(p => p.id === id);
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ id: product.id, name: product.name, price: product.price, quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartIcon();
}

function updateCartIcon() {
  const total = cart.reduce((sum, item) => sum + item.quantity, 0);
  const icon = document.getElementById("cart-count");
  if (icon) icon.innerText = total;
}

function toggleCartPopup() {
  const popup = document.getElementById("cart-popup");
  if (popup) popup.classList.toggle("show");
  renderCartItems();
}

function renderCartItems() {
  const popup = document.getElementById("cart-items");
  if (!popup) return;
  if (cart.length === 0) {
    popup.innerHTML = "<p>購物車是空的</p>";
    return;
  }
  popup.innerHTML = cart.map(item => `
    <div class="cart-item">
      ${item.name} x ${item.quantity} - NT$ ${item.price * item.quantity}
      <button onclick="removeFromCart(${item.id})">刪除</button>
    </div>
  `).join('');
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartIcon();
  renderCartItems();
}

window.onload = updateCartIcon;
