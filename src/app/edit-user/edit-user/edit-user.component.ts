import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../core/services/user.service';
import {IUser} from '../../core/models/user.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.sass']
})
export class EditUserComponent implements OnInit {
    public url: any;
    fileToUpload: File = null;
    user: IUser;
    constructor(
        private userService: UserService,
        private router: Router
    ) { }
    form_group = new FormGroup({
        form_image: new FormControl(null, [Validators.required])
});
    form_user = new FormGroup({
        firstName: new FormControl(''),
        lastName: new FormControl(''),
        gender: new FormControl(''),
    })

  ngOnInit() {
      this.form_user.valueChanges.subscribe(value => {
          this.user = Object.assign({}, value);
      });
  }
    handleFileInput(event: Event) {
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
}
