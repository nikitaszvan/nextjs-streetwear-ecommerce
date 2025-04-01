const ProductDetails = ({
    productName,
    productPrice,
  }: {
    productName: string;
    productPrice: number;
  }) => (
    <article aria-labelledby="product-name" className="flex flex-col gap-4">
      <h1 id="product-name" className="text-3xl font-bold leading-none tracking-tight text-foreground">
        {productName}
      </h1>
      <p className="mt-2 text-2xl font-medium leading-none tracking-tight text-foreground/70">
        $ {productPrice}
      </p>
      <section aria-labelledby="product-description">
        <h2 id="product-description" className="sr-only">
          Description
        </h2>
        <div className="prose text-secondary-foreground">
          <p>
            These classics are a wardrobe essential. Designed for both comfort and versatility, they pair well with any attire. The cushioned inner layer ensures all-day comfort.
          </p>
        </div>
      </section>
    </article>
  );
  
  export default ProductDetails;