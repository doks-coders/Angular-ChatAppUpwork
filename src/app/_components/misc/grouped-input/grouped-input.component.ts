import { Component, Input, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';

@Component({
  selector: 'app-grouped-input',
  templateUrl: './grouped-input.component.html',
  styleUrls: ['./grouped-input.component.css']
})
export class GroupedInputComponent implements ControlValueAccessor {
  @Input() label = "";
  @Input() type = "text";
  @Input() icon = "";

  constructor(@Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this; //injects the global ngControl and assigns this TextInputComponent(implemented from ControlValueAccessor) to it

  }

  get control(): FormControl { //then the ngControl.control is returned as a FormControl, this can then be used in our html
    return this.ngControl.control as FormControl;
  }

  writeValue(obj: any): void {

  }
  registerOnChange(fn: any): void {

  }
  registerOnTouched(fn: any): void {

  }
  setDisabledState?(isDisabled: boolean): void {

  }

}
