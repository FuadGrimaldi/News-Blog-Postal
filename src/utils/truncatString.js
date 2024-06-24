function truncatString(str, num) {
  if (str.length > num) {
    return str.slice(0, num) + "...";
  } else {
    return str;
  }
}

module.exports = truncatString;
