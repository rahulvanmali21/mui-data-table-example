function debouce(func:any, delay = 300) {
    let timeout:any;
    return (...args:any) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func(args);
      }, delay);
    };
  }
  
  export default debouce;