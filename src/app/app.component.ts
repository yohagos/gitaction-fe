import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  formGroup: FormGroup = new FormGroup({});
  infoGET: any;

  /* lastname = new FormControl('');
  firstname = new FormControl('');
  city = new FormControl('');
  age = new FormControl(''); */

  constructor(public http: HttpClient) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.formGroup.addControl('lastname', new FormControl(''));
    this.formGroup.addControl('firstname', new FormControl(''));
    this.formGroup.addControl('city', new FormControl(''));
    this.formGroup.addControl('age', new FormControl(''));
  }

  createObject() {
    const emp: Employee = {
      lastname: this.formGroup.get('lastname')?.value,
      firstname: this.formGroup.get('firstname')?.value,
      city: this.formGroup.get('city')?.value,
      age: +this.formGroup.get('age')?.value
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
    console.log(this.formGroup.value);
    this.http.post<Employee>(environment.baseUrl + '/post', newEmp).subscribe(response => {
      console.log(response);
    }, error => {
      console.error(error)
    });
  }

}
