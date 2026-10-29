// Crumb & Co. — beginner-friendly demo shop (no backend or payment gateway).
const products = [
  {id:1,name:"Butter Croissant",category:"pastry",price:120,tag:"BESTSELLER",description:"Golden, flaky layers with real cultured butter.",image:"https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=700&q=80"},
  {id:2,name:"Country Sourdough",category:"bread",price:220,tag:"SLOW FERMENTED",description:"A crisp crust, a chewy middle, and lots of character.",image:"https://images.unsplash.com/photo-1585478259715-876acc5be8eb?auto=format&fit=crop&w=700&q=80"},
  {id:3,name:"Vanilla Cloud Cupcake",category:"sweet",price:95,tag:"LITTLE JOY",description:"Soft vanilla sponge with a swirl of buttercream.",image:"https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=700&q=80"},
  {id:4,name:"Choc Chip Cookies",category:"sweet",price:140,tag:"FAN FAVOURITE",description:"Chewy centres, crisp edges, and pools of chocolate.",image:"https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=700&q=80"},
  {id:5,name:"Strawberry Dream Cake",category:"sweet",price:480,tag:"MADE TO SHARE",description:"Light vanilla layers, cream, and seasonal berries.",image:"https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=700&q=80"},
  {id:6,name:"Honey Oat Latte",category:"drink",price:160,tag:"SIP SLOWLY",description:"A smooth espresso with oat milk and a hint of honey.",image:"https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=700&q=80"},
  {id:7,name:"Cinnamon Cloud Rolls",category:"pastry",price:180,tag:"CROWD FAVOURITE",description:"Two soft cinnamon spirals with vanilla glaze.",image:"https://images.unsplash.com/photo-1623334044303-241021148842?auto=format&fit=crop&w=700&q=80"},
  {id:8,name:"Almond Pain au Chocolat",category:"pastry",price:155,tag:"A LITTLE FANCY",description:"Buttery pastry, dark chocolate, toasted almonds.",image:"https://images.unsplash.com/photo-1620146344904-097a0002d797?auto=format&fit=crop&w=700&q=80"},
  {id:9,name:"Rosemary Focaccia",category:"bread",price:190,tag:"BAKED TODAY",description:"Olive oil-rich bread with rosemary and flaky salt.",image:"https://images.unsplash.com/photo-1619531040576-f9416740661f?auto=format&fit=crop&w=700&q=80"}
];
const reviews = [
  {quote:"The croissants are ridiculously good — crisp outside, soft inside, and gone in about thirty seconds at our place.",name:"Ananya R.",detail:"Regular since day one",initial:"A"},
  {quote:"A tiny, cosy corner with the loveliest coffee and the kind of cookies you keep thinking about on the way home.",name:"Rahul M.",detail:"Coffee date enthusiast",initial:"R"},
  {quote:"Ordered a birthday cake and it was beautiful, not too sweet, and made with so much care. We'll be back!",name:"Meera S.",detail:"Happy cake customer",initial:"M"}
];
let cart = [];
let activeFilter = "all";
let reviewIndex = 0;
const $ = (selector) => document.querySelector(selector);
const money = (amount) => `₹${amount.toLocaleString("en-IN")}`;

function renderProducts() {
  const visible = activeFilter === "all" ? products : products.filter(p => p.category === activeFilter);
  $("#productGrid").innerHTML = visible.map((p, i) => `
    <article class="product-card" style="animation-delay:${i * 45}ms">
      <div class="product-image"><img src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.style.display='none';this.parentElement.classList.add('image-fallback')">${p.tag ? `<span class="product-tag">${p.tag}</span>` : ""}</div>
      <div class="product-info"><div class="product-topline"><h3>${p.name}</h3><span class="product-price">${money(p.price)}</span></div>
      <p>${p.description}</p><div class="product-actions"><span>Freshly made, just for you</span><button class="add-btn" data-add="${p.id}" aria-label="Add ${p.name} to bag">+</button></div></div>
    </article>`).join("");
}
function addToCart(id) {
  const product = products.find(p => p.id === Number(id));
  if (!product) return;
  const existing = cart.find(item => item.id === product.id);
  if (existing) existing.quantity += 1;
  else cart.push({...product, quantity:1});
  renderCart();
  showToast(`${product.name} added to your bag ♡`);
}
function updateQuantity(id, change) {
  const item = cart.find(p => p.id === Number(id));
  if (!item) return;
  item.quantity += change;
  if (item.quantity <= 0) cart = cart.filter(p => p.id !== Number(id));
  renderCart();
}
function removeFromCart(id) {
  cart = cart.filter(p => p.id !== Number(id));
  renderCart();
}
function renderCart() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  $("#cartCount").textContent = count;
  $("#cartTotal").textContent = money(total);
  if (!cart.length) {
    $("#cartItems").innerHTML = `<div class="empty-cart"><span>♡</span><h3>Your bag is taking a nap.</h3><p>Add something lovely from our menu.</p><button class="text-link" id="emptyBrowse">Browse the goodies →</button></div>`;
    $("#checkoutMessage").textContent = "";
    return;
  }
  $("#cartItems").innerHTML = cart.map(item => `<div class="cart-row">
    <img src="${item.image}" alt="" onerror="this.style.display='none';this.parentElement.classList.add('image-fallback')">
    <div><h4>${item.name}</h4><small>${money(item.price)} each</small><div class="quantity-control"><button data-minus="${item.id}" aria-label="Decrease ${item.name} quantity">−</button><span>${item.quantity}</span><button data-plus="${item.id}" aria-label="Increase ${item.name} quantity">+</button></div></div>
    <div class="cart-row-end"><span>${money(item.price * item.quantity)}</span><button class="remove-item" data-remove="${item.id}">Remove</button></div>
  </div>`).join("");
}
function openCart() {
  $("#cartDrawer").classList.add("open");
  $("#cartOverlay").classList.add("visible");
  $("#cartDrawer").setAttribute("aria-hidden","false");
  document.body.classList.add("cart-open");
  $("#cartClose").focus();
}
function closeCart() {
  $("#cartDrawer").classList.remove("open");
  $("#cartOverlay").classList.remove("visible");
  $("#cartDrawer").setAttribute("aria-hidden","true");
  document.body.classList.remove("cart-open");
}
let toastTimer;
function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2300);
}
function renderReview() {
  const r = reviews[reviewIndex];
  $("#reviewCard").innerHTML = `<div class="stars">★★★★★</div><blockquote>“${r.quote}”</blockquote><div class="review-person"><div class="review-avatar">${r.initial}</div><div><strong>${r.name}</strong><span>${r.detail}</span></div></div><div class="review-count" id="reviewCount">${String(reviewIndex+1).padStart(2,"0")} / ${String(reviews.length).padStart(2,"0")}</div>`;
}

$("#productGrid").addEventListener("click", e => {
  const button = e.target.closest("[data-add]");
  if (button) addToCart(button.dataset.add);
});
$("#filters").addEventListener("click", e => {
  const button = e.target.closest("[data-filter]");
  if (!button) return;
  activeFilter = button.dataset.filter;
  document.querySelectorAll(".filter-btn").forEach(b => b.classList.toggle("active", b === button));
  renderProducts();
});
document.addEventListener("click", e => {
  const plus = e.target.closest("[data-plus]");
  const minus = e.target.closest("[data-minus]");
  const remove = e.target.closest("[data-remove]");
  const quick = e.target.closest("[data-quick-add]");
  if (plus) updateQuantity(plus.dataset.plus, 1);
  if (minus) updateQuantity(minus.dataset.minus, -1);
  if (remove) removeFromCart(remove.dataset.remove);
  if (quick) addToCart(quick.dataset.quickAdd);
  if (e.target.closest("#emptyBrowse")) { closeCart(); $("#menu").scrollIntoView({behavior:"smooth"}); }
});
$("#cartOpen").addEventListener("click", openCart);
$("#cartClose").addEventListener("click", closeCart);
$("#cartOverlay").addEventListener("click", closeCart);
document.addEventListener("keydown", e => { if (e.key === "Escape") closeCart(); });
$("#checkoutBtn").addEventListener("click", () => {
  if (!cart.length) { $("#checkoutMessage").textContent = "Your bag is empty — choose a treat first."; return; }
  $("#checkoutMessage").textContent = "Demo order placed! No payment was taken. Thanks for supporting Crumb & Co. ♡";
  showToast("Your demo order is ready — thank you! ♡");
  cart = [];
  renderCart();
});
$("#viewAllBtn").addEventListener("click", () => {
  activeFilter = "all";
  document.querySelectorAll(".filter-btn").forEach(b => b.classList.toggle("active", b.dataset.filter === "all"));
  renderProducts();
});
$("#reviewPrev").addEventListener("click", () => { reviewIndex = (reviewIndex - 1 + reviews.length) % reviews.length; renderReview(); });
$("#reviewNext").addEventListener("click", () => { reviewIndex = (reviewIndex + 1) % reviews.length; renderReview(); });
$("#menuToggle").addEventListener("click", () => {
  const isOpen = $("#mainNav").classList.toggle("open");
  $("#menuToggle").setAttribute("aria-expanded", String(isOpen));
  $("#menuToggle").setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});
$("#mainNav").addEventListener("click", e => {
  if (e.target.closest("a")) {
    $("#mainNav").classList.remove("open");
    $("#menuToggle").setAttribute("aria-expanded","false");
  }
});
$("#contactForm").addEventListener("submit", e => {
  e.preventDefault();
  const name = $("#name").value.trim();
  const email = $("#email").value.trim();
  const message = $("#message").value.trim();
  const feedback = $("#formFeedback");
  const emailLooksValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (name.length < 2 || !emailLooksValid || message.length < 10) {
    feedback.textContent = "Please enter your name, a valid email, and a message of at least 10 characters.";
    feedback.classList.add("error");
    if (name.length < 2) $("#name").focus();
    else if (!emailLooksValid) $("#email").focus();
    else $("#message").focus();
    return;
  }
  feedback.classList.remove("error");
  feedback.textContent = `Thanks, ${name}! Your demo message passed validation. This static site doesn't send emails.`;
  e.target.reset();
});
document.querySelectorAll(".gallery-item img,.story-image img,.best-photo img").forEach(img => {
  img.addEventListener("error", () => { img.style.display = "none"; img.parentElement.classList.add("image-fallback"); });
});
$("#year").textContent = new Date().getFullYear();
renderProducts();
renderCart();
renderReview();
