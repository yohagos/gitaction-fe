import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { environment } from 'src/environments/environment';

export interface Employee {
  lastname: string;
  firstname: string;
  city: string;
  age: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  infoGET: any;

  lastname = new FormControl('');
  firstname = new FormControl('');
  city = new FormControl('');
  age = new FormControl('');

  constructor(public http: HttpClient) {}

  ngOnInit() {}

  createObject() {
    const emp: Employee = {
      lastname: this.lastname.value,
      firstname: this.firstname.value,
      city: this.city.value,
      age: +this.age.value
    }
    return emp;
  }

  getBackendInfo() {
    this.http.get<string>(environment.baseUrl + '/get').subscribe(response => {
      this.infoGET =  response;
    });
  }

  postBackend() {
    let newEmp = this.createObject()
    this.http.post(environment.baseUrl + '/post', newEmp).subscribe(response => {
      console.log(response);
    }, error => {
      console.error(error)
    });
  }

}
