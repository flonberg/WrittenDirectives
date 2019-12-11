import { Component, OnInit } from '@angular/core';
import { DoseFxService } from './../dose-fx.service';
@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent implements OnInit {
  DoseFxSvce: DoseFxService;
  constructor() { }

  ngOnInit() {
  }

}
