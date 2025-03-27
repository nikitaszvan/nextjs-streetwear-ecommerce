// Presentation Layer
import FeaturedProduct from "@/components/layout/featured-product";
import PreviewProductsContainer from "@/components/layout/preview-products-container";

const Main = ({
  children,
}: Readonly<{
  children?: React.ReactNode;
}>) => {
  return (
    <main
      className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 pb-6 pt-2 sm:px-6 lg:px-8"
      role="main"
      aria-label="Main content"
    >
      <h1 className="sr-only">Main Content</h1>
      <section aria-labelledby="featured-product">
        <h2 id="featured-product" className="sr-only">Featured Product</h2>
        <FeaturedProduct />
      </section>
      <section aria-labelledby="preview-products">
        <h2 id="preview-products" className="sr-only">Preview Products</h2>
        <PreviewProductsContainer />
      </section>
      {children}
    </main>
  );
};

export default Main;