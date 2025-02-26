import FeaturedProduct from "@/components/layout/featured-product"
import ProductsContainer from "@/components/layout/preview-categories";

const MainLayout = ({
  children,
}: Readonly<{
  children?: React.ReactNode;
}>) => {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 pb-6 pt-2 sm:px-6 lg:px-8">
      <FeaturedProduct />
      <ProductsContainer />
      {children}
    </main>
  )
};

export default MainLayout;
