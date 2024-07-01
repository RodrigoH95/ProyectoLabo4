import { checkResponse, getAuthHeader } from "@/utils/services";

const { VITE_API_URL: baseUrl } = import.meta.env;

export const getProducts = async (sorting = "id ASC") => {
    const response = await fetch(`${baseUrl}/Producto?sorting=${sorting}`);
    return checkResponse(response);
}

export const createProduct = async (product) => {
    const response = await fetch(`${baseUrl}/Producto`, {
        method: "POST",
        headers: {
            Authorization: getAuthHeader(),
            "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
    });
    return checkResponse(response);
}

export const getOneProduct = async (id) => {
    const response = await fetch(`${baseUrl}/Producto/${id}`);
    return checkResponse(response);
}

export const updateProduct = async (id, product) => {
    const response = await fetch(`${baseUrl}/Producto/${id}`, {
        method: "PUT",
        headers: {
            Authorization: getAuthHeader(),
            "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
    });
    return checkResponse(response);
}

export const deleteProduct = async (id) => {
    const response = await fetch(`${baseUrl}/Producto/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: getAuthHeader(),
        }
    });
    return checkResponse(response);
}

export const getProductsByUser = async (id) => {
    const response = await fetch(`${baseUrl}/Producto/usuario/${id}/productos`);
    return checkResponse(response);
}
