import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from './http.service';
import  Swal from 'sweetalert2'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'frontendTest';
  userRecordForm!:FormGroup
  formData:any;
  cityList:any=[]
  stateList:any=[]
  isValidPincode=false;
  isSubmitted=false;
  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  constructor(private fb:FormBuilder, private httpService:HttpService){}

  ngOnInit(){
      this.initForm();
  }

  initForm(){
    this.userRecordForm = this.fb.group({
      name:['',Validators.required],
      pinCode:['',[Validators.required,Validators.pattern(/^\d{6}$/)]],
      city:['',Validators.required],
      state:['',Validators.required]
    })

  }

  onPinCode(){
    let pinCodeSize;
    if(this.userRecordForm.get('pinCode')?.value){
     pinCodeSize = (this.userRecordForm.get('pinCode')?.value).toString();
    }

    if(pinCodeSize?.length===6){
    this.httpService.getData('pincode',pinCodeSize).subscribe((res:any)=>{
     if(res[0]?.Status=='Error'){
      this.isValidPincode=true;
      this.userRecordForm.get('pinCode')?.markAsTouched();
      this.userRecordForm.get('pinCode')?.updateValueAndValidity();
     }
     else {
      Swal.fire({
        icon:'success',
        title:'Details Successfully Fetched'
      })
      this.cityList = res[0]?.PostOffice;
      this.isValidPincode=false;
      const stateSet = new Set(this.cityList.map((city:any) => city?.State));
      this.stateList = Array.from(stateSet);
     }
    })
  }
}

  onSubmit(){
    this.isSubmitted=true;
    if(this.userRecordForm.valid){
      console.log(this.userRecordForm.value);
      this.formData= this.userRecordForm.value
      this.userRecordForm.reset();
      this.isSubmitted=false;
    }

  }


}
