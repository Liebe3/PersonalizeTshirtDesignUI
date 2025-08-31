// src/data/products.js

const productsData = [
  {
    id: 1,
    name: "Custom Text T-Shirt",
    description:
      "Personalize with your own text. Crafted from premium cotton and available in multiple colors, it offers both comfort and durability. Perfect for everyday wear, team events, or creating a meaningful customized gift. With its soft fabric and timeless fit, this shirt combines style and personalization in one.",
    price: 1499,
    discountPercentage: 2,
    stock: 20,
    category: "Custom",
    colors: ["White", "Black", "Navy", "Gray"],
    sizes: ["S", "M", "L", "XL", "2XL"],
    customizable: true,
    image:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 2,
    name: "Streetwear Black Tee",
    description:
      "Minimalist black tee for casual or smart-casual looks. Its versatile design makes it easy to pair with jeans, chinos, or layered under a jacket for a polished style.",
    price: 1999,
    discountPercentage: 7.17,
    stock: 50,
    category: "Streetwear",
    colors: ["Black"],
    sizes: ["S", "M", "L", "XL", "2XL"],
    customizable: true,
    image:
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 3,
    name: "Custom Print Tee",
    description:
      "Add your own text or design to make it yours. Personalization lets you create a truly unique piece that reflects your style, whether it’s a favorite quote, logo, or creative artwork. This makes it perfect for gifts, events, or simply expressing your individuality.",
    price: 999,
    discountPercentage: 9.09,
    stock: 4,
    category: "Custom",
    colors: ["White", "Black", "Gray"],
    sizes: ["S", "M", "L", "XL"],
    customizable: true,
    image:
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "Travel Adventure Tee",
    description: "Perfect shirt for travelers, breathable and stylish.",
    price: 599,
    discountPercentage: 6.5,
    stock: 30,
    category: "Travel",
    colors: ["Blue", "Green", "Gray"],
    sizes: ["S", "M", "L", "XL"],
    customizable: false,
    image:
      "https://images.unsplash.com/photo-1627225925683-1da7021732ea?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 5,
    name: "Sports Active Tee",
    description: "Sweat-wicking tee designed for comfort during workouts.",
    price: 1299,
    discountPercentage: 9.99,
    stock: 25,
    category: "Sports",
    colors: ["Red", "Blue", "Black", "White"],
    sizes: ["S", "M", "L", "XL", "2XL"],
    customizable: false,
    image:
      "https://images.unsplash.com/photo-1712160483356-0991c1f79892?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export default productsData;
