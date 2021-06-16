$(function(){
    console.log('jquery running');
    var userObject={
        saveUserInLocalStorage:function(userJson){
            window.localStorage.setItem('currentUser', JSON.stringify(userJson));
        },
        getCurrentUser : function(){
            return window.localStorage.getItem('currentUser');
        },
        getCurrentUserName : function(){
            var curUserString = this.getCurrentUser();
            if(curUserString){
                var json = JSON.parse(curUserString);
                if(json && json.username)
                    return json.username;
                return "";
            }
            return "";
        },
        isUserLoggedIn : function(){
            if(this.getCurrentUser()==null)
                return false;
            return true;
        }
    }

var onSignIn=function(Loggedin){
    if(Loggedin){
        $('#notsignedin').hide()
        $('#signedin').show()
        $('#Welcome').html("Welcome "+userObject.getCurrentUserName()) 
    }
    else{
        $('#notsignedin').show()
        $('#signedin').hide()
    }
}
if(userObject.isUserLoggedIn()){
    onSignIn(true);
}

onSignIn(false)
$("#btnLogin").on('click', function(){
    var userObj = {username: '', password:''};
    userObj.username = $("#txtuname").val();
    userObj.password = $("#txtpassword").val();
    console.log('login'+userObj);
    $.post( "/api/login", userObj)
    .done(function( data ) {
        console.log( "Data Loaded: " + JSON.stringify(data) );
        if(data.success){
            toastr.success('Login Successful');
            userObject.saveUserInLocalStorage(data.user);
            onSignIn(true)
            
        }
        else{
            toastr.success(data.message);
            alert( "Data Loaded: " + JSON.stringify(userObj) );
            onSignIn(false)
        } 
    })
    .fail(function() {
        //alert( "error" );
    })
    .always(function() {
        //alert( "finished" );
    });
})
});