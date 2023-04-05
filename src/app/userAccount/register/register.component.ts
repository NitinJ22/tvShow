import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { WSAEUSERS } from 'constants';
import { first } from 'rxjs';
import { User } from 'src/app/models/User';
import { UseraccountService } from 'src/app/services/useraccount.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form!: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: UseraccountService,
  ) {
    // // redirect to home if already logged in
    // if (this.accountService.userValue) {
    //   this.router.navigate(['/']);
    // }
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    var user = new User;
    user.name = this.form.value.username
    user.email = this.form.value.email;
    user.password = this.form.value.password;
    this.accountService.register(user).subscribe(data =>{
      if(data!=null){
        sessionStorage.setItem('user', JSON.stringify(data))
        this.accountService.setUser(data);
        this.router.navigate(['tvShow'])
      }else{
        alert("User already Present");

        
      }
    });
      // .subscribe(
      //   data => {
      //     this.alertService.success('Registration successful', { keepAfterRouteChange: true });
      //     this.router.navigate(['../login'], { relativeTo: this.route });
      //   },
      //   error => {
      //     this.alertService.error(error);
      //     this.loading = false;
      //   });
  }

}
