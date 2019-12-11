import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { dependenciesFromGlobalMetadata } from '@angular/compiler/src/render3/r3_factory';

@Injectable({
  providedIn: 'root'
})
export class IonService {
  planIdx: number;
  IONdata: any;
  MDmenuKey: any;
  constructor() { } 

  setDemogData(val){
    this.IONdata = val;
    console.log("setDemogData AAAAAAA" + this.IONdata);
  }
  getDemogData(){
    return this.IONdata;
  }
}

