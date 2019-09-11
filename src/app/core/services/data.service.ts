import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public subject = new Subject();
  public userArray = this.subject as Observable<any>;
  constructor() { }
}
