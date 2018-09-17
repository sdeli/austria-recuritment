const cookieAuthObj = require('./cookie-auth-object/cookie-auth-object.js')

module.exports = (function(){

    let instanceOfCookieAuthObj;

    // initalizing the motor behind the user interface
    function init(){
        // object creation here
        return cookieAuthObj();
    }

    return {
        getCookieAuthObj : function(){
            // lazy loading the object
            if(!instanceOfCookieAuthObj){
                instanceOfCookieAuthObj = init();
                return instanceOfCookieAuthObj
            } else return instanceOfCookieAuthObj;
        }
    }
    
}());  