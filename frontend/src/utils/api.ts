import axios, { AxiosResponse } from "axios";

// Интерфейс администратора
export interface Admin {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  card_count: number;
  is_active: boolean;
}

export interface Product {
  id: number;
  name: string;
  category: string;
  model?: string;
  description?: string;
  imageUrl?: string;
  is_visible: boolean;
  updatedAt?: string;
}


// Функция получения всех администраторов
export const fetchAdmins = async (): Promise<Admin[]> => {
  const response = await axios.get<Admin[]>("https://localhost:7162/api/admins/");
  return response.data;
};

// Функция получения администратора по ID
export const fetchAdminById = async (id: number): Promise<Admin> => {
  const response = await axios.get<Admin>(`https://localhost:7162/api/admins/${id}`);
  return response.data;
};

// Функция обновления данных администратора
export const updateAdmin = async (id: number, updatedData: Partial<Admin>): Promise<Admin> => {
  const response = await axios.put<Admin>(`https://localhost:7162/api/admins/${id}`, updatedData);
  return response.data;
};

// Функция удаления администратора (опционально)
export const deleteAdmin = async (id: number): Promise<void> => {
  await axios.delete(`https://localhost:7162/api/admins/${id}`);
};

export const searchAdmins = async (query: string): Promise<Admin[]> => {
  const response = await axios.get<Admin[]>(`https://localhost:7162/admins/search?query=${query}`);
  return response.data;
};
export const updateProductPartially = async (
  id: number,
  patchData: Partial<Product>
): Promise<void> => {
  // Преобразуем `patchData` в формат JSON Patch
  const patchBody = Object.keys(patchData).map((key) => ({
    op: "replace",
    path: `/${key}`,
    value: patchData[key as keyof Product],
  }));

  await axios.patch(
    `https://localhost:7208/api/Products/${id}`, // Указываем правильный URL
    patchBody,
    {
      headers: {
        "Content-Type": "application/json-patch+json", // Важно указать тип данных
      },
    }
  );
};

export const getProductsByAdmin = async (
  adminId: number
): Promise<Product[]> => {
  const response: AxiosResponse<Product[]> = await axios.get(
    `https://localhost:7208/api/Products/by-admin/${adminId}`
  );
  return response.data;
};