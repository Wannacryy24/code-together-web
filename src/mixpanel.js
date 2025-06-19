import mixpanel from "mixpanel-browser";

mixpanel.init('c353a0c68083cc5b406476215cda254a', {
  debug: true, // helpful during dev
});

export default mixpanel;