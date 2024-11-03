export type TOrderProducts = {
  productId: string;
  quantity: number;
};

export type TOrder = {
  userId?: string;
  products: TOrderProducts[];
  totalPrice: {
    type: String;
    required: true;
  };
  paymentStatus?: "pending" | "paid" | "canceled";
};
