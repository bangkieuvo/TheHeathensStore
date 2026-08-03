export interface AdminDashboard {
    revenue: number;
    orders: number;
    pendingOrders: number;
    customers: number;
    products: number;
    lowStockProducts: number;
    revenueByMonth: Record<string, number>;
    topProducts: AdminProduct[];
}

export interface AdminProduct {
    uuid: string;
    name: string;
    price: number;
    stock: number;
    salesCount: number;
    description: string;
    jerseyType: string;
    teamId: number | null;
    teamName: string | null;
    leagueName: string | null;
    seasonId: number | null;
    season: string | null;
    active: boolean;
    thumbnailUrl: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface AdminProductRequest {
    name: string;
    price: number;
    stock: number;
    description: string;
    jerseyType: string;
    teamId: number | null;
    seasonId: number | null;
    active: boolean;
}

export interface AdminOrderItem {
    productUuid: string;
    productName: string;
    quantity: number;
    unitPrice: number;
    lineTotal: number;
}

export interface AdminOrder {
    uuid: string;
    customerUsername: string | null;
    customerEmail: string | null;
    orderStatus: string;
    paymentStatus: string;
    shippingMethod: string;
    paymentMethod: string;
    totalAmount: number;
    shippingFee: number;
    recipientName: string;
    recipientPhone: string;
    shippingAddress: string;
    internalNote: string | null;
    createdAt: string;
    updatedAt: string;
    items: AdminOrderItem[];
}

export interface AdminCustomer {
    uuid: string;
    username: string;
    email: string;
    fullName: string | null;
    phone: string | null;
    active: boolean;
    orderCount: number;
    totalSpent: number;
    createdAt: string;
}

export interface AdminCatalogItem {
    id: number;
    name: string;
}

export interface AdminCatalog {
    teams: (AdminCatalogItem & {type: string; leagueId: number | null; leagueName: string | null})[];
    seasons: AdminCatalogItem[];
    leagues: AdminCatalogItem[];
    jerseyTypes: string[];
}

export interface AdminSetting {
    key: string;
    value: string;
    description: string;
    updatedAt: string;
}

export interface AdminRecord {
    uuid: string;
    type: 'PROMOTION' | 'BANNER' | 'BLOG' | 'EMAIL_TEMPLATE';
    key: string;
    title: string;
    content: string;
    value: string;
    active: boolean;
    startsAt: string | null;
    endsAt: string | null;
    updatedAt: string;
}

export interface AdminStaffMember {
    uuid: string;
    employeeCode: string;
    username: string;
    email: string;
    fullName: string | null;
    active: boolean;
    isAdmin: boolean;
}
