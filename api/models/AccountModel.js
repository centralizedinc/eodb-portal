var mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

var AccountModelSchema = new mongoose.Schema({
    email: {
        type: String
    },
    password: {
        type: String
    },
    name: {
        first: {
            type: String
        },
        middle: {
            type: String
        },
        last: {
            type: String
        }
    },
    token: {
        type: String
    },
    date_created: {
        type: Date,
        default: new Date()
    },
    date_modified: {
        type: Date,
        default: new Date()
    },
    avatar: {
        type: String
    },
    status: {
        type: Number,
        default: 0
        /**
         * 0 - registered
         * 1 - setup
         * 2 - confirmed 
         */
    },
    confirmation_url: {
        type: String
    },
    method: {
        type: String
        /**
         * local
         * google
         * facebook
         */
    },
    google_id: {
        type: String
    },
    google_access_token: {
        type: String
    },
    facebook_id: {
        type: String
    },
    facebook_access_token: {
        type: String
    }
})

AccountModelSchema.pre('save', async function (callback) {
    var account = this;
    account.date_created = new Date();
    account.date_modified = new Date();

    if (account.password) {
        const salt = bcrypt.genSaltSync(5);
        const hash = bcrypt.hashSync(account.password, salt)
        account.password = hash;
    }
    callback();
});

AccountModelSchema.pre('findOneAndUpdate', function (callback) {
    console.log('this :', this._update);
    this.options.new = true;
    this.options.runValidators = true;
    this._update.date_modified = new Date();
    callback();
});

AccountModelSchema.methods.isValidPassword = function (password) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, this.password, (err, isValid) => {
            if (!err) resolve(isValid)
            else reject(err)
        });
    })
}

module.exports = mongoose.model('account', AccountModelSchema)