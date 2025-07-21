
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
