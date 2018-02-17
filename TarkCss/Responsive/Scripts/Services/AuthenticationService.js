﻿app.service('AuthenticationService', function (ServerService, $http, $rootScope, $location) {
    this.SignUp = function (data, successCallback, errorCallback) {
        ServerService.post("SignUp", data, successCallback, errorCallback);
    }

    this.SignIn = function (account, successCallback, errorCallback) {
        var address = ServerService.getServerAddress();
        var data = "grant_type=password&username=" + account.email + "&password=" + account.password + "&client_id=1&captcha=" + account.grecaptchaResponse;
        var auxThis = this;

        return $http.post(address + 'SignIn', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(
           function (response) {
            var expires_in = new Date() + response.expires_in * 1000;

            localStorage.setItem('authorizationData', JSON.stringify({ token: response.access_token, email: account.email, expires_in: expires_in }));
            auxThis.TryLoadStorageSession();
            return { success : true};
        }, function (response, status) {
            auxThis.SignOut();
            console.log('err');

            return {
                success: false,
                error: response.data.error_description
            };
        });
    }

    this.TryLoadStorageSession = function () {
        var data = localStorage.getItem('authorizationData');

        if (data == null || typeof data == "undefined")
            return;

        data = JSON.parse(data);
        
        if (data.expires_in < new Date()) {
            this.SignOut();
            return;
        }

        $rootScope.account = new Object();
        $rootScope.account.authenticated = true;
        $rootScope.account.email = data.email;
    }
    
    this.GetToken = function () {
        var data = localStorage.getItem('authorizationData');

        if (data == null || typeof data == "undefined")
            return null;

        if (data.expires_in < new Date())
        {
            this.SignOut();
            data = null;
            $location.path("/Home");
            return null;
        }

        return data.token;
    }

    this.SignOut = function () {
        $rootScope.account = null;
        localStorage.removeItem('authorizationData');
    }
});