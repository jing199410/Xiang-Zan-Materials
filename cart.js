
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


function renderCart() {
  const cartList = document.getElementById("cart-items");
  const cartData = JSON.parse(localStorage.getItem("cart")) || [];
  cartList.innerHTML = "";

  cartData.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `${item.name} - NT$${item.price} x ${item.quantity || 1}`;
    cartList.appendChild(li);
  });

  const total = cartData.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
  document.getElementById("cart-total").textContent = `總計：NT$${total}`;

  const footer = document.getElementById("cart-footer");
  if (footer) {
    footer.innerHTML = `<button onclick="window.location.href='checkout.html'">前往結帳</button>`;
  }
}
