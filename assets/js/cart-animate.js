
function animateCart() {
    const cartIcon = document.querySelector('.floating-cart');
    if (cartIcon) {
        cartIcon.classList.add('cart-bounce');
        setTimeout(() => cartIcon.classList.remove('cart-bounce'), 500);
    }
}
