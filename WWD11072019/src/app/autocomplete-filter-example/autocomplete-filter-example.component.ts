import {Component, OnInit, EventEmitter, Output, Input} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {FormsModule, ReactiveFormsModule}  from '@angular/forms';


/**
 * @title Filter autocomplete
 */
@Component({
  selector: 'autocomplete-filter-example',
  templateUrl: 'autocomplete-filter-example.component.html',
  styleUrls: ['autocomplete-filter-example.component.css'],
})

export class AutocompleteFilterExample implements OnInit {
  @Output() sendDataToParent = new EventEmitter<string>();
  @Input() dataFromParent: String;
  myControl = new FormControl();
  options: string[] = ['GTV', 'CTV', 'PTV','ITV'];
  filteredOptions: Observable<string[]>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  setVal(e){
    console.log("setVal;");
  }
  _sendDataToParent(data:string) {
    this.sendDataToParent.emit(data);
  }
}