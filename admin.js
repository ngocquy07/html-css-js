document.getElementById('addProductForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('productName').value;
  const price = document.getElementById('productPrice').value;
  const imageInput = document.getElementById('productImage');
  const file = imageInput.files[0];

  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(event) {
    const imageUrl = event.target.result;

    let products = JSON.parse(localStorage.getItem('products')) || [];
    products.push({
      name: name,
      price: price,
      image: imageUrl
    });
    localStorage.setItem('products', JSON.stringify(products));
    alert('Đã thêm sản phẩm thành công!');
    document.getElementById('addProductForm').reset();
    renderProducts();
  };
  reader.readAsDataURL(file);
});

//hiển thị danh sách sản phẩm với nút xóa
function renderProducts() {
  const productList = document.getElementById('productList');
  let products = JSON.parse(localStorage.getItem('products')) || [];
  productList.innerHTML = '';
  products.forEach((product, index) => {
    const div = document.createElement('div');
    div.className = 'admin-product-item';
    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}" width="80" style="vertical-align:middle;margin-right:10px;">
      <strong>${product.name}</strong> - ${Number(product.price).toLocaleString()}₫
      <button class="delete-btn" data-index="${index}">Xóa</button>
    `;
    productList.appendChild(div);
  });

  document.querySelectorAll('.delete-btn').forEach(btn => {//sự kiện cho nút xóa
    btn.onclick = function() {
      const idx = this.getAttribute('data-index');
      products.splice(idx, 1);
      localStorage.setItem('products', JSON.stringify(products));
      renderProducts();
    };
  });
}

renderProducts();//hiển thị trang khi tải