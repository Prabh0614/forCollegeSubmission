document.addEventListener("DOMContentLoaded", function () {
  const categorySelect = document.getElementById("category");
  const productList = document.getElementById("product-list");
  const products = productList.getElementsByTagName("li");

  categorySelect.addEventListener("change", function () {
    const selectedCategory = categorySelect.value;

    for (let product of products) {
      if (selectedCategory === "all" || product.dataset.category === selectedCategory) {
        product.style.display = "block";
      } else {
        product.style.display = "none";
      }
    }
  });
});
