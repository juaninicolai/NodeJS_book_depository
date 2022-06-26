import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';
const isEmail = validator.isEmail;

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [ isEmail, 'Please enter a valid email'],
    },
    password: {
        type: String,
        require: [true, 'Please enter a password'],
        minlength: [6, 'Minimun password length is 6 characters']
    }
});

userSchema.post('save', function(doc, next) {
    console.log('new user was created and saved', doc);
    next();
})

userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email });
    if (user) {
      const auth = await bcrypt.compare(password, user.password)
      if (auth) {
        return user;
      };
      throw Error('Incorrect password');
    };
    throw Error('Incorrect email');
}

const User = mongoose.model('user', userSchema);

export default User;