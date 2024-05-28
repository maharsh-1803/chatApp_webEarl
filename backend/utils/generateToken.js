import jwt from 'jsonwebtoken';

const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '15d'
    })

    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development"
    })
}


const genrateToken = async ({ _id }) => {
    try {
        let payload = { _id };
        let token = jwt.sign(payload, process.env.JWT_SECRET)
        return { token: token }
    } catch (error) {
        return error
    }
}

export default genrateToken;