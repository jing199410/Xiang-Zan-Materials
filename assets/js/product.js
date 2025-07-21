
document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const container = document.getElementById('product-detail');
    const res = await fetch('products.json');
    const products = await res.json();
    const product = products.find(p => p.id == id);
    if (!product) {
        container.innerHTML = '<p>找不到商品。</p>';
        return;
    }

    let html = `
        <div class="product-card fade-in" style="max-width:600px;margin:auto;">
            <img src="${product.image}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p>分類：${product.category}</p>
            <p>${product.isRental ? '每日租金：' + product.dailyPrice + '元' : '價格：' + product.price + '元'}</p>
            <button id="add-to-cart">加入購物車</button>
        </div>`;
    container.innerHTML = html;

    document.getElementById('add-to-cart').addEventListener('click', () => {
        const item = {
            id: product.id,
            name: product.name,
            price: product.price,
            dailyPrice: product.dailyPrice,
            isRental: product.isRental,
            image: product.image,
            quantity: 1,
            days: 1
        };
        addToCartFromProduct(item);
    });
});
