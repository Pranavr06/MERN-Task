// Determine API URL (supports both Express static serving on port 3000 and Live Server on other ports)
const API_URL = window.location.port === '3000'
  ? '/api/products'
  : 'http://localhost:3000/api/products';

// DOM Elements
const productForm = document.getElementById('product-form');
const productIdInput = document.getElementById('product-id');
const productNameInput = document.getElementById('product-name');
const productPriceInput = document.getElementById('product-price');
const submitBtn = document.getElementById('submit-btn');
const cancelBtn = document.getElementById('cancel-btn');
const formTitle = document.getElementById('form-title');
const productsTbody = document.getElementById('products-tbody');
const notification = document.getElementById('notification');

let notificationTimeout = null;

// Display banner notification (success / error)
function showNotification(message, type = 'success') {
  notification.textContent = message;
  notification.className = `notification ${type}`;
  notification.classList.remove('hidden');

  if (notificationTimeout) clearTimeout(notificationTimeout);
  notificationTimeout = setTimeout(() => {
    notification.classList.add('hidden');
  }, 3500);
}

// ================= READ (GET) ================= //
async function fetchProducts() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`);
    }
    const products = await response.json();
    renderProducts(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    productsTbody.innerHTML = `<tr><td colspan="4" class="text-center" style="color: #e53e3e;">Failed to load products. Make sure Express server is running on port 3000.</td></tr>`;
  }
}

// Render products in the table
function renderProducts(products) {
  if (!products || products.length === 0) {
    productsTbody.innerHTML = `<tr><td colspan="4" class="text-center">No products found. Add one above!</td></tr>`;
    return;
  }

  productsTbody.innerHTML = '';
  products.forEach((product) => {
    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td>${product.id}</td>
      <td>${escapeHtml(product.name)}</td>
      <td>${product.price}</td>
      <td>
        <button class="btn btn-edit" data-id="${product.id}" data-name="${escapeHtml(product.name)}" data-price="${product.price}">Edit</button>
        <button class="btn btn-delete" data-id="${product.id}">Delete</button>
      </td>
    `;

    productsTbody.appendChild(tr);
  });
}

// Utility to escape HTML to prevent XSS
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// ================= CREATE (POST) & UPDATE (PUT) ================= //
productForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const id = productIdInput.value;
  const name = productNameInput.value.trim();
  const price = parseFloat(productPriceInput.value);

  if (!name || isNaN(price)) {
    showNotification('Please fill in both name and a valid price.', 'error');
    return;
  }

  try {
    if (id) {
      // UPDATE (PUT)
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, price })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to update product');
      }

      showNotification('Product updated successfully!', 'success');
      resetForm();
      fetchProducts();
    } else {
      // CREATE (POST)
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, price })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to create product');
      }

      showNotification('Product created successfully!', 'success');
      resetForm();
      fetchProducts();
    }
  } catch (error) {
    console.error('Error saving product:', error);
    showNotification(error.message, 'error');
  }
});

// ================= TABLE ACTIONS (EDIT & DELETE) ================= //
productsTbody.addEventListener('click', async (e) => {
  const target = e.target;

  // Edit Button Clicked
  if (target.classList.contains('btn-edit')) {
    const id = target.getAttribute('data-id');
    const name = target.getAttribute('data-name');
    const price = target.getAttribute('data-price');

    // Populate form
    productIdInput.value = id;
    productNameInput.value = name;
    productPriceInput.value = price;

    // Change form state to edit
    formTitle.textContent = `Edit Product (ID: ${id})`;
    submitBtn.textContent = 'Update';
    cancelBtn.classList.remove('hidden');

    productNameInput.focus();
  }

  // Delete Button Clicked
  if (target.classList.contains('btn-delete')) {
    const id = target.getAttribute('data-id');
    const confirmDelete = confirm(`Are you sure you want to delete Product ID: ${id}?`);

    if (confirmDelete) {
      try {
        const response = await fetch(`${API_URL}/${id}`, {
          method: 'DELETE'
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || 'Failed to delete product');
        }

        showNotification('Product deleted successfully!', 'success');

        // If the deleted product was currently being edited, reset form
        if (productIdInput.value === id) {
          resetForm();
        }

        fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
        showNotification(error.message, 'error');
      }
    }
  }
});

// ================= CANCEL EDIT ================= //
cancelBtn.addEventListener('click', resetForm);

function resetForm() {
  productIdInput.value = '';
  productForm.reset();
  formTitle.textContent = 'Add New Product';
  submitBtn.textContent = 'Submit';
  cancelBtn.classList.add('hidden');
}

// Initial fetch on page load
document.addEventListener('DOMContentLoaded', fetchProducts);
