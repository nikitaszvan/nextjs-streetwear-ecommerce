
import ProdRecsWrapper from "@/components/layout/prod-recos-wrapper";

export default async function ProductPage({
    params
}:  Readonly<{
    params: { product: string; category: string; }
    }>) {

    const { category, product } = await params;

    return (
        <ProdRecsWrapper category={category} product={product}/>
    );
}