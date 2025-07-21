
document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('product-list');
    const pagination = document.getElementById('pagination');
    const categorySelect = document.getElementById('filter-category');
    const minPriceInput = document.getElementById('min-price');
    const maxPriceInput = document.getElementById('max-price');
    const filterBtn = document.getElementById('apply-filter');

    const res = await fetch('products.json');
    const products = await res.json();

    let currentPage = 1;
    const perPage = 10;

    const render = (items, page = 1) => {
        const start = (page - 1) * perPage;
        const end = start + perPage;
        const paginated = items.slice(start, end);

        container.innerHTML = '';
        paginated.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card fade-in';
            card.innerHTML = `
                <a href="product.html?id=${product.id}">
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
    <button onclick='addToCartFromProduct({
        id: ${product.id},
        name: "${product.name}",
        price: ${product.price},
        dailyPrice: ${product.dailyPrice},
        isRental: ${product.isRental},
        image: "${product.image}",
        quantity: 1,
        days: 1
    })'>加入購物車</button>
                    <p>${product.isRental ? '每日租金：' + product.dailyPrice + '元' : '價格：' + product.price + '元'}</p>
                </a>
            `;
            container.appendChild(card);
        });

        pagination.innerHTML = '';
        const totalPages = Math.ceil(items.length / perPage);
        for (let i = 1; i <= totalPages; i++) {
            const btn = document.createElement('button');
            btn.textContent = i;
            if (i === page) btn.disabled = true;
            btn.onclick = () => {
                currentPage = i;
                render(items, i);
            };
            pagination.appendChild(btn);
        }
    };

    let filtered = [...products];
    render(filtered, currentPage);

    filterBtn.addEventListener('click', () => {
        const selectedCat = categorySelect.value;
        const min = parseInt(minPriceInput.value) || 0;
        const max = parseInt(maxPriceInput.value) || Infinity;

        filtered = products.filter(p => {
            const price = p.isRental ? p.dailyPrice : p.price;
            return (selectedCat === '全部' || p.category === selectedCat) && price >= min && price <= max;
        });
        currentPage = 1;
        render(filtered, currentPage);
    });
});
