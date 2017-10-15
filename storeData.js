var crypto = require('crypto'),
algorithm = 'aes-256-ctr',
password = 'd6F3Efeq';

var facialRecog = require('./facialRecog.js');

var firebase = require('firebase');
var config = {
    apiKey: "AIzaSyARkhIyf4GhyNavsyinhczRirdioQezfRk",
    authDomain: "chicagohack-82fd3.firebaseapp.com",
    databaseURL: "https://chicagohack-82fd3.firebaseio.com",
    projectId: "chicagohack-82fd3",
    storageBucket: "",
    messagingSenderId: "959915558361"
};
var app = firebase.initializeApp(config);

var addUserToMapping = function(personId){
    var database = app.database();
    var databaseRef = database.ref(personId);

    console.log("Adding User to DB: " + personId);
    databaseRef.set({
        img: "http://image.ibb.co/eHG9iw/Screen_Shot_2017_10_14_at_11_58_57_PM.png"
    })
    .catch((err) => {
        console.log("Error storing token for user " + userPersonId);  
    });
};

var encrypt = function(text){
    var cipher = crypto.createCipher(algorithm,password)
    var crypted = cipher.update(text,'utf8','hex')
    crypted += cipher.final('hex');
    return crypted;
}

var getToken = function(accountId) {
    return encrypt(accountId);
}

var storeImage = function(image) {
    facialRecog.setupCloudinary("./Data/melvin.png")
    // .then((response) => {
    //     console.log(response);
    // })
    // .catch((err) => {
    //     console.log("ERROR: " + err);  
    // });
};

var storePersonId = function(userPersonId, userAccountId) {
    var token = getToken(userAccountId);
    var storeUniqueId = 1234
    var database = app.database();
    var databaseRef = database.ref(storeUniqueId + "/" + userPersonId);

    databaseRef.set({
        storeId: storeUniqueId,
        personId: userPersonId,
        token: token
    })
    .then((response) => {
        return {statusCode: 200};
    })
    .catch((err) => {
        console.log("Error storing token for user " + userPersonId);  
    });
};

module.exports = {addUserToMapping, storeImage, storePersonId};