import { Component, OnInit } from '@angular/core';
declare var FB: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {

      (window as any).fbAsyncInit = function() {
          FB.init({
              appId      : '1637129439866047',
              cookie     : true,
              xfbml      : true,
              oauth      : true,
              version    : 'v4.0'
          });

          FB.AppEvents.logPageView();
      };

      (function(d, s, id){
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) {return;}
          js = d.createElement(s); js.id = id;
          js.src = "https://connect.facebook.net/en_US/sdk.js";
          fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
  }

    submitLogin (){
        console.log("submit login to facebook");
        // FB.login();
        // FB.ui({
        //     method: 'oauth',
        //     name: 'Facebook Dialogs',
        //     redirect_uri: 'https://test-api.live.gbksoft.net',
        //     message: ''
        // });
        FB.login((response)=>
        {
            console.log('submitLogin',response);
            if (response.authResponse)
            {
                //login success
                //login success code here
                //redirect to home page
            }
            else
            {
                console.log('User login failed');
            }
        });

    }

}
