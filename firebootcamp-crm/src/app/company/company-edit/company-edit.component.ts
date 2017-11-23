import { Component, OnInit } from '@angular/core';
import { Company } from '../company';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CompanyService } from '../company.service';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';


@Component({
  selector: 'fbc-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.scss']
})
export class CompanyEditComponent implements OnInit {
  company = {} as Company;
  companyId: any;
  isNewCompany : boolean;
  companyForm: FormGroup;

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
    private companyService: CompanyService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.companyId = this.activatedRoute.snapshot.params['id'];
    this.isNewCompany = this.companyId === 'new';

    this.buildForm();

    if (!this.isNewCompany) {
      this.getCompany();
    }

    this.companyForm.get('checkphone').valueChanges
    .subscribe(value => {
      if(value){
        this.companyForm.get('phone').setValidators(Validators.required);
      }else{
        this.companyForm.get('phone').clearValidators();
      }

      this.companyForm.get('phone').updateValueAndValidity();
    })


  }

  buildForm(){
    this.companyForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: [''],
      phone: [''],
      checkphone: ['']
    })
  }

  // saveCompany(){
  //   this.companyService.addCompany(this.companyForm.value)
  //   .subscribe(() => this.router.navigate(['company/list']));
  // }


saveCompany(): void {
  if (this.isNewCompany) {
    this.companyService.addCompany(this.companyForm.value)
      .subscribe(() => this.router.navigateByUrl('/company/list'));
  } else {
    const newCompany = {...this.companyForm.value, id: this.companyId };
    this.companyService.updateCompany(newCompany)
      .subscribe(() => this.router.navigateByUrl('/company/list'));
  }
}


  getCompany():void {
    this.companyService.getCompany(this.companyId)
      .subscribe(company => {
        this.companyForm.patchValue(company);
      });
  }




}
