var login = function( user, password ) {
    
    console.log(user,password);
    if ( user==="dbenavi.db@gmail.com" && password==="1234" ){
        return true;
    }
    else {
        return false;
    }
}

module.exports = login;