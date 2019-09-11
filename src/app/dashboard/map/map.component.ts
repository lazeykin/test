import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {DataService} from '../../core/services/data.service';
import {IUserInfo} from '../../core/models/userInfo.model';
import {} from "googlemaps";
declare var MarkerClusterer:any;

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.sass']
})
export class MapComponent implements OnInit {
    users: IUserInfo[] = [];
    locations: any = [];
    latitude = 50.45466;
    longitude = 30.5238;
    mapType = 'roadmap';

    constructor(private dataService: DataService,
                private router: Router) {
    }

    ngOnInit() {
        this.dataService.userArray.subscribe(data => {
            console.log(data);
            this.users = data;
            this.locations = this.users.map(v => ({ lat: +v.lat, lng: +v.lon, alpha: 0.5 }));
        });

    }
    selectMarker(i:number) {
        this.router.navigate([`../../user/${this.users[i].id}`]);
    }

}
