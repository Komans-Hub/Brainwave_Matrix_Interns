const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", mobileMenu);

function mobileMenu () {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
}

const navLink = document.querySelectorAll(".nav-link");
navLink.forEach(n => n.addEventListener("click", closeMenu));

function closeMenu () {
  hamburger.classList.remove("active");
  navMenu.classList.remove("active");
}
  
  let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("slides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  slides[slideIndex-1].style.display = "block";
  setTimeout(showSlides, 3000); // Change image every 2 seconds
}


// Retrieve the necessary elements from the HTML
const products = document.querySelector(".products");
const product = document.querySelectorAll(".product");
const cartContainer = document.querySelector(".shopping-cart");
const cartTotalElement = document.querySelector(".cart-total");
const clearCartButton = document.querySelector("#clear-cart");
const addToCartButton = document.querySelectorAll(".add-to-cart");


// Initialize the cart array
let cartItems = [];

// Add event listeners to the "Add to Cart" buttons
addToCartButton.forEach((button) => {
  button.addEventListener("click", addToCart);
});

function addToCart (event) {
  const productElement = event.target.closest(".product");
  const productName = productElement.querySelector(".product-name").textContent;
  const productPrice = productElement.querySelector(".product-price").textContent;


const cartItem = {
  name: productName,
  price: parseFloat(productPrice.slice(1)), // Remove the "$" sign and convert to a number
  quantity: 1,
};

 // Check if the item is already in the cart
 const existingItem = cartItems.find((item) => item.name === cartItem.name);
 if (existingItem) {
   existingItem.quantity++;
 } else {
   cartItems.push(cartItem);
 }

 // Update the cart display
 displayCartItems();
 calculateTotal();
};

 // Function to display the cart items
function displayCartItems() {
  // Clear the cart display
  cartContainer.innerHTML = "";

  // Display each cart item
  cartItems.forEach((item) => {
    const cartItemElement = document.createElement("div");
    cartItemElement.className = "cart-item";

    const itemName = document.createElement("span");
    itemName.textContent = item.name;

    const itemQuantity = document.createElement("span");
    itemQuantity.textContent = `Quantity: ${item.quantity}`;

    const itemPrice = document.createElement("span");
    itemPrice.textContent = `Price: $${item.price}`;

    cartItemElement.appendChild(itemName);
    cartItemElement.appendChild(document.createTextNode(" - "));
    cartItemElement.appendChild(itemQuantity);
    cartItemElement.appendChild(document.createTextNode(" - "));
    cartItemElement.appendChild(itemPrice);

    cartContainer.appendChild(cartItemElement);
  });
};


// Function to calculate the total amount
function calculateTotal() {
  let total = 0;

  cartItems.forEach((item) => {
    total += item.price * item.quantity;
  });

  cartTotalElement.textContent = `Total: $${total}`;
}

// Event listener for the clear cart button
clearCartButton.addEventListener("click", clearCart);

// Function to clear the cart
function clearCart() {
  cartItems = [];
  cartContainer.innerHTML = "";
  cartTotalElement.textContent = "Total: $0";
};

