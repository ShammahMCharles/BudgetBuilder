const checkOwnership = (Model) => {
  return async (req, res, next) => {
    try {
      const document = await Model.findById(req.params.id);

      if (!document) {
        return res.status(404).json({
          message: "Resource not found.",
        });
      }

      if (document.user.toString() !== req.user.toString()) {
        return res.status(403).json({
          message: "You are not authorized to access this resource.",
        });
      }

      req.resource = document;

      next();
    } catch (error) {
      res.status(500).json({
        message: "Server error.",
        error: error.message,
      });
    }
  };
};

module.exports = checkOwnership;