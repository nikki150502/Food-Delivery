const jwt = require('jsonwebtoken')

const authMiddleware = async (req, res, next) => {
    const { token } = req.headers
    if (!token) {
        return res.json({ success: false, message: "Not Authorized Login Again" })
    }
    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRETE)
        req.body.userId = token_decode.id
        next();
    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: "error" })
    }
}

module.exports = authMiddleware