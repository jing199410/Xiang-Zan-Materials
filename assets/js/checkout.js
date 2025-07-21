
document.addEventListener('DOMContentLoaded', () => {
    const summary = document.getElementById('order-summary');
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    if (cart.length === 0) {
        summary.innerHTML = '<p>購物車是空的。</p>';
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
    summary.innerHTML = html;
});

document.getElementById('checkout-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert("感謝您的訂購！訂單已送出，我們會儘快與您聯繫。");
    localStorage.removeItem('cart');
    window.location.href = "index.html";
});
