db.products.insertMany([
    {
      name: "T-Shirt",
      price: 499,
      category: "Clothing",
      variants: [
        { color: "Red", size: "M", stock: 10 },
        { color: "Blue", size: "L", stock: 5 }
      ]
    },
    {
      name: "Sneakers",
      price: 2499,
      category: "Footwear",
      variants: [
        { color: "Black", size: "42", stock: 7 },
        { color: "White", size: "41", stock: 3 }
      ]
    },
    {
      name: "Smartphone",
      price: 69999,
      category: "Electronics",
      variants: [
        { color: "Black", size: "128GB", stock: 4 },
        { color: "Silver", size: "256GB", stock: 2 }
      ]
    }
  ]);
  