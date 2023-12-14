import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupform: FormGroup;
  forbddenUserNames = ['Cris', 'Anna'];

  ngOnInit(): void {
      this.signupform = new FormGroup({
        'userData': new FormGroup({
          'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
          'email': new FormControl(null, [Validators.required, Validators.email])          
        }),
        'gender': new FormControl('male'),
        'hobbies': new FormArray([])
      });
  }

  onSubmit() {
    console.log(this.signupform);
    
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupform.get('hobbies')).push(control);
  }//wont work in other version of angular

  getControls() {
    return (<FormArray>this.signupform.get('hobbies')).controls;
  }
  //*ngFor="let hobbyControl of getControls(); let i = index"

  forbiddenNames(control: FormControl): { [s: string]: boolean } {
    if (this.forbddenUserNames.indexOf(control.value) !== -1) {
      return {'nameIsForbbiden': true}
    }
    return null;
  }
}
