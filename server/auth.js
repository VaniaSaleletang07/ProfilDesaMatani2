import jwt from 'jsonwebtoken'

const cookieName = 'matani2_admin_session'

export function createSession(res, user, secret) {
  const token = jwt.sign({ sub: user.id, role: user.role }, secret, {
    expiresIn: '8h',
    issuer: 'matani2-profile',
  })

  res.cookie(cookieName, token, {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 8 * 60 * 60 * 1000,
    path: '/',
  })
}

export function clearSession(res) {
  res.clearCookie(cookieName, { httpOnly: true, sameSite: 'strict', path: '/' })
}

export function requireAdmin(secret) {
  return (req, res, next) => {
    const token = req.cookies[cookieName]
    if (!token) return res.status(401).json({ message: 'Sesi admin diperlukan.' })

    try {
      const payload = jwt.verify(token, secret, { issuer: 'matani2-profile' })
      if (payload.role !== 'admin') throw new Error('Role tidak diizinkan')
      req.admin = payload
      next()
    } catch {
      clearSession(res)
      res.status(401).json({ message: 'Sesi tidak valid atau telah berakhir.' })
    }
  }
}
