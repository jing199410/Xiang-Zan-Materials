
document.addEventListener('DOMContentLoaded', () => {
    const cartContainer = document.getElementById('cart-container');
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>購物車是空的。</p>';
        return;
    }

    let html = '<ul>';
    let total = 0;
    cart.forEach(item => {
        let subTotal = item.isRental ? item.dailyPrice * item.days : item.price * item.quantity;
        total += subTotal;
        html += `<li>${item.name} - ${item.isRental ? item.dailyPrice + '元/日 × ' + item.days + '天' : item.price + '元 × ' + item.quantity} = ${subTotal}元</li>`;
    });
    html += `</ul><p><strong>總計：${total} 元</strong></p>`;
    cartContainer.innerHTML = html;
});
