import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class MenuService {
  mdKey: number;
  constructor(private http: HttpClient) { }
  //* this returns a multiLevel dataStructure in which the key is the templateids and the value is the templateName /// 
  getData(mdKey, planIdx){
    const url = 'https://whiteboard.partners.org/esb/FLwbe/REST/getMenuRest.php?MDkey='+mdKey+'&planIdx=';
    return this.http.get(url);
  }

  setMDkey(mdKey){
    this.mdKey = mdKey;
  }
}
