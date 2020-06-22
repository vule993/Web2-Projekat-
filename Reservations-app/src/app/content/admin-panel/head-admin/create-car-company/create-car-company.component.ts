import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-create-car-company',
  templateUrl: './create-car-company.component.html',
  styleUrls: ['./create-car-company.component.css', '../../../register/register.component.css']
})
export class CreateCarCompanyComponent implements OnInit {
  createCompanyForm: FormGroup;
  selectedValue: any;
  admins: any;

  constructor(private userService: UsersService) { }

  ngOnInit(): void {
    this.userService
      .getAllUsers()
      .subscribe((users) => (this.admins = users.find(u => u.status == '2')));
      
      
      this.initForm();
    }
    

    onSubmit(){
      
    }

    private initForm(){
      let companyName = "";
      let description = "";
      let street = "";
      let city = "";
      let admins = "";

      this.createCompanyForm = new FormGroup({
        companyName: new FormControl(companyName, Validators.required),
        description: new FormControl(description, Validators.required),
        street: new FormControl(street, Validators.required),
        city: new FormControl(city, Validators.required),
        admins: new FormControl(admins, Validators.required)
      });
    }

}
