export interface AdminDashboardData {
    agents: number;
    customers: number;
    hotProducts: number;
    
    
    hotProductsList: Array<{
        productId: number;
        productName: string;
        productDescription: string;
        productPrice: number;
        stockQuantity: number;
        images: Array<{ url: string }>;
    }>;

    orders: number;
    products: number;
    totalStock: number;
    unassigned: number;
    
    underStockProducts: Array<{
        productId: number;
        productName: string;
        productPrice: number;
        stockQuantity: number;
        productDescription: string;
    }>;
}
