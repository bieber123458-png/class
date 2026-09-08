function adminAuth(req, res, next) {
  const expected = process.env.ADMIN_KEY || 'changeme';
  const provided = req.get('x-admin-key') || req.query.key;
  if (provided !== expected) {
    return res.status(401).json({ error: '審核台金鑰錯誤或未提供' });
  }
  next();
}

module.exports = adminAuth;
