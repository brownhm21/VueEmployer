

export function notificationToast(append = false) {
    this.$bvToast.toast(`This is toast`, {
      title: "BootstrapVue Toast",
      autoHideDelay: 5000,
      appendToast: append
    });
  }