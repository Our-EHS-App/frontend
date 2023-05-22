import { notification } from 'antd';
import { AxiosError } from 'axios';

const handleErrorNotifications = (error: AxiosError<any>) => {
  if (error?.response?.data?.errors?.length) {
    error.response.data.errors.forEach((e: any) => {
      notification.error({ message: e?.message, duration: 1.5 });
    });
  } else {
    notification.error({
      message: error?.response?.data?.message,
      duration: 1.5,
    });
  }
};

export { handleErrorNotifications };
