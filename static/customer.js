// CUSTOMER_MANAGEMENT JS

// Modal for Adding or Editing Customer
const addCustomerModal = document.getElementById("addCustomerModal");
const customerModal = document.getElementById("customerModal");
const closeAddModalBtn = document.getElementById("closeAddModalBtn");
const closeEditModalBtn = document.getElementById("closeEditModalBtn");
const editBtns = document.querySelectorAll(".edit-btn");
const addModalBtn = document.getElementById("openModalBtn");
const form = document.getElementById("customerForm");
const modalTitle = document.getElementById("modalTitle");
const submitBtn = document.getElementById("submitBtn");

// Open Add Customer Modal
addModalBtn.onclick = function () {
  addCustomerModal.style.display = "block";
};

// Close Add Customer Modal
closeAddModalBtn.onclick = function () {
  addCustomerModal.style.display = "none";
};

// Open Edit Product Modal
function openEditProductModal(button) {
  const productId = button.getAttribute("data-product-id");
  const productName = button.getAttribute("data-name");
  const productDescription = button.getAttribute("data-description");
  const productPrice = button.getAttribute("data-price");
  const productStock = button.getAttribute("data-stock");
  const productCategory = button.getAttribute("data-category");
  const productStatus = button.getAttribute("data-status");

  // Prefill the form with product data
  document.getElementById("productId").value = productId;
  document.getElementById("productName").value = productName;
  document.getElementById("productDescription").value = productDescription;
  document.getElementById("productPrice").value = productPrice;
  document.getElementById("productStock").value = productStock;
  document.getElementById("productCategory").value = productCategory;
  document.getElementById("productStatus").value = productStatus;

  // Dynamically set the form action URL to the correct update endpoint
  document.getElementById("editProductForm").action =
    "/update_product/" + productId;

  // Show the modal
  editProductModal.style.display = "block";
}

// Close Edit Customer Modal
closeEditModalBtn.onclick = function () {
  customerModal.style.display = "none";
};

// Close Modal if clicked outside of the modal content
window.addEventListener("click", function (event) {
  if (event.target === addCustomerModal || event.target === customerModal) {
    addCustomerModal.style.display = "none";
    customerModal.style.display = "none";
  }
});

function openEditModal(button) {
  const modal = document.getElementById("customerModal");

  // Extract data attributes
  const customerId = button.getAttribute("data-customer-id");
  const fullName = button.getAttribute("data-full-name");
  const email = button.getAttribute("data-email");
  const phone = button.getAttribute("data-phone");
  const address = button.getAttribute("data-address");
  const status = button.getAttribute("data-status");

  // Populate the modal fields
  document.getElementById("customerId").value = customerId;
  document.getElementById("fullName").value = fullName;
  document.getElementById("email").value = email;
  document.getElementById("phone").value = phone;
  document.getElementById("address").value = address;
  document.getElementById("status").value = status;

  // Set form action dynamically
  const form = document.getElementById("customerForm");
  form.action = `/edit_customer/${customerId}`;

  // Show the modal
  modal.style.display = "block";
}
