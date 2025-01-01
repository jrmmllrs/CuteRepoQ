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

function confirmDelete(deleteUrl) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel",
  }).then((result) => {
    if (result.isConfirmed) {
      // Perform the deletion only if confirmed
      window.location.href = deleteUrl;
    }
  });
}
