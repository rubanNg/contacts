import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTabGroup } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { HttpService } from 'src/services/http.services';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  @ViewChild('tab', { static: true }) tab: MatTabGroup;
  authForm: FormGroup;
  errorMessage: string = null;
  constructor(private http: HttpService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.authForm = new FormGroup({
      login: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    })
  }


  auth() {
    this.errorMessage = null;
    this.http.authUser(this.authForm.value).subscribe(resposne => {
      if (resposne.token) {
        this.authService.auth(resposne.token);
        this.router.navigate(['/contacts']);
      }
    }, (error: HttpErrorResponse) => {
      this.errorMessage = error.error.message;
    })
  }

  create() {

  }

}
