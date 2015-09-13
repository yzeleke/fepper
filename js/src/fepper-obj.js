/**
 * Global constant object for browser JavaScripts.
 *
 * Create this constant object as a member of the window object so it can be a
 * global source of properties and methods in all following browser JavaScripts.
 */
window.FEPPER = {
  breakpoints: {
    lg: {
      maxWidth: window.bp_lg_max,
      minWidth: window.bp_lg_min
    },
    md: {
      maxWidth: window.bp_md_max,
      minWidth: window.bp_md_min
    },
    sm: {
      maxWidth: window.bp_sm_max,
      minWidth: window.bp_sm_min
    },
    xs: {
      maxWidth: window.bp_xs_max,
      minWidth: window.bp_xs_min
    }
  }
};
