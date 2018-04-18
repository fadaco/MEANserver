/**
 * Created by proteux on 4/15/18.
 */
const mongoose = require('mongoose');

const schema = mongoose.Schema;

const UserSchema = new schema({
   email: {
       type: String,
       required: true
   },
    number: {
       type: String,
        required: true
    },
    username: {
       type: String,
        required: true
   },
    admin: {
       type: Boolean,
        default: 0
    },
    password: {
      type: String,
        required: true
    },
    date: {
       type: Date,
        default: Date.now
    }
});

mongoose.model('users', UserSchema);
