import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import hostname from "../../../hostname";

// Créer une instance axios
const axiosInstance = axios.create({
  baseURL: `${hostname}/api/v1/epicerie/auth/refresh`,
  withCredentials: true,
});

const useAuth = () => {
  const navigate = useNavigate();

  // Intercepteur pour les réponses
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const { data } = await axiosInstance.post('/refresh-token');
          localStorage.setItem('accessToken', data.accessToken);

          axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
          originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;

          return axiosInstance(originalRequest);
        } catch (refreshError) {
          localStorage.removeItem('accessToken');
          navigate('/login');
        }
      }

      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default useAuth;
