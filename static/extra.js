// Modal and Button Targeting
const addProductModal = document.getElementById("addProductModal");
const openAddProductModalBtn = document.getElementById(
  "openAddProductModalBtn"
);
const closeAddProductModalBtn = document.getElementById(
  "closeAddProductModalBtn"
);

const editProductModal = document.getElementById("editProductModal");
const closeEditProductModalBtn = document.getElementById(
  "closeEditProductModalBtn"
);

// Open Add Product Modal
openAddProductModalBtn.onclick = function () {
  addProductModal.style.display = "block";
};

// Close Add Product Modal
closeAddProductModalBtn.onclick = function () {
  addProductModal.style.display = "none";
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

// Close Edit Product Modal
closeEditProductModalBtn.onclick = function () {
  editProductModal.style.display = "none";
};

// Close Modal if clicked outside of the modal content
window.addEventListener("click", function (event) {
  if (event.target === addProductModal) {
    addProductModal.style.display = "none";
  }
  if (event.target === editProductModal) {
    editProductModal.style.display = "none";
  }
});

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
