'use strict'

const sgMail = require('@sendgrid/mail');

// Utils
const ApplicationSettings = require('./ApplicationSettings');
const jwt = require('jsonwebtoken');

Date.prototype.addHours = function (hours) {
    this.setTime(this.getTime() + (hours * 60 * 60 * 1000));
    return this;
}

class SendEmail {

    static setKeys() {
        console.log('SENDGRID_API_KEY :', ApplicationSettings.getValue("SENDGRID_API_KEY"));
        console.log('EODB_EMAIL :', ApplicationSettings.getValue("EODB_EMAIL"));
        console.log('REGISTRATION_EMAIL_TEMPLATE :', ApplicationSettings.getValue("REGISTRATION_EMAIL_TEMPLATE"));
        sgMail.setApiKey(ApplicationSettings.getValue("SENDGRID_API_KEY"));
        sgMail.setSubstitutionWrappers('{{', '}}');
    }

    static registration(email, name, account_id) {
        const expiry_date = new Date().addHours(24);
        console.log('expiry_date :', expiry_date);
        const confirmation_token = new Buffer(JSON.stringify({
            account_id,
            date: new Date(),
            expiry_date
        })).toString('base64')
        const confirmation_url = `${process.env.VUE_APP_HOME_URL}confirmation?platform=local&data=${confirmation_token}`
        console.log('confirmation_url :', confirmation_url);
        const msg = {
            to: email,
            from: ApplicationSettings.getValue("EODB_EMAIL"),
            // templateId: "d-ebe5030ff7dd4695a7fa263532510305",
            templateId: ApplicationSettings.getValue("REGISTRATION_EMAIL_TEMPLATE"),
            dynamic_template_data: { name, confirmation_url }
        };
        return new Promise((resolve, reject) => {
            console.log("sgmail send##: " + JSON.stringify(msg))
            sgMail.send(msg)
                .then((result) => {
                    console.log("sgmail send result data: " + JSON.stringify(result))
                    resolve({ result, confirmation_url, expiry_date })
                }).catch((err) => reject(err));
        })
    }

    static updateProfile(username, email, cb) {
        const msg = {
            to: 'ariel.a.balita@gmail.com',
            from: 'itax-pro@itax.com',
            templateId: 'e0d8666d-d31a-4bba-b366-50361c400565',
            substitutions: {
                name: 'Some One',
                city: 'Denver',
            },
        };
        sgMail.send(msg).then(() => {
            cb("success")
        }).catch(error => {
            //Log friendly error
            console.error(error.toString());
            cb(error);
        });
    }

    /**
     * 
     * @param {String} email 
     * @param {String} name 
     * @param {String} tin 
     * @param {String} sender 
     */
    static registerInvitation(email, name, tin, sender) {
        const confirmation_token = new Buffer(JSON.stringify({
            email,
            name,
            tin,
            date: new Date()
        })).toString('base64')
        const confirmation_url = `${process.env.VUE_APP_HOME_URL}?reg_code=${confirmation_token}`
        console.log('confirmation_url :', confirmation_url);
        const msg = {
            to: email,
            from: ApplicationSettings.getValue("ITAX_EMAIL"),
            templateId: ApplicationSettings.getValue("REGISTRATION_INVITATION_TEMPLATE"),
            substitutions: { name: `${name.first} ${name.last}`, sender, confirmation_url }
        };
        return new Promise((resolve, reject) => {
            sgMail.send(msg)
                .then((result) => {
                    resolve({ result, confirmation_url })
                }).catch((err) => reject(err));
        })
    }

    /**
     * @returns {Promise}
     * @param {Array<Object>} details 
     */
    static sendMultipleInvitation(details) {
        var messages = [];
        details.forEach(data => {
            const { email, name, tin, sender } = data;
            const confirmation_token = new Buffer(JSON.stringify({
                email,
                name,
                tin,
                date: new Date()
            })).toString('base64')
            const confirmation_url = `${process.env.VUE_APP_HOME_URL}?reg_code=${confirmation_token}`
            console.log('confirmation_url :', confirmation_url);
            const msg = {
                to: email,
                from: ApplicationSettings.getValue("ITAX_EMAIL"),
                templateId: ApplicationSettings.getValue("REGISTRATION_INVITATION_TEMPLATE"),
                substitutions: { name: `${name.first} ${name.last}`, sender, confirmation_url }
            };
            messages.push(msg);
        })
        return sgMail.sendMultiple(messages);
    }


    /**
     * @returns {Promise}
     * @param {String} to 
     * @param {String} template_id 
     * @param {Object} dynamic_template_data 
     */
    static sendEmail(to, template_id, dynamic_template_data) {
        const msg = {
            to,
            from: ApplicationSettings.getValue("EODB_EMAIL"),
            templateId: ApplicationSettings.getValue(template_id),
            dynamic_template_data
        };
        console.log("Email Config: ", msg)
        return sgMail.send(msg)
    }
}

module.exports = SendEmail