
import ProductPageComponent from "@/components/layout/product-page";

export default async function ProductPage({
    params
}:  Readonly<{
    params: { product: string; category: string; }
    }>) {

    const { category, product } = await params;

    return (
        <ProductPageComponent category={category} product={product}/>
    );
}