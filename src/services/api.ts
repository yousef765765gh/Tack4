const BASE_URL = 'https://dashboard-i552.onrender.com/api';

function getToken(): string | null {
  return localStorage.getItem('token');
}

function getAuthHeaders(): Record<string, string> {
  const token = getToken();
  return {
    Accept: 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export async function login(email: string, password: string) {
  const formData = new FormData();
  formData.append('email', email);
  formData.append('password', password);

  const res = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: { Accept: 'application/json' },
    body: formData,
  });
  if (!res.ok) throw new Error('Login failed');
  return res.json();
}

export async function register(data: {
  first_name: string;
  last_name: string;
  user_name: string;
  email: string;
  password: string;
  password_confirmation: string;
  profile_image: File | null;
}) {
  const formData = new FormData();
  formData.append('first_name', data.first_name);
  formData.append('last_name', data.last_name);
  formData.append('user_name', data.user_name);
  formData.append('email', data.email);
  formData.append('password', data.password);
  formData.append('password_confirmation', data.password_confirmation);
  if (data.profile_image) {
    formData.append('profile_image', data.profile_image);
  }

  const res = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    body: formData,
  });

  const responseData = await res.json().catch(() => ({}));

  if (!res.ok) {
    const msg =
      responseData.message ||
      responseData.error ||
      (responseData.errors
        ? Object.values(responseData.errors).flat().join(', ')
        : null) ||
      'Registration failed';
    throw new Error(msg as string);
  }

  return responseData;
}

export async function logout() {
  const res = await fetch(`${BASE_URL}/logout`, {
    method: 'POST',
    headers: getAuthHeaders(),
  });
  return res.json();
}

export async function getItems(page = 1, search = '') {
  const params = new URLSearchParams({ page: String(page) });
  if (search) params.append('name', search);

  const res = await fetch(`${BASE_URL}/items?${params}`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error('Failed to fetch items');
  return res.json();
}

export async function getItem(id: number) {
  const res = await fetch(`${BASE_URL}/items/${id}`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error('Failed to fetch item');
  return res.json();
}

export async function createItem(data: {
  name: string;
  price: string;
  image: File | null;
}) {
  const formData = new FormData();
  formData.append('name', data.name);
  formData.append('price', data.price);
  if (data.image) {
    formData.append('image', data.image);
  }

  const res = await fetch(`${BASE_URL}/items`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: formData,
  });
  if (!res.ok) throw new Error('Failed to create item');
  return res.json();
}

export async function updateItem(
  id: number,
  data: { name: string; price: string; image: File | null }
) {
  const formData = new FormData();
  formData.append('name', data.name);
  formData.append('price', data.price);
  formData.append('_method', 'PUT');
  if (data.image) {
    formData.append('image', data.image);
  }

  const res = await fetch(`${BASE_URL}/items/${id}`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: formData,
  });
  if (!res.ok) throw new Error('Failed to update item');
  return res.json();
}

export async function deleteItem(id: number) {
  const res = await fetch(`${BASE_URL}/items/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error('Failed to delete item');
  return res.json();
}
