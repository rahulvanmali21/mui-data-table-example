type FuncType = (...args: any[]) => any;

export function debounce<F extends FuncType>(func: F, delay: number): (...args: Parameters<F>) => void {
  let timerId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<F>): void => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}