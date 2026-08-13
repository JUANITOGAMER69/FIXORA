import api from "./api";

export const registrarUsuario = async (datos: any) => {
  const response = await api.post("/usuarios/registro", datos);
  return response.data;
};

export const loginUsuario = async (
  correo: string,
  password: string
) => {
  const response = await api.post("/usuarios/login", {
    correo,
    password,
  });

  return response.data;
};

export const obtenerPerfil = async (token: string) => {
  const response = await api.get("/usuarios/perfil", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};