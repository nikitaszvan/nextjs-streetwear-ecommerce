type HeaderParams = {
    editable: boolean;
    totalItemCount: number;
  };
  
  const Header = ({
    editable,
    totalItemCount
  }: HeaderParams) => (
    <header className="flex gap-3 items-end mb-4" aria-labelledby="cart-summary-title">
      <h1 id="cart-summary-title" className="text-3xl font-bold leading-none tracking-tight">
        {editable ? "Your cart" : "Cart Summary"}
      </h1>
      {editable && (
        <span className="text-muted-foreground" aria-label={`Total items in cart: ${totalItemCount}`}>
          ({totalItemCount} items)
        </span>
      )}
    </header>
  );
  
  export default Header;