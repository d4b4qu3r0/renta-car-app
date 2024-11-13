export const formatPrice = (price: number) => {
    return new Intl.NumberFormat("COP", {
      style: "currency",
      currency: "COL",
    }).format(price);
  };