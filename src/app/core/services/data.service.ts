import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  subject = new Subject();
  userArray = this.subject as Observable<any>;
  constructor() { }
}
