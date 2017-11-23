import { Component, OnInit } from '@angular/core';
import { Company } from '../company';
import { CompanyService } from '../company.service';
import { Observable } from 'rxjs/Observable';
import { takeWhile } from "rxjs/operators/takeWhile";

@Component({
  selector: 'fbc-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {

  companies$ : Observable<Company[]>;

  componentExists = true;

  constructor(private companyService: CompanyService) {
  }

  ngOnInit() {
    this.getCompanies();
  }

  getCompanies(){
    this.companies$ = this.companyService.getCompanies()
    //.subscribe(companies => this.companies = companies);
  }

  deleteCompany(companyId: number){
    this.companyService.deleteCompany(companyId)
    .subscribe(() => this.getCompanies())
  }
}
