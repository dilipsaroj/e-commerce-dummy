import { ProductCard } from '@/components/ProductCard/ProductCard';
import { InlineMessage } from '@/components/UI/InlineMessage';
import { useProducts } from '@/hooks/useProducts';
import styles from '@/pages/ProductListingPage/ProductListingPage.module.scss';

const ProductListingPage = () => {
  const { data: products, error, isLoading } = useProducts();

  if (isLoading) {
    return <InlineMessage title="Loading products" description="Fetching the latest essentials for the storefront." />;
  }

  if (error !== null) {
    return <InlineMessage title="Unable to load products" description={error} />;
  }

  if (products.length === 0) {
    return <InlineMessage title="No products yet" description="The catalog is empty right now. Please check back soon." />;
  }

  return (
    <section className={styles.page}>
      <div className={styles.hero}>
        <p className={styles.eyebrow}>Curated collection</p>
        <h1>Objects with calmer lines and sharper details.</h1>
        <p>
          Browse a responsive catalog backed by the Fake Store API, enriched with realistic variants and production-ready states.
        </p>
      </div>

      <div className={styles.grid}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductListingPage;
