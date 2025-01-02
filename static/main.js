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
    text: "This action cannot be undone.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#e74c3c", // Custom color for confirmation
    cancelButtonColor: "#95a5a6", // Softer color for cancel
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, keep it",
    background: "#f7f7f7", // Soft background color for the dialog
    showClass: {
      popup: "swal2-noanimation", // Smooth transition for appearance
    },
    buttonsStyling: true, // Allow default styling for buttons
    customClass: {
      title: "swal2-title-custom", // Style the title
      text: "swal2-text-custom", // Style the text
      confirmButton: "swal2-confirm-btn", // Button styling
      cancelButton: "swal2-cancel-btn", // Button styling
    },
  }).then((result) => {
    if (result.isConfirmed) {
      // Perform the deletion only if confirmed
      window.location.href = deleteUrl;
    }
  });
}

function confirmLogout() {
  const logoutUrl = "{{ url_for('logout') }}";

  swal({
    title: "Confirm Logout",
    text: "Are you sure you want to end your session?",
    icon: "warning",
    closeOnClickOutside: false,
    buttons: {
      cancel: {
        text: "Cancel",
        value: false,
        visible: true,
        className: "swal-button--cancel",
      },
      confirm: {
        text: "Logout",
        value: true,
        className: "swal-button--danger",
      },
    },
    className: "custom-swal",
  }).then((willLogout) => {
    if (willLogout) {
      // Send logout request
      fetch(logoutUrl, {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(() => {
          swal({
            title: "Logging out...",
            text: "Thank you for using our platform!",
            icon: "success",
            timer: 1000,
            buttons: false,
          }).then(() => {
            // Redirect to login page
            window.location.replace("/");
          });
        })
        .catch((error) => {
          swal("Error", "Failed to logout. Please try again.", "error");
        });
    }
  });
}

// Add this CSS to your stylesheet
const style = document.createElement("style");
style.textContent = `
  .custom-swal {
    background: rgba(255, 255, 255, 0.95);
    border-radius: 15px;
    box-shadow: 0 0 20px rgba(0,0,0,0.1);
  }
  .swal-title {
    color: #2c3e50;
    font-size: 24px;
    font-weight: 600;
  }
  .swal-text {
    color: #34495e;
    font-size: 16px;
  }
  .swal-button--danger {
    background-color: #e74c3c;
    padding: 8px 24px;
    border-radius: 6px;
  }
  .swal-button--cancel {
    background-color: #95a5a6;
    padding: 8px 24px;
    border-radius: 6px;
  }
  .swal-button:focus {
    box-shadow: none;
  }
`;
document.head.appendChild(style);
