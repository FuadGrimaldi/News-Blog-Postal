const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.redirect("/");
  } catch (error) {
    console.log(error);
    const message = "Internal Server Error";
    res.status(500).send({ message: message });
  }
};

module.exports = { logout };
