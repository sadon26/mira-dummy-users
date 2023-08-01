import { onDeactivated, onActivated, watch } from 'vue';

export const useDebounce = (value: string, delay: number, setValue: (val: string) => void) => {
  let handler: ReturnType<typeof setTimeout> | null = null;

  watch(value as any, () => {
    clearTimeout(handler as any);
    handler = setTimeout(() => {
      setValue(value);
      handler = null;
    }, delay);
  });

  onActivated(() => {
    if (handler) {
      clearTimeout(handler);
      handler = null;
    }
  });

  onDeactivated(() => {
    if (handler) {
      clearTimeout(handler);
      handler = null;
    }
  });
};
