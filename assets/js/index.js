
document.addEventListener('DOMContentLoaded', () => {
    const featured = document.getElementById('featured-products');
    const sampleProducts = [
        {
            id: 1,
            name: "台泥水泥 50kg",
            price: 1250,
            isRental: false,
            image: "https://github.com/jing199410/Xiang-Zan-Materials/raw/main/assets/img/tcc-cement-50kg.jpg"
        },
        {
            id: 31,
            name: "立邦水泥漆 白 5L",
            price: 1350,
            isRental: false,
            image: "https://github.com/jing199410/Xiang-Zan-Materials/raw/main/assets/img/%E6%B0%B4%E6%B3%A5%E6%BC%86.jpg"
        },
        {
            id: 71,
            name: "BOSCH 電鑽",
            price: 3600,
            isRental: false,
            image: "assets/img/product3.jpg"
        },
        {
            id: 91,
            name: "鷹架組（租借）",
            dailyPrice: 500,
            isRental: true,
            image: "assets/img/product4.jpg"
        }
    ];

    sampleProducts.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card fade-in';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.isRental ? '每日租金：' + product.dailyPrice + '元' : '價格：' + product.price + '元'}</p>
        `;

        const btn = document.createElement('button');
        btn.textContent = '加入購物車';
        btn.addEventListener('click', () => {
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

        card.appendChild(btn);
        featured.appendChild(card);
    });
});
