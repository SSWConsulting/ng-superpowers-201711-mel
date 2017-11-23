import { Injectable } from '@angular/core';
import { Company } from './company';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { catchError } from "rxjs/Operators/catchError";
import { tap } from "rxjs/Operators/tap";
import { map } from "rxjs/Operators/map";
import { EmptyObservable } from "rxjs/observable/EmptyObservable";

import { environment } from "../../environments/environment";
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class CompanyService {
  private API_BASE: string;

  constructor(private httpClient: HttpClient) {
    this.API_BASE = environment.API_BASE;
  }

  getCompanies(): Observable<Company[]>{
    return this.httpClient.get<Company[]>(`${this.API_BASE}/company`)
    .pipe(
      catchError(this.errorHandler),
      tap(result => console.log(result)),
      map(result => result.sort(this.compareCompanies))
    );
  }

  deleteCompany(companyId : number){
    return this.httpClient.delete<Company>(`${this.API_BASE}/company/${companyId}`)
  }

  compareCompanies(c1 : Company, c2: Company){
    return c1.phone - c2.phone;
  }

  addCompany(company: Company): Observable<Company>{
    return this.httpClient.post<Company>(`${this.API_BASE}/company`, company, { headers: new HttpHeaders()
      .set('content-type', 'application/json') })
  }

  updateCompany(company: Company): Observable<Company> {
    return this.httpClient.put<Company>(
      `${this.API_BASE}/company/${company.id}`, company,
      { headers: new HttpHeaders().set('content-type', 'application/json') }
    );
  }

  getCompany(companyId: number): Observable<Company> {
      return this.httpClient.get<Company>(`${this.API_BASE}/company/${companyId}`);
  }



  errorHandler(error: Error): Observable<Company[]> {
    // implement proper error handling
    console.error("My Custom Error handling goes there", error);
    return new EmptyObservable();
  }

}
