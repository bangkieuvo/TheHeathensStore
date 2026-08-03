import {apiClient} from './apiClient.ts';
import type {ApiResponse} from '../types/generic/apiResponse.ts';
import type {AdminCatalog, AdminCustomer, AdminDashboard, AdminOrder, AdminProduct, AdminProductRequest, AdminRecord, AdminSetting, AdminStaffMember} from '../types/admin.ts';
import {BACKEND_API_URL} from '../util/constants.ts';

const API_URL = `${BACKEND_API_URL}/admin`;
const unwrap = <T>(wrapper: ApiResponse<T>): T => {
    if (!wrapper.success || wrapper.data === undefined || wrapper.data === null) throw new Error(wrapper.message);
    return wrapper.data;
};

export const getAdminDashboard = async () => unwrap((await apiClient.get<ApiResponse<AdminDashboard>>(`${API_URL}/dashboard`)).data);
export const getAdminCatalog = async () => unwrap((await apiClient.get<ApiResponse<AdminCatalog>>(`${API_URL}/catalog`)).data);
export const getAdminProducts = async () => unwrap((await apiClient.get<ApiResponse<AdminProduct[]>>(`${API_URL}/products`)).data);
export const createAdminProduct = async (request: AdminProductRequest) => unwrap((await apiClient.post<ApiResponse<AdminProduct>>(`${API_URL}/products`, request)).data);
export const updateAdminProduct = async (uuid: string, request: AdminProductRequest) => unwrap((await apiClient.put<ApiResponse<AdminProduct>>(`${API_URL}/products/${uuid}`, request)).data);
export const updateAdminStock = async (uuid: string, stock: number) => unwrap((await apiClient.patch<ApiResponse<AdminProduct>>(`${API_URL}/products/${uuid}/stock`, {stock})).data);
export const archiveAdminProduct = async (uuid: string) => unwrap((await apiClient.delete<ApiResponse<AdminProduct>>(`${API_URL}/products/${uuid}`)).data);
export const getAdminOrders = async () => unwrap((await apiClient.get<ApiResponse<AdminOrder[]>>(`${API_URL}/orders`)).data);
export const updateAdminOrder = async (uuid: string, request: Pick<AdminOrder, 'orderStatus' | 'paymentStatus' | 'internalNote'>) => unwrap((await apiClient.patch<ApiResponse<AdminOrder>>(`${API_URL}/orders/${uuid}`, request)).data);
export const getAdminCustomers = async () => unwrap((await apiClient.get<ApiResponse<AdminCustomer[]>>(`${API_URL}/customers`)).data);
export const updateAdminCustomerStatus = async (uuid: string, active: boolean) => unwrap((await apiClient.patch<ApiResponse<AdminCustomer>>(`${API_URL}/customers/${uuid}/status`, {active})).data);
export const getAdminSettings = async () => unwrap((await apiClient.get<ApiResponse<AdminSetting[]>>(`${API_URL}/settings`)).data);
export const saveAdminSetting = async (request: Pick<AdminSetting, 'key' | 'value' | 'description'>) => unwrap((await apiClient.put<ApiResponse<AdminSetting>>(`${API_URL}/settings`, request)).data);
export const deleteAdminSetting = async (key: string) => apiClient.delete(`${API_URL}/settings/${encodeURIComponent(key)}`);
export const getAdminRecords = async () => unwrap((await apiClient.get<ApiResponse<AdminRecord[]>>(`${API_URL}/records`)).data);
export const createAdminRecord = async (request: Omit<AdminRecord, 'uuid' | 'updatedAt'>) => unwrap((await apiClient.post<ApiResponse<AdminRecord>>(`${API_URL}/records`, request)).data);
export const updateAdminRecord = async (uuid: string, request: Omit<AdminRecord, 'uuid' | 'updatedAt'>) => unwrap((await apiClient.put<ApiResponse<AdminRecord>>(`${API_URL}/records/${uuid}`, request)).data);
export const deleteAdminRecord = async (uuid: string) => apiClient.delete(`${API_URL}/records/${uuid}`);
export const getAdminStaff = async () => unwrap((await apiClient.get<ApiResponse<AdminStaffMember[]>>(`${API_URL}/staff`)).data);
export const addAdminStaff = async (userUuid: string, employeeCode: string) => unwrap((await apiClient.post<ApiResponse<AdminStaffMember>>(`${API_URL}/staff`, {userUuid, employeeCode})).data);
export const removeAdminStaff = async (userUuid: string) => apiClient.delete(`${API_URL}/staff/${userUuid}`);

export const uploadAdminProductImages = async (uuid: string, mainImage: File, subImages: File[]) => {
    const formData = new FormData();
    formData.append('mainImage', mainImage);
    subImages.forEach((image) => formData.append('subImages', image));
    await apiClient.post(`${API_URL}/products/${uuid}/images`, formData);
};

export const exportAdminProducts = async () => {
    const response = await apiClient.get(`${API_URL}/products/export`, {responseType: 'blob'});
    const url = URL.createObjectURL(response.data);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'products.csv';
    link.click();
    URL.revokeObjectURL(url);
};
