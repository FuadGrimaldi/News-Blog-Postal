const setLayout = (layout) => {
  return (req, res, next) => {
    res.locals.layout = layout;
    next();
  };
};

module.exports = setLayout;
