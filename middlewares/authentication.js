const { verifyToken } = require('../helpers/jwt');
const { User } = require('../models/index')


async function authentication(req, res, next) {
    try {
        let access_token = req.headers.access_token
        console.log(access_token);
        if (!access_token) throw ({ name: "InvalidToken" })

        let payload = verifyToken(access_token)

        let user = await User.findByPk(payload.id)//mencari payload.id
        if (!user) throw ({ name: "InvalidToken" })
        ;

        req.user = {
            id: user.id,
            email: user.email,
            username: user.username
        }
        next();
    } catch (error) {
        res.status(403).json(error)
        next(error)
 
    }
}

module.exports = { authentication }