import { notFound } from 'next/navigation';
import CategoryGrid from '@/components/layout/category-grid';

const categoriesRef: Record<string, string> = {
    "shirts-top-men": "Tops",
    "outerwear-top-men": "Outerwear",
    "pants-bottom-men": "Bottoms",
    "shoes-men": "Shoes"
  } as const;

export default async function CategoryLayout({
    children,
    params
}:  Readonly<{
    children?: React.ReactNode;
    params: { category: string }
  }>)
   {
    const { category } = await params;

    if (!Object.keys(categoriesRef).includes(category)) {
        notFound();
    }

    return (
        <>
            <div className='flex p-2'>
                {children}
            </div>
        </>
    )
}