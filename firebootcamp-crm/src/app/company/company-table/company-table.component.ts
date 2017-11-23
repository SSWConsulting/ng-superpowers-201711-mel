import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {  } from '@angular/core';
import { Company } from '../company';

@Component({
  selector: 'fbc-company-table',
  templateUrl: './company-table.component.html',
  styleUrls: ['./company-table.component.scss']
})
export class CompanyTableComponent implements OnInit {

  @Input() companies : Company[]
  @Output() onDeleteCompany = new EventEmitter<number>()
  constructor() { }

  ngOnInit() {
  }

}
