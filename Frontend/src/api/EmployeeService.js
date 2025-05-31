import axios from "axios";

const API_URL = 'http://localhost:8080/employees';

export async function saveEmployee(employee) {
    return await axios.post(API_URL, employee);
}

export async function getEmployees(page = 0, size = 10) {
    return await axios.get(`${API_URL}?page=${page}&size=${size}`);
}

export async function getEmployee(id) {
    return await axios.get(`${API_URL}/${id}`);
}

export async function updateEmployee(id, employee) {
    return await axios.put(`${API_URL}/${id}`, employee);
}

export async function updatePhoto(formData) {
    return await axios.put(`${API_URL}/photo`, formData);
}

export async function deleteEmployee(id) {
    return await axios.delete(`${API_URL}/${id}`);
}

export async function uploadProfileImage(id, formData) {
    return await axios.post(`${API_URL}/${id}/profile-image`, formData);
}

export async function getProfileImage(id) {
    const response = await axios.get(`${API_URL}/${id}/profile-image`, {
        responseType: 'blob',
    });
    return URL.createObjectURL(response.data);
}