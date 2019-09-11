import debounce from "lodash.debounce";

export const getWindowWidth = debounce(() => {
  if (window) {
    console.log("window innerwidth", window.innerWidth);
    return window.innerWidth;
  }
}, 250);

