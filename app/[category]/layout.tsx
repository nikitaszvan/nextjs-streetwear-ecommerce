import { notFound } from 'next/navigation';
import { categoriesRef } from '@/constants/product-constants';

const CategoryLayout = async ({
    children,
    params
}: Readonly<{
    children?: React.ReactNode;
    params: { category: string }
}>) => {
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
};

export default CategoryLayout;