
document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('product-list');
    const categorySelect = document.getElementById('filter-category');
    const minPriceInput = document.getElementById('min-price');
    const maxPriceInput = document.getElementById('max-price');
    const filterBtn = document.getElementById('apply-filter');

    const res = await fetch('products.json');
    const products = await res.json();

    const render = (filtered) => {
        container.innerHTML = '';
        filtered.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card fade-in';
            card.innerHTML = `
                <a href="product.html?id=${product.id}">
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>${product.isRental ? '每日租金：' + product.dailyPrice + '元' : '價格：' + product.price + '元'}</p>
                </a>
            `;
            container.appendChild(card);
        });
    };

    render(products);

    filterBtn.addEventListener('click', () => {
        const selectedCat = categorySelect.value;
        const min = parseInt(minPriceInput.value) || 0;
        const max = parseInt(maxPriceInput.value) || Infinity;

        const filtered = products.filter(p => {
            const price = p.isRental ? p.dailyPrice : p.price;
            return (selectedCat === '全部' || p.category === selectedCat) && price >= min && price <= max;
        });
        render(filtered);
    });
});
