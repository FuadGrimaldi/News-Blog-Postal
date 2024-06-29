const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    const message = "Logout Successfull!";
    req.session.Message = message;
    console.log(`logout ${req.session.Message}`);
    res.redirect("/");
  } catch (error) {
    console.log(error);
    const message = "Internal Server Error";
    res.status(500).send({ message: message });
  }
};

module.exports = { logout };
