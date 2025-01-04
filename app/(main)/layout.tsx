import FeaturedProduct from "@/components/layout/featured-product"
import PreviewCategories from "@/components/layout/preview-categories"

export default function MainLayout({
    children,
  }: Readonly<{
    children?: React.ReactNode;
  }>){
    return (
        <>
            <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 pb-6 pt-2 sm:px-6 lg:px-8">
                <FeaturedProduct />
                <PreviewCategories category="shirts-top-men"/>
                <PreviewCategories category="outerwear-top-men"/>
                <PreviewCategories category="pants-bottom-men"/>
                <PreviewCategories category="shoes-men"/>
            </main>
            
        </>
    )
}      