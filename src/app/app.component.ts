import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupform: FormGroup;
  forbddenUserNames = ['Cris', 'Anna', 'cris', 'anna'];

  ngOnInit(): void {
      this.signupform = new FormGroup({
        'userData': new FormGroup({
          'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
          'email': new FormControl(null, [Validators.required, Validators.email], this.forbbidenEmails)          
        }),
        'gender': new FormControl('male'),
        'hobbies': new FormArray([])
      });
      // this.signupform.valueChanges.subscribe(
      //   (value) => console.log(value)
      // );
      this.signupform.statusChanges.subscribe(
        (value) => console.log(value)
      );
      // this.signupform.setValue({
      //   'userData': {
      //     'username': 'MAx',
      //     'email': 'email@oi.com'
      //   },
      //   'gender': 'male',
      //   'hobbies': []
      // });
      this.signupform.patchValue({
        'userData': {
          'username': 'anna',
          'email': 'emailbbb@oi.com'
        }
      })
  }

  onSubmit() {
    console.log(this.signupform);
    this.signupform.reset();
    
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

  forbbidenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if(control.value === 'test@test.com') {
          resolve({'emailIsForbbiden': true})
        } else {
          resolve(null)
        }
      }, 1500)
    });
    return promise;
  }
}
