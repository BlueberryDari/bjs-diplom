"use strict";
//формa регистрации
const userForm = new UserForm();

    //попытка авторизации
userForm.loginFormCallback = function({login, password}) {
ApiConnector.login({login, password}, function (response) {
    console.log(response);
    if (response.success) {
        location.reload();
    } else {
        userForm.setLoginErrorMessage(response.error);
    }
});
};
/*попытка регистрации, та же логика, запись стрелочной ф-ии, 
вместо расписанного {login, password} - data.*/
userForm.registerFormCallback = (data) => {
ApiConnector.register(data, response => {
if (response.success) {
    location.reload();
} else {
    userForm.setRegisterErrorMessage(response.error);
}
});
}


//работа с сервером
/*class ApiConnector {
login({login, password}, callback) {

}

register({login, password}, callback) {

}
};*/