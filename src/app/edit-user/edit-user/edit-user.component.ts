import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../core/services/user.service';
import {IUser} from '../../core/models/user.model';
import {Router} from '@angular/router';
import {IUserInfo} from '../../core/models/userInfo.model';
import {AuthService} from '../../core/services/auth.service';
import {ILocation} from '../../core/models/location.model';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.sass']
})
export class EditUserComponent implements OnInit {
    public url: any;
    fileToUpload: File = null;
    user: IUser;
    coordinates: ILocation;
    userInfo: IUserInfo;
    currentDate: number;
    constructor(
        private userService: UserService,
        private router: Router,
        private authService: AuthService
    ) { }
    form_group = new FormGroup({
        form_image: new FormControl(null,)
});
    form_user = new FormGroup({
        firstName: new FormControl(''),
        lastName: new FormControl(''),
        gender: new FormControl(''),
    })

  ngOnInit() {
      this.currentDate = new Date().getTime();
      let date = this.currentDate.toString().slice(0, 10);
      this.currentDate = +date;
      this.form_user.valueChanges.subscribe(value => {
          this.user = Object.assign({}, value);
      });
      this.getCurrentGeoPosition();
  }
    handleFileInput(event: HTMLInputEvent) {
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event: ProgressEvent) => {
                this.url = (<FileReader>event.target).result;
            };

            reader.readAsDataURL(event.target.files[0]);
        }
        this.fileToUpload = event.target.files[0];
        this.uploadFileToActivity();

    }
    uploadFileToActivity() {
        this.userService.postFile(this.fileToUpload).subscribe(data => {
            // do something, if upload success
            console.log(data);
        }, error => {
            console.log(error);
        });
    }
    saveUser() {
        this.userService.updateUserInfo(this.user).subscribe(response => {
          console.log(response);
            this.router.navigate(['/dashboard']);
        })
    }
    getCurrentGeoPosition() {
        this.userService.getPosition().subscribe(
            (pos: Position) => {
                this.coordinates = {
                    lat:  +(pos.coords.latitude),
                    lon: +(pos.coords.longitude)
                };
                console.log(this.coordinates);
                this.getCurrentUser();
            });
    }
    getCurrentUser() {
        this.userService.getCurrentUserInfo(this.authService.getCurrentAccesToken()).subscribe((value) => {
            console.log(value);
            this.userInfo = value.result;
            if(!this.userInfo.lat && !this.userInfo.lat) {
                this.userService.setUserCurrentGeoLocation(this.coordinates).subscribe(response => {
                    console.log(response);
                });
            }
            if (this.currentDate - this.userInfo.updatedAt >= 3600000) {
                this.userService.setUserCurrentGeoLocation(this.coordinates).subscribe(response => {
                    console.log(response);
                });
            }
        });
    }

}
