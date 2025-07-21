
function addToCartFromProduct(product) {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    let existing = cart.find(p => p.id === product.id);

    if (existing) {
        if (product.isRental) {
            existing.days += product.days;
        } else {
            existing.quantity += product.quantity;
        }
    } else {
        cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    animateCart();
    alert("已加入購物車！");
}


function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    let count = 0;
    cart.forEach(item => {
        count += item.isRental ? 1 : item.quantity;
    });
    const badge = document.querySelector('.cart-count-badge');
    if (badge) badge.textContent = count;
}

document.addEventListener('DOMContentLoaded', updateCartCount);

function addToCartFromProduct(product) {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    let existing = cart.find(p => p.id === product.id);

    if (existing) {
        if (product.isRental) {
            existing.days += product.days;
        } else {
            existing.quantity += product.quantity;
        }
    } else {
        cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    animateCart();
    alert("已加入購物車！");
}
