const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
userName : String,
userPassword : String,
userType : String,
userTelNo : String,
userEmail : String,
city : String,
dateSaved: {
type: Date,
default: Date.now
}
});
module.exports = mongoose.model('User', UserSchema);