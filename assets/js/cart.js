
document.addEventListener('DOMContentLoaded', () => {
    const cartContainer = document.getElementById('cart-container');
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>購物車是空的。</p>';
        return;
    }

    let html = '<ul>';
    let total = 0;
    cart.forEach((item, index) => {
        let subTotal = item.isRental ? item.dailyPrice * item.days : item.price * item.quantity;
        total += subTotal;
        html += `<li>
            <strong>${item.name}</strong><br>
            ${item.isRental ? '每日價格：' + item.dailyPrice + ' × 天數：<input type="number" min="1" value="' + item.days + '" onchange="updateDays(${index}, this.value)">' :
            '單價：' + item.price + ' × 數量：<input type="number" min="1" value="' + item.quantity + '" onchange="updateQty(${index}, this.value)">'}
            <button onclick="removeItem(${index})">刪除</button>
            <br>小計：${subTotal} 元
        </li>`;
    });
    html += `</ul><p><strong>總計：${total} 元</strong></p>`;
    cartContainer.innerHTML = html;
});

function updateQty(index, qty) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart[index].quantity = parseInt(qty);
    localStorage.setItem('cart', JSON.stringify(cart));
    location.reload();
}

function updateDays(index, days) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart[index].days = parseInt(days);
    localStorage.setItem('cart', JSON.stringify(cart));
    location.reload();
}

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    location.reload();
}
