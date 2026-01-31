exports.success = (res, data) => {
    return res.json({
      success: true,
      data,
    });
  };
  
  exports.error = (res, message, code = 400) => {
    return res.status(code).json({
      success: false,
      message,
    });
  };
  