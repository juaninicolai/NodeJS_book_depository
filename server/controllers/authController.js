import User from '../models/User.js';
import jwt from 'jsonwebtoken';

export const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: ''};

    //incorrect email
    if(err.message === 'incorrect email') {
        errors.email = 'that email is not registered';
    };

    //incorrect password
    if(err.message === 'incorrect password') {
        errors.email = 'that password is incorrect';
    };

    //duplicate email
    if(err.code === 11000){
        errors.email = 'That email is already registered';
    };

    if(err.message.includes('user validation failed')){
       Object.values(err.errors).forEach(({properties}) => {
           errors[properties.path] = properties.message;
       });
    };
    return errors;
}

export const maxAge = 1 * 24 * 60 * 60;
export const createToken = (id) => {
    return jwt.sign({ id}, 'secret token', {
        expiresIn: maxAge
    });
}

export const signup_get = (req,res) => {
    
};

export const login_get = (req,res) => {
   
};

export const signup_post = async (req,res) => {
    const { email, password } = req.body;

    try{
        const user = await User.create({ email, password})
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000})
        res.status(201).json({ user: user._id});
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
};

export const login_post = async (req,res) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000})
        res.status(200).json({ user : user._id});

    } catch (error) {
        const errors = handleErrors(error);
        res.status(400).json({ errors});
    }
};

export const logout_get = (req,res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
}
console.log("authController loaded");
export default User;