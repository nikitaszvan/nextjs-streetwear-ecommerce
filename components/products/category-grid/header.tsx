type HeaderParams = {
    categorySlug: string;
    category: string;
    search?: string;
};

const Header = ({ categorySlug, category, search }: HeaderParams) => {
    return (
        <header>
            {categorySlug !== 'all-products' ? (
                <>
                    <h1 className="text-3xl font-bold leading-none tracking-tight text-foreground">
                        {category}
                    </h1>
                    <span className="text-lg font-semibold text-muted-foreground">Category</span>
                </>
            ) : (
                <h1 className="text-3xl font-bold leading-none tracking-tight text-foreground">
                    {!search ? 'All Products' : `Searching for "${search}"`}
                </h1>
            )}
        </header>
    );
};

export default Header;