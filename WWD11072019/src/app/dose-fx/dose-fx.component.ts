import { NavbarComponent } from './../navbar/navbar.component';
import { DoseFxService } from './../dose-fx.service';
import { FormControl, FormGroup, FormControlName, AbstractControl, FormBuilder} from '@angular/forms';
import { Component, OnInit, Input, ViewEncapsulation, enableProdMode, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import {MatCardModule} from '@angular/material/card';
import { stringify } from '@angular/compiler/src/util';


export interface beamTypes {
  id: number;
  name: string;
}
export interface beam {
  id: number;
  value: string;
}
export interface editParam{                                                   // colName and editValue are an array 
  colName: string;
  editVal: string;
}
export interface dBParams {                                                   // dS used to edit dataBase
  tableName: string;
  docidx: number;
  editParams: editParam[];
}


export interface beamGroup {
  disabled?: boolean;
  name: string;
  beam: beam[];
}
export interface compMode {
  value: string;
}

interface contourInt {
  label: string;
  formControlName: string;
}
interface contourControl {
  label: string,
  name: string,
}
interface editDBParams {
  colName: string;
  colEditVal: string;
  whereColName: string;
  whereColVal: string;
  tableName: string;
}


@Component({
  selector: 'app-dose-fx',
  templateUrl: './dose-fx.component.html',
  styleUrls: ['./dose-fx.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush   
})
export class DoseFxComponent implements OnInit {
  @Input() tempateIdx;
  @Input() dataStructInp;                     //  This is the data from the REST call to 242

  numCovGuidelines = 1;
  
  selected = 'High';
  planIdx: number;
  addContourIndex:number = 0; 
  
  
 OARForm: FormGroup;
 dyndataStructuresAr = [];
  
  editParamSet: dBParams = 
    {
      tableName: '',
      docidx: 1,
      editParams: [
        {colName: '', editVal: ''},
      ]
    };
  DoseFxSvce: DoseFxService;
  selectedBeamType = '';
  WWDdocs: any;
  WWD_Data:any;
  formsAr: any;
  basedOn = ['-','GTV','CTV','PTV','ITV']
  exceptDirs = [
    {value :'Ant'},
    {value :'Post'},
    {value : 'Ant&Post'},
    {value :'Sup'},
    {value :'Inf'},
    {value : 'Sup&Inf'},
    {value :'Right'},
    {value :'Left'},
    {value : 'Right&Left'}
    ]
 
  reviewModes = [
    {value: 'Remote Review'},
    {value: 'Screen Grab'},
    {value: 'Video Plan Review'},
    {value: 'One-on-one Review'},
    {value: 'Conference-typeReview'},
    {value: 'Proton Round Review'},
    {value: 'Plan pushed to Mim Vista'}
  ];

  sides = [
    { value:'Right'},
    { value: 'Left'}
  ]
  breathold = [
    { value: 'Yes'},
    { value: 'No'}
  ]
  dataFromChild;
  hasExpansion: string = null;
  hasAsymExp: boolean = false;
  hasExpBasedOn: boolean = false;
  lVal: string;
  lName: string;

  templateName: string;
  confirm: boolean;
  private _name='';

  @Input() name
  @Input() templateIdx;

  constructor(private route: ActivatedRoute, DoseFxSvce: DoseFxService) { 
    this.DoseFxSvce  = DoseFxSvce;  
   
  }
  allParams: any;
  dyndataPlans: any;
  dyndataOAR:any;
  directions = ['Ant.','Post','Sup.','Inf.','Right','Left'];
  form = new FormGroup({     
    'Site': new FormControl(''),                                           // create FormGroup
    'Dose': new FormControl(''),                                        // create all the controls in the FormGroup
    'fxDose': new FormControl(''),
    'numFx': new FormControl(''),
    'planName': new FormControl(''),
    'targetName': new FormControl(''),
    'beamType': new FormControl(''),
    'beamTest': new FormControl(''),
    'generalConsideration': new FormControl(''),
    'BasedOn': new FormControl(''),
    'symExp': new FormControl(''),
    'exceptionDir': new FormControl(''),
    'excepDirExp': new FormControl(''),
    'expansionConsideration': new FormControl(''),
    'exceptionDir2': new FormControl(''),
    'excepDirExp2': new FormControl(''),
    'expansionConsideration2': new FormControl(''),
    'currentCon': new FormControl(''),
    'ContourConsideration': new FormControl(''), 
    'complexity': new FormControl(''),
    'breathold': new FormControl(''),
    'Side': new FormControl(''), 
    'reviewMode': new FormControl(''),
    'Note': new FormControl(''),
    'AddContour': new FormControl('')
  });
  OARform = new FormGroup({});

  ngOnInit() {
    this.route.queryParamMap.subscribe(qParams => {
      this.planIdx = +qParams.get('planIdx');
    });
  }
  getOARnumber(){
    return Object.keys(this.dataStructInp.OAR).length;
  }

 
  confirmFunction() {
    return confirm("If you change templates, all patient specific edits to this plan will be lost");
  }
  eventFromChild(data) {
    this.dataFromChild = data;
  }

  addOAR(){
    const newGuideline = {"OARname":"","mean":"","max":"","dvhVol":"","dvhDose":"","priority":""};
    const len = Object.keys(this.dataStructInp.OAR).length; 
    this.dataStructInp.OAR[len]= newGuideline;                    
  }
  deleteOAR(i){
    delete this.dataStructInp.OAR[i];
  }

  setExpDir(){
    this.hasAsymExp = true;
  }
  addGuideline(e){
    this.numCovGuidelines++;
    console.log("num is " + this.numCovGuidelines);
    /*
    const planIdx = this.dataStructInp.plans[e]['covG'];
    const newGuideline = {"struct":"","d":"","v":""};
    const len = Object.keys(this.dataStructInp.plans[e]['covG']).length;
    this.dataStructInp.plans[e]['covG'][len+1] = newGuideline;
    console.log('Add Guideline ' + this.dataStructInp.plans[e]['covG'][1].struct);
  */
  }
  editCovGuideline(e, planIdx){
    console.log("editCovGuideline" + e);
    this.dataStructInp.plans[planIdx]['covG'][e.target.id].e.target.name = e.target.value;
  }

  editVal(event, colName, tableName, lwhereColName, lwhereColVal, lwhereColName2?, lwhereColVal2?){
    console.log("editVal " );
    const dBP = {
      whereColVal: lwhereColVal,
      whereColName: lwhereColName,
      whereColVal2: lwhereColVal2,
      whereColName2: lwhereColName2,
      colEditVal: this.lVal,
      colName: colName,
      tableName: tableName,
      newVal: ''
    };
    if (event.currentTarget.innerText){                               // from a mat-select 
      this.lVal = event.currentTarget.innerText
    }
    else if (event.target.innerText){    
      this.lVal = event.target.innerText;
    }
    else if (typeof(event) == 'object'){
      this.lVal = event.target.value;
      this.lName = event.target.name;
      }
    else if (typeof(event) == 'string'){
      this.lVal = event;
      }
     dBP.newVal = this.lVal; 
     this.hasAsymExp = true;

  
   
    if (colName == 'symExpCM'){
       this.hasExpansion = event;
       this.form.addControl('newControl', new FormControl(''));
    }
    this.editParamSet.editParams[0].colName = colName;
    if ( event.target )                                                // for 'input' fields
      this.editParamSet.editParams[0].editVal = event.target.value;
    if ( event.value )                                   // for 'select' fields
      this.editParamSet.editParams[0].editVal = event.value;
    if (colName == 'fxDose' && +this.form.get('Dose').value > 0 ) {       // if enteredVal is fxDose and Dose > 0 set numFx=Dose/fxDose
      const numFxE = +this.form.get('Dose').value/ event.target.value;   // calulate Dose/fxDose
      this.form.get('numFx').setValue(numFxE);                            // set value of numFx in form
      const pushVal: editParam = {                                        // create a editParam to push onto editParamSet
        colName: 'numFx',
        editVal: String(numFxE)
      }
      this.editParamSet.editParams.push(pushVal);                         // push onto struct used for the update
    } 
 
  // this.DoseFxSvce.update(this.editParamSet)                             // do the update. 
   this.DoseFxSvce.update(dBP)                                            // do the update. 
  }
  addContour(e, i, tableN, whereColN, docidx, special?){
    let tV = e.target.value; 
    let tst = e.target.value.replace(/\s+/g, ' ').trim();
    //let t = Object.keys(this.dataStructInp.OAR).length;
    this.dataStructInp.structures["z" + this.addContourIndex++] = tst;   // put 'z' at the beginning of key to put it at end of array
    this.form.controls['AddContour'].setValue('');                        // clear the input of the AddContour control 
    let dBPar = {
      tableName: tableN,
      whereColName: whereColN,
      whereColVal: docidx,
      colName: whereColN, 
      colVal: tV,
      spec: 'addContour'
    }
    this.DoseFxSvce.update(dBPar); 
  }
  editGen(e,i, tableN, whereColN, idx, special?){            
    console.log("184");  
     let dBPar = {
      tableName: tableN,
      whereColName: whereColN,
      whereColVal: idx,
      colName: '', 
      colVal: '',
      spec: special
    }
    if (e.target){  
      dBPar.colName = e.target.name;
      dBPar.colVal = e.target.value;                                                      // used for textArea controls   
    }
   if (i && i.length > 2){
     dBPar.colName = i;
   }
   if (e.currentTarget && e.currentTarget.innerText.length > 0 ){
     dBPar.colVal = e.currentTarget.innerText;
   }
    if (e.source){
      console.log('_value' + e.source._value);
      dBPar.colName = special;
      dBPar.colVal = e.source._value;
    }
    this.DoseFxSvce.update(dBPar);   
                                   // To delete a contour, the user deletes the content of the input widget
    if (e.target && e.target.value &&  e.target.value.length < 1){                              // if the content has been erased                         
      delete this.dataStructInp.structures[e.target.name];                                  // remove the contour from the dataStruct
    }
    if (special == 'setExpBasedOn'){                                                        // show ff items
     console.log("testGit");
      if (e.currentTarget.value)                                                            // for input widgets
        this.dataStructInp.plans[idx].basedOnText = e.currentTarget.value;
      if (e.target.innerHTML)                                                                   // for options
        this.dataStructInp.plans[idx].basedOnText = e.target.innerHTML;
    }
  }
  setAsymExp($event, planIdx?){                                                             // sets Boolean to show AsymExpMM. 
    this.dataStructInp.plans.expName= $event.currentTarget.innerText;;
    console.log('edit ' + planIdx);
  }
  setExpBasedOn($event, key?){
    console.log('editExpBasedOn ' + key);
   // this.dataStructInp.plans[key]['basedOn']= $event.currentTarget.innerText;;
  }
  editSymExpMM($event, key?){
    this.dataStructInp.plans[key]['symExpCM']= $event.currentTarget.value;;
  }
  editExpBasedOnText($event, key?){
    this.dataStructInp.plans[key]['basedOn']= $event.currentTarget.value;;
  }
  editTargExpBasedOn($event, Pkey, Tkey){
    this.dataStructInp.plans[Pkey]['addTarg'][Tkey]['basedOn'] = $event.currentTarget.innerText;;
  }
  editTargSymExpMM($event, Pkey, Tkey){
    this.dataStructInp.plans[Pkey]['addTarg'][Tkey]['symExpCM']= $event.currentTarget.value;;
  }
  editTargAsymExp($event, Pkey, Tkey){
    this.dataStructInp.plans[Pkey]['addTarg'][Tkey]['expName']= $event.currentTarget.innerText;; ;
  }
  getBasedOn(key){
    if ( this.dataStructInp.plans[key]['basedOn'])
      return this.dataStructInp.plans[key]['basedOn'] ;
    else return null;  
  }
  getTargBasedOn(Pkey, Tkey){
    if ( this.dataStructInp.plans[Pkey]['addTarg'][Tkey]['basedOn'])
      return this.dataStructInp.plans[Pkey]['addTarg'][Tkey]['basedOn'] ;
    else return null;  
  }
  getTargExpName(Pkey, Tkey){
    if ( this.dataStructInp.plans[Pkey] && this.dataStructInp.plans[Pkey]['addTarg'][Tkey]['expName']){
      return this.dataStructInp.plans[Pkey]['addTarg'][Tkey]['expName'] ;
    }
    else return null;  
  }
  
}
