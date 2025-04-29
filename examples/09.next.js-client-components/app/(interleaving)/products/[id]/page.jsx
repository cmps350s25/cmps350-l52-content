// product/[id]/page.jsx (Server Component - Default)
import AddToCartButton from '../../components/AddToCartButton'; // Client Component
import { getProductDetails } from '../../lib/db'; // Server-side data fetching

export default async function ProductPage({ params }) {
  const product = await getProductDetails(params.id); // Fetches data on the server

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      {/* SC renders the CC, passing necessary props */}
      <AddToCartButton productId={product.id} productName={product.name} />
    </div>
  );
}