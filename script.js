// Product Data
const products = [
    {
        id: 1,
        name: "Fresh Tomatoes",
        category: "vegetables",
        price: 3.99,
        emoji: "🍅",
        description: "Sun-ripened vine tomatoes packed with flavor. Perfect for salads, sauces, or eating fresh. Grown by local farmers using sustainable practices."
    },
    {
        id: 2,
        name: "Crunchy Carrots",
        category: "vegetables",
        price: 2.49,
        emoji: "🥕",
        description: "Sweet, crunchy carrots pulled fresh from the earth. Great for snacking, roasting, or juicing. Our carrots are harvested daily at peak freshness."
    },
    {
        id: 3,
        name: "Ripe Avocados",
        category: "vegetables",
        price: 5.99,
        emoji: "🥑",
        description: "Creamy, buttery avocados perfect for toast, salads, or guacamole. Carefully selected for optimal ripeness and flavor."
    },
    {
        id: 4,
        name: "Sweet Strawberries",
        category: "fruits",
        price: 4.99,
        emoji: "🍓",
        description: "Juicy, sweet strawberries picked at peak ripeness. Enjoy them fresh, in desserts, or blended into smoothies. A farm favorite!"
    },
    {
        id: 5,
        name: "Organic Apples",
        category: "fruits",
        price: 3.49,
        emoji: "🍎",
        description: "Crisp, sweet organic apples from nearby orchards. Perfect for snacking, baking, or apple cider. Grows without synthetic pesticides."
    },
    {
        id: 6,
        name: "Fresh Honey",
        category: "dairy",
        price: 8.99,
        emoji: "🍯",
        description: "Pure, raw honey from local beekeepers. Rich in natural flavors and perfect for sweetening tea, drizzling on toast, or cooking."
    },
    {
        id: 7,
        name: "Farm Eggs",
        category: "dairy",
        price: 6.99,
        emoji: "🥚",
        description: "Fresh farm eggs from happy, free-range chickens. Rich yolks and superior taste. Collected daily and delivered same-day."
    },
    {
        id: 8,
        name: "Artisan Bread",
        category: "bakery",
        price: 5.49,
        emoji: "🍞",
        description: "Handcrafted sourdough bread baked fresh each morning. Made with organic flour and traditional fermentation methods for incredible flavor."
    },
    {
        id: 9,
        name: "Fresh Kale",
        category: "vegetables",
        price: 3.99,
        emoji: "🥬",
        description: "Nutrient-rich kale perfect for salads, smoothies, or roasting into crispy chips. Picked fresh every morning."
    },
    {
        id: 10,
        name: "Juicy Oranges",
        category: "fruits",
        price: 4.49,
        emoji: "🍊",
        description: "Vitamin-C packed oranges bursting with juice. Perfect for fresh squeezing or snacking. Sustainably grown with care."
    },
    {
        id: 11,
        name: "Creamy Cheese",
        category: "dairy",
        price: 7.99,
        emoji: "🧀",
        description: "Artisan cheese made from local cow's milk. Rich, creamy, and perfect for charcuterie boards or melting into your favorite dishes."
    },
    {
        id: 12,
        name: "Fluffy Pastries",
        category: "bakery",
        price: 4.99,
        emoji: "🥐",
        description: "Buttery, flaky pastries baked fresh each morning. The perfect accompaniment to your coffee or tea."
    }
];

// Cart State
let cart = [];

// DOM Elements
const productGrid = document.getElementById('productGrid');
const filterBtns = document.querySelectorAll('.filter-btn');
const cartIcon = document.getElementById('cartIcon');
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');
const cartClose = document.getElementById('cartClose');
const cartItems = document.getElementById('cartItems');
const cartEmpty = document.getElementById('cartEmpty');
const cartFooter = document.getElementById('cartFooter');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const startShopping = document.getElementById('startShopping');
const checkoutBtn = document.getElementById('checkoutBtn');

// Modal Elements
const modal = document.getElementById('productModal');
const modalClose = document.querySelector('.modal-close');
const modalTitle = document.getElementById('modalTitle');
const modalCategory = document.getElementById('modalCategory');
const modalDescription = document.getElementById('modalDescription');
const modalPrice = document.getElementById('modalPrice');
const modalImage = document.getElementById('modalImage');
const modalAddBtn = document.getElementById('modalAddBtn');

// Testimonial Carousel
const testimonials = document.querySelectorAll('.testimonial');
const carouselDots = document.getElementById('carouselDots');
let currentTestimonial = 0;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderProducts('all');
    setupFilterButtons();
    setupCart();
    setupModal();
    setupTestimonialCarousel();
    setupNewsletter();
    setupSmoothScroll();
    updateCartUI();
});

// Render Products
function renderProducts(category) {
    const filtered = category === 'all'
        ? products
        : products.filter(p => p.category === category);

    productGrid.innerHTML = filtered.map(product => `
        <div class="product-card" data-category="${product.category}">
            <div class="product-image">${product.emoji}</div>
            <div class="product-info">
                <span class="product-category">${getCategoryName(product.category)}</span>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <div class="product-actions">
                    <button class="btn btn-primary add-to-cart" data-id="${product.id}">Add to Cart 🛒</button>
                    <button class="btn product-details-btn view-details" data-id="${product.id}">Details ℹ️</button>
                </div>
            </div>
        </div>
    `).join('');

    // Add event listeners
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = parseInt(e.target.dataset.id);
            addToCart(productId);
        });
    });

    document.querySelectorAll('.view-details').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = parseInt(e.target.dataset.id);
            openModal(productId);
        });
    });
}

// Get Category Name
function getCategoryName(category) {
    const names = {
        vegetables: '🥬 Vegetables',
        fruits: '🍎 Fruits',
        dairy: '🥛 Dairy',
        bakery: '🍞 Bakery'
    };
    return names[category] || category;
}

// Filter Buttons
function setupFilterButtons() {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderProducts(btn.dataset.category);
        });
    });
}

// Cart Functions
function setupCart() {
    cartIcon.addEventListener('click', () => {
        cartSidebar.classList.add('show');
        cartOverlay.classList.add('show');
    });

    cartClose.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);
    startShopping.addEventListener('click', closeCart);
    checkoutBtn.addEventListener('click', handleCheckout);
}

function closeCart() {
    cartSidebar.classList.remove('show');
    cartOverlay.classList.remove('show');
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();

    // Animation feedback
    cartIcon.style.transform = 'scale(1.2)';
    setTimeout(() => cartIcon.style.transform = 'scale(1)', 200);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    if (cart.length === 0) {
        cartEmpty.style.display = 'flex';
        cartFooter.style.display = 'none';
        cartItems.innerHTML = '';
    } else {
        cartEmpty.style.display = 'none';
        cartFooter.style.display = 'block';

        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-emoji">${item.emoji}</div>
                <div class="cart-item-info">
                    <p class="cart-item-name">${item.name} ${item.quantity > 1 ? `× ${item.quantity}` : ''}</p>
                    <p class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <button class="cart-item-remove" data-id="${item.id}">🗑️</button>
            </div>
        `).join('');

        // Add remove listeners
        cartItems.querySelectorAll('.cart-item-remove').forEach(btn => {
            btn.addEventListener('click', () => {
                removeFromCart(parseInt(btn.dataset.id));
            });
        });

        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = `$${total.toFixed(2)}`;
    }
}

function handleCheckout() {
    if (cart.length === 0) return;

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    alert(`Thank you for your order!\n\nTotal: $${total.toFixed(2)}\n\nYour fresh produce will be ready for pickup!`);

    cart = [];
    updateCartUI();
    closeCart();
}

// Modal Functions
function setupModal() {
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    modalAddBtn.addEventListener('click', () => {
        const currentId = parseInt(modalTitle.dataset.id);
        if (currentId) {
            addToCart(currentId);
            closeModal();
        }
    });

    // ESC key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });
}

function openModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    modalTitle.textContent = product.name;
    modalTitle.dataset.id = product.id;
    modalCategory.textContent = getCategoryName(product.category);
    modalDescription.textContent = product.description;
    modalPrice.textContent = `$${product.price.toFixed(2)}`;
    modalImage.textContent = product.emoji;

    modal.classList.add('show');
}

function closeModal() {
    modal.classList.remove('show');
}

// Testimonial Carousel
function setupTestimonialCarousel() {
    // Create dots
    testimonials.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.className = `carousel-dot ${index === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => goToTestimonial(index));
        carouselDots.appendChild(dot);
    });

    // Auto-advance
    setInterval(() => {
        goToTestimonial((currentTestimonial + 1) % testimonials.length);
    }, 5000);
}

function goToTestimonial(index) {
    testimonials[currentTestimonial].classList.remove('active');
    testimonials[index].classList.add('active');

    const dots = carouselDots.querySelectorAll('.carousel-dot');
    dots[currentTestimonial].classList.remove('active');
    dots[index].classList.add('active');

    currentTestimonial = index;
}

// Newsletter Form
function setupNewsletter() {
    const form = document.getElementById('newsletterForm');
    const message = document.getElementById('formMessage');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = form.querySelector('input').value;

        // Simulate submission
        message.textContent = `Thanks for subscribing with ${email}! 🌾`;
        form.reset();

        setTimeout(() => {
            message.textContent = '';
        }, 5000);
    });
}

// Smooth Scroll
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Intersection Observer for animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

// Observe product cards
document.querySelectorAll('.product-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.5s ease';
    observer.observe(card);
});
