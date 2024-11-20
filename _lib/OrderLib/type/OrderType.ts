interface OrderItem {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    pdfFile?: string;
}

interface PaidOrderItem {
    productId: string;
    name: string;
    price: number;
    quantity: number;
}

export interface CreateOrderParams {
    userId: string;
    items: OrderItem[];
    amount: number;
}

export interface OrderDetails {
    _id: string;
    name: string;
    email: string;
    phone: string;
    address: {
        line1: string;
        line2: string;
        city: string;
        postalCode: string;
        country: string;
    };
    items: Array<{
        productId: string;
        name: string;
        price: number;
        quantity: number;
        pdfFile?: string;
    }>;
    amount: number;
    status: "pending" | "paid" ;
    createdAt: string;
}