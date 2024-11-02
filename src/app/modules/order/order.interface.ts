export type TOrderProducts = {
    productId: string;
    quantity: number;
}


export type TOrder = {
    userId?: string;
    products: TOrderProducts[]
    payableAmount: number;
    paymentStatus?: 'pending' | 'paid' | 'canceled'
}