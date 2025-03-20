import ProductCard from "./ProductCard";

const products = [
  {
    id: "12345",
    name: "Organic Tomatoes",
    origin: "California",
    farmerName: "John Doe",
    price: 200,
  },
  {
    id: "67890",
    name: "Fresh Apples",
    origin: "Washington",
    farmerName: "Emma Smith",
    price: 150,
  },
];

function ProductListTest() {
  return (
    <div className="container mt-4 d-flex gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductListTest;
