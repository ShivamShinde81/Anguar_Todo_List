import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { RestaurentData } from './restaurent.model';

@Component({
  selector: 'app-restaurent-dash',
  templateUrl: './restaurent-dash.component.html',
  styleUrls: ['./restaurent-dash.component.css']
})
export class RestaurentDashComponent implements OnInit {

  formValue!: FormGroup;
  restaurentModelObj: RestaurentData = new RestaurentData;
  allRestarantData: any;
  showAdd!:boolean;
  showbtn!:boolean;

  constructor(private formBuilder: FormBuilder, private api: ApiService) {

  }
  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name: [''],
      email: [''],
      mobile: [''],
      address: [''],
      services: ['']
    })
    this.getAllData();
  }

  clickAddResto(){
    this.formValue.reset();
    this.showAdd=true;
    this.showbtn=false;
  }

  //Subscribe
  addResto() {
    this.restaurentModelObj.name = this.formValue.value.name;
    this.restaurentModelObj.email = this.formValue.value.email;
    this.restaurentModelObj.mobile = this.formValue.value.mobile;
    this.restaurentModelObj.address = this.formValue.value.address;
    this.restaurentModelObj.services = this.formValue.value.services;

    this.api.postRestuarent(this.restaurentModelObj).subscribe(res => {
      console.log(res);
      alert("Restaurent Records Added Successfully!");
      let ref = document.getElementById('clear');
      ref?.click();


      this.formValue.reset();
      this.getAllData();
    },
      err => {
        alert("Check Again, Error occurs");
      })
  }

  getAllData() {
    this.api.getRestuarent().subscribe(res => {
      this.allRestarantData = res;
    })
  }

  deleteResto(data: any) {
    this.api.deleteRestuarent(data.id).subscribe(res => {
      alert("Restaurent Records Deleted!!");
      this.getAllData();
    })
  }

  onEditResto(data: any) {
    console.log("Edit button working");
    this.showAdd=false;
    this.showbtn=true;
    this.restaurentModelObj.id = data.id;

    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['mobile'].setValue(data.mobile);
    this.formValue.controls['address'].setValue(data.address);
    this.formValue.controls['services'].setValue(data.services);
    console.log("OnEdit again working");

  }

  updateResto() {
    this.restaurentModelObj.name = this.formValue.value.name;
    this.restaurentModelObj.email = this.formValue.value.email;
    this.restaurentModelObj.mobile = this.formValue.value.mobile;
    this.restaurentModelObj.address = this.formValue.value.address;
    this.restaurentModelObj.services = this.formValue.value.services;

    this.api.updateRestuarent(this.restaurentModelObj,this.restaurentModelObj.id).subscribe(res=>{
      alert("Restaurent Records Updated!!");
      let ref = document.getElementById('clear');
      ref?.click();
      this.formValue.reset();
      this.getAllData();
    })
  }
}
