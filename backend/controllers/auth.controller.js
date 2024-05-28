import User from "../models/user.model.js";
import genrateToken from "../utils/generateToken.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ error: "password don't match" })
        }

        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ error: "username already exists" });
        }

        //hash password here
        // const salt =  bcrypt.getSalt(10);
        // const hashedPassword =  bcrypt.hash(password,salt);


        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`

        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

        const newUser = new User({
            fullName,
            username,
            password,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic
        })
        if (newUser) {
            genrateToken(newUser._id);
            console.log(genrateToken(newUser._id));
            await newUser.save();
            res.status(201).json(newUser)

        }
        else {
            res.status(400).json({ error: "Invalid user data" });
        }

    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({ error: "internal server Error" });
    }
}
export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (password !== user.password) {
            return res.status(400).json({ error: "Invalid credentials" })
        }

        let token = await genrateToken(user._id);
        console.log(token);

        res.status(200).json({
            message: "login successfuly",
            data: token
        });
    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ error: "Internal server Error" })
    }
}
export const logout = (req, res) => {
    try {
        res.cookie("jwt", { maxAge: 0 })
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

