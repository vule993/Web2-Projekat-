import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/User.model';
import { UsersService } from 'src/app/services/users.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-avio-company',
  templateUrl: './create-avio-company.component.html',
  styleUrls: ['./create-avio-company.component.css', '../../../register/register.component.css']
})
export class CreateAvioCompanyComponent implements OnInit {
  createCompanyForm: FormGroup;
  selectedValue: any;
  admins: any;

  constructor(private userService: UsersService) { }

  ngOnInit(): void {
    this.userService
      .getAllUsers()
      .subscribe((users) => (this.admins = users.find(u => u.status == '3')));
      
      
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
