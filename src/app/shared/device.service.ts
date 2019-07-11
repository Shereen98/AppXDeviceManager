import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormGroup,FormControl,Validators} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(private http:HttpClient) { }

  form: FormGroup = new FormGroup({
    $key:new FormControl(null),
    barcode: new FormControl('',Validators.required),
    name:new FormControl('',Validators.required),
    addDate: new FormControl('',Validators.required),
    condition:new FormControl(0,Validators.required),
    status:new FormControl('1')
  });

  initializeFormGroup(){
    this.form.setValue({
      $key:null,
      barcode:'',
      name:'',
      addDate: '',
      condition:0,
      status:'1'
    })
  }

  /*public getData = (route: string) => {
    return this.http.get(this.createCompleteRoute(route, environment.urlAddress));
  }
 
  public create = (route: string, body) => {
    return this.http.post(this.createCompleteRoute(route, environment.urlAddress), body, this.generateHeaders());
  }
 
  public update = (route: string, body) => {
    return this.http.put(this.createCompleteRoute(route, environment.urlAddress), body, this.generateHeaders());
  }
 
  public delete = (route: string) => {
    return this.http.delete(this.createCompleteRoute(route, environment.urlAddress));
  }
 
  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  }
 
  private generateHeaders = () => {
    return {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
  }*/
}
