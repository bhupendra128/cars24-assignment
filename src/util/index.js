
export const throttle = (fn, limit) => {
  let flag = true;
  return function() {
    let args = arguments,
      context = this;
    if (flag) {
      fn.apply(context, args);
      flag = false;
      setTimeout(() => {
        flag = true;
      }, limit);
    }
  };
};
