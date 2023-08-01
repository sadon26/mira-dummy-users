import { onMounted, reactive, ref, watch } from 'vue';
import axios from 'axios';

type Props = {
  url: string;
  type?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSuccess?: (e: any) => void;
  onError?: (e: any) => void;
  enabled?: boolean;
};

export const useQuery = ({ type = 'get', url, onSuccess, onError, enabled = true }: Props) => {
  const isLoading = ref(false);
  const isSuccess = ref(false);
  const data = reactive({});
  const isError = ref(false);
  const error = ref({});

  const mutate = async ({
    payload,
    config,
    url: newURL
  }: {
    payload?: any;
    config?: any;
    url?: string;
  }) => {
    console.log(url, '>>>>');
    isLoading.value = true;
    isError.value = false;
    isSuccess.value = false;
    error.value = {};

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response: any = await (axios as any)[type as string](newURL || url, payload, config);
      console.log(response.data);
      Object.assign(data, response.data);
      isSuccess.value = true;
      onSuccess?.(response);
      return Promise.resolve(response);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      isError.value = true;
      error.value = err;
      onError?.(err);

      return Promise.reject(error);
    } finally {
      isLoading.value = false;
    }
  };

  onMounted(() => {
    type === 'get' && enabled && mutate({});
  });

  return {
    error,
    isLoading,
    isSuccess,
    isError,
    data,
    mutate
  };
};
