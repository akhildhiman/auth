var mongoose = require("mongoose");
var bcrypt = require("bcrypt"); //used to hash the password.

// Creating the user schema
var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    }
})

// presave hook runs before save hook
// Add a presave hook, defined on the schema- whenever a user saves/creates his info, pre save hook is invoked before the save hook and we save the password.
// next tells where it should go.
// this correseponds to the userSchema.
// salt makes the password stronger.

// Adding a presave hook
userSchema.pre("save", function(next) {
    console.log(this.password);
    this.password = bcrypt.hashSync(this.password, 10);
    console.log(this.password);
    next();
})

// Validating password
userSchema.methods.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.password) //comapares the entered password when user tries to login AND the hashed password already present in the user.
}

var User = mongoose.model("User", userSchema);

// Exporting the model
module.exports = User;