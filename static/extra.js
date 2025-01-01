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
