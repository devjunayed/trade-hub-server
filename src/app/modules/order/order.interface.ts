export type TOrderProducts = {
  productId: string;
  quantity: number;
};

export type TOrder = {
  userId?: string;
  transactionId: string;
  products: TOrderProducts[];
  totalPrice: {
    type: number;
    required: true;
  };
  paymentStatus?: "pending" | "paid" | "canceled";
};
