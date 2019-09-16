import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../../core/services/user.service";
import { IUser } from "../../core/models/user.model";
import { Router } from "@angular/router";
import { IUserInfo } from "../../core/models/userInfo.model";
import { AuthService } from "../../core/services/auth.service";
import { ILocation } from "../../core/models/location.model";

@Component({
  selector: "app-edit-user",
  templateUrl: "./edit-user.component.html",
  styleUrls: ["./edit-user.component.sass"]
})
export class EditUserComponent implements OnInit {
  url: any;
  fileToUpload: File = null;
  user: IUser;
  coordinates: ILocation;
  userInfo: IUserInfo;
  currentDate: number;
  formGroup = new FormGroup({
    formImage: new FormControl(null)
  });
  formUser = new FormGroup({
    firstName: new FormControl(""),
    lastName: new FormControl(""),
    gender: new FormControl("")
  });

  constructor(
    private userService: UserService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.currentDate = new Date().getTime();
    const date = this.currentDate.toString().slice(0, 10);
    this.currentDate = +date;
    this.formUser.valueChanges.subscribe(value => {
      this.user = Object.assign({}, value);
    });
    this.getCurrentGeoPosition();
  }

  handleFileInput(event: HTMLInputEvent) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent) => {
        this.url = (event.target as FileReader).result;
      };

      reader.readAsDataURL(event.target.files[0]);
    }
    this.fileToUpload = event.target.files[0];
    this.uploadFileToActivity();
  }

  uploadFileToActivity() {
    this.userService.postFile(this.fileToUpload).subscribe(
      data => {
        // do something, if upload success
      },
      error => {
        console.error(error);
      }
    );
  }

  saveUser() {
    this.userService.updateUserInfo(this.user).subscribe(response => {
      this.router.navigate(["/dashboard"]);
    });
  }

  getCurrentGeoPosition() {
    this.userService.getPosition().subscribe((pos: Position) => {
      this.coordinates = {
        lat: +pos.coords.latitude,
        lon: +pos.coords.longitude
      };
      this.getCurrentUser();
    });
  }

  getCurrentUser() {
    this.userService
      .getCurrentUserInfo(this.authService.getCurrentUserToken("accesToken"))
      .subscribe(value => {
        this.userInfo = value.result;
        this.formUser.patchValue(this.userInfo);
        this.url = this.userInfo.image;
        if (!this.userInfo.lat && !this.userInfo.lat) {
          this.userService
            .setUserCurrentGeoLocation(this.coordinates)
            .subscribe();
        }
        const timeToTrack = 3600000;
        if (this.currentDate - this.userInfo.updatedAt >= timeToTrack) {
          this.userService
            .setUserCurrentGeoLocation(this.coordinates)
            .subscribe();
        }
        const distanceToTrack = 0.01;
        if (
          Number(this.userInfo.lat) - this.coordinates.lat >= distanceToTrack ||
          Number(this.userInfo.lat) - this.coordinates.lat <= -distanceToTrack ||
          Number(this.userInfo.lon) - this.coordinates.lon >= distanceToTrack ||
          Number(this.userInfo.lon) - this.coordinates.lon <= -distanceToTrack
        ) {
          this.userService
            .setUserCurrentGeoLocation(this.coordinates)
            .subscribe(response => {
            });
        }
      });
  }
}
