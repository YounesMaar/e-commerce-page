const product = {
  title: "Fall Limited Edition Sneakers",
  price: 125,
  images: [
    "images/image-product-1.jpg",
    "images/image-product-2.jpg",
    "images/image-product-3.jpg",
    "images/image-product-4.jpg",
  ],
};

let quantity = 1;
let cart = [];
let selectedImage = 0;

const quantityEl = document.getElementById("quantity");
const cartItemsEl = document.getElementById("cartItems");
const thumbnailsEl = document.getElementById("thumbnails");
const mainImageEl = document.getElementById("mainImage");
const cartCountEl = document.getElementById("cartCount");
const cartEl = document.getElementById("cart");

product.images.forEach((src, index) => {
  const img = document.createElement("img");
  img.src = src;
  img.className = index === selectedImage ? "active" : "";
  img.onclick = () => selectImage(index);
  thumbnailsEl.appendChild(img);
});

function selectImage(index) {
  selectedImage = index;
  mainImageEl.src = product.images[index];
  [...thumbnailsEl.children].forEach((thumb, idx) => {
    thumb.className = idx === selectedImage ? "active" : "";
  });
}

function updateQuantity(change) {
  quantity = Math.max(1, quantity + change);
  quantityEl.textContent = quantity;
}

function addToCart() {
  const existing = cart.find((item) => item.title === product.title);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({
      title: product.title,
      price: product.price,
      quantity,
      image: product.images[0],
    });
  }
  renderCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  renderCart();
}

function renderCart() {
  cartItemsEl.innerHTML = ""; // Clear previous contents
  let totalItems = 0;
  let btn = document.querySelector(".cart-checkout-btn");

  if (cart.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = "Your cart is empty.";
    emptyMessage.className = "empty-cart-message";
    cartItemsEl.appendChild(emptyMessage);

    btn.disabled = true;
  } else {
    cart.forEach((item, index) => {
      totalItems += item.quantity;

      const div = document.createElement("div");
      div.style.display = "flex";
      div.style.alignItems = "center";
      div.style.justifyContent = "space-between";
      div.style.marginBottom = "10px";

      div.innerHTML = `
              <img src="${item.image}" width="50" style="border-radius: 5px;" />
              <span style="flex: 1; margin: 0 10px;">
                ${item.title}<br>
                $${item.price} x ${item.quantity} = $${
        item.price * item.quantity
      }
              </span>
              <button 
                class="cart-delete-btn"
                onclick="removeFromCart(${index})"
                style="background: none; border: none; color: red; cursor: pointer;"
              >
                Delete
              </button>
            `;
      btn.disabled = false;
      cartItemsEl.appendChild(div);
    });
  }
  console.log(btn.disabled);
  cartCountEl.textContent = totalItems;
}

function toggleCart() {
  cartEl.style.display =
    cartEl.style.display === "none" || cartEl.style.display === ""
      ? "block"
      : "none";
}

function checkout() {
  alert("Proceeding to checkout with " + cart.length + " item(s).");
}
