import axios, { AxiosRequestConfig } from 'axios';
import { useTranslation } from 'react-i18next';

const options: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_BASE_URL,
};

export const useApi = () => {
  const {
    i18n: { language },
  } = useTranslation();
  const apiPublic = axios.create(options);
  const apiPrivate = axios.create(options);
  // Add a request interceptor
  apiPrivate.interceptors.request.use(
    function (config: any) {
      config.headers = {
        'Accept-Language': language,
      };

      config.headers = {
        ...config.headers,
        Authorization: `Bearer `,
      };

      return config;
    },
    function (error) {
      // Do something with request error
      if (
        error?.response?.headers['content-type'].includes('text/html') &&
        error.response.data.toLowerCase().includes('support id')
      ) {
        const ticketNumber = error.response.data.replace(/\D+/g, '');
        alert(
          `The requested URL was rejected. Please consult with your administrator. Your support ID is: ${ticketNumber}`
        );
      }
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  apiPrivate.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to
      // trigger Do something with response data
      return response;
    },
    function (error) {
      // Any status codes that falls outside the range of 2xx cause this
      // function to trigger Do something with response error
      if (
        error?.response?.headers['content-type'].includes('text/html') &&
        error.response.data.toLowerCase().includes('support id')
      ) {
        const ticketNumber = error.response.data.replace(/\D+/g, '');
        alert(
          `The requested URL was rejected. Please consult with your administrator. Your support ID is: ${ticketNumber}`
        );
      }
      return Promise.reject(error);
    }
  );

  return { apiPrivate, apiPublic };
};
