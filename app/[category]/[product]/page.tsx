// Presentation Layer
import ProdRecsWrapper from "@/components/products/product-page/prod-recs-wrapper";

const ProductPage = async ({
    params
}: {
    params: Promise<{ product: string; category: string }>
}) => {

    const { category, product } = await params;

    return (
        <ProdRecsWrapper category={category} product={product} />
    );
};

export default ProductPage;