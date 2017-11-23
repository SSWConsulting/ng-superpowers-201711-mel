import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { environment } from '../environments/environment';




@Component({
  selector: 'fbc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'Melbourne :) ';
  prodMode: boolean;

  ngOnInit(): void {
    this.prodMode = environment.production;
  }

}
