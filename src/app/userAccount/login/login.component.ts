import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { User } from 'src/app/models/User';
import { UseraccountService } from 'src/app/services/useraccount.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  loading = false;
  submitted = false;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private accountService: UseraccountService,
  ) {
      // redirect to home if already logged in
      // if (this.accountService.userValue) {
      //     this.router.navigate(['/']);
      // }
  }

  ngOnInit() {
      this.loginForm = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required]
      });

      // get return url from route parameters or default to '/'
      // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.loginForm.invalid) {
          return;
      }

      var user: User = new User;
      user.name = this.loginForm.value.username;
      user.password = this.loginForm.value.password;

      this.loading = true;
      this.accountService.login(user).subscribe(data => {
        if(data.name){
          console.log(data);
          sessionStorage.setItem('user', JSON.stringify(data))
          this.accountService.setUser(data);
          this.router.navigate(['tvShow'])
        }else{
          alert("Invalid User Credentials");
        }
      })
  }

}
