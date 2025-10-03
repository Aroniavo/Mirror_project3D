class Result {

  static Ok(res, data) {
    return res.status(200).json({ ...data });
  }

  static created(res, data) {
    return res.status(201).json({ success: true, ...data });
  }

  static notFound(res, message = "Not Found") {
    return res.status(404).json({ success: false, message });
  }

  static unauthorized(res, message = "Unauthorized") {
    return res.status(401).json({ success: false, message });
  }

  static conflict(res, message = "Conflict") {
    return res.status(409).json({ success: false, message });
  }

  static error(res, message = "Internal Server Error") {
    return res.status(500).json({ success: false, message });
  }
}

module.exports = Result