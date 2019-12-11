import { IonService } from './../services/ion.service';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'app-demog',
  templateUrl: './demog.component.html',
  styleUrls: ['./demog.component.css']
})
export class DemogComponent implements OnInit {
  @Input() demogParams: any;
  planIdx: Number;
  data:{};
  IONdemogData: {};
  constructor(private route: ActivatedRoute, private http: HttpClient, private menuService: MenuService) { 
   
  }
  form = new FormGroup({                                                // create FormGroup
    'UnitNumber': new FormControl(''),                                        // create all the controls in the FormGroup
    'LastName': new FormControl(''),
    'FirstName': new FormControl(''),
    'StartDate': new FormControl(''),
    'linac': new FormControl(''),
    'Modality': new FormControl(''),
    'Physician': new FormControl(''),
    'Dosimetrist': new FormControl(''),

    'generalConsideration': new FormControl(''),
  });
  ngOnInit() {
  //  this.route.queryParamMap.subscribe(params => { 
   //     this.planIdx = +params.get('planIdx');
       // if (this.demogParams){
         // this.form.get('UnitNumber').setValue(this.demogParams['UnitNumber']);  
        //}
      
 
    
   // })
  }
  setFormData(FormName, st){
    if (this.form.get(FormName))
     this.form.get(FormName).setValue(st);
  }


}
