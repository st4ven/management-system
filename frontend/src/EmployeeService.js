import axios from "axios";

const API_URL = "http://localhost:3000/employees";

export async function saveEmployee(employee) {
    return await axios.post(API_URL, employee);
}

export async function getEmployees() {
    return await axios.get(API_URL);
}

export async function getEmployee(id) {
    return await axios.get(`${API_URL}/${id}`);
}

export async function updateEmployee(id) {
    return await axios.put(`${API_URL}/${id}`);
}

export async function deleteEmployee(employee) {
    return await axios.delete(`${API_URL}/${id}`);
}