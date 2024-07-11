// public/js/timer.js
function hideAlertAfterTimeout(elementClass, timeout) {
  setTimeout(function () {
    const elements = document.getElementsByClassName(elementClass);
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.remove("d-flex");
      elements[i].classList.add("d-none");
    }
  }, timeout);
}

// Export the function for use in other scripts
if (typeof module !== "undefined" && module.exports) {
  module.exports = hideAlertAfterTimeout;
}
