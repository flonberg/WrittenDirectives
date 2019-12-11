import { DoseFxComponent } from './../dose-fx/dose-fx.component';
import { DemogComponent } from './../demog/demog.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

import { exit } from 'process';


@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  menuStruct:any;
  dataStructREST: any;
  planIdx: number;
  docidx: number;
  url: string;

  constructor( private http: HttpClient, private activatedRoute: ActivatedRoute) { }
  ngOnInit() {
    this.activatedRoute
    .queryParams
    .subscribe(queryParams => {
        console.log('Query Params:', queryParams);
        this.planIdx = queryParams.planIdx;
        if (queryParams.templateIdx  ){                                 // if a template has been selected from the menu
                                  // get the WWD form params from that template
          this.url = 'http://blackboard-dev.partners.org/dev/WrittenDirectives/getMenuRest.php?planIdx='+queryParams.planIdx+'&templateIdx='+queryParams.templateIdx+'&templateName='+queryParams.templateName;
        }
        else
           {                                             // don't use the docidx param but get the docidx from WWDdocuments for this planIdx
          this.url = 'http://blackboard-dev.partners.org/dev/WrittenDirectives/getMenuRest.php?planIdx='+queryParams.planIdx;
        }
   
        this.getData(this.planIdx, this.docidx).subscribe(              //  get the Menu associated with this MD/Service
          (val2) => {
                this.setMenuStruct(val2);                               // set data for Menu
                this.setDataStruct(val2);                               // set data for all other parts. 
                if (queryParams.templateIdx  )
                   this.dataStructREST.templatename = queryParams.templateName;
                });
       
    });

this.activatedRoute
    .params
    .subscribe(params => {
        console.log('Regular Params:', params);
    });
    console.log("planIdx is " + this.planIdx);
 
  }
  isString(val) { return typeof val === 'string'; }                 // used by ...html 
  setDataStruct(ds){ 
    this.dataStructREST = ds.WWDdocuments;
    console.log('dataStructREST  61 ');
  }
  setMenuStruct(ds){
    this.menuStruct = ds.Menu;
    console.log('menuStruct  52' + this.menuStruct);
  }
  setTemplateName(ds){ 
    this.dataStructREST.templatename = ds;
  }
  getData(planIdx, docidx){
   // const url = 'https://whiteboard.partners.org/esb/FLwbe/REST/getMenuRest.php?planIdx='+planIdx+'&templateIdx='+docidx;
  //  const url = 'http://blackboard-dev.partners.org/dev/AngWWD/getMenuRest.php?planIdx='+planIdx+'&templateIdx='+docidx;
  
   // const url = 'http://blackboard-dev.partners.org/dev/WrittenDirectives/getMenuRest.php?planIdx='+planIdx;
   console.log(this.url);
    return this.http.get(this.url);
  }
  copyFromTemplate(templateIdx, planIdx){
    console.log('copyFromTemplate' + templateIdx + '---' + planIdx);
  }

}
 



