import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { AuthService } from '../../auth/auth.service';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  isError=false;
  isLoading=false;
  backUrl:String|null = null;

  type!:string | null;
  code!:string | null;
  directoryId!:number;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private notification: NzNotificationService) {}

  ngOnInit(): void {
    this.backUrl = this.route.snapshot.paramMap.get("backUrl");

    this.type = this.route.snapshot.paramMap.get("type");
    this.code = this.route.snapshot.paramMap.get("code");
    this.directoryId = Number(this.route.snapshot.paramMap.get("directoryId"));

    this.form = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40)
          ]
        ],
        remember: ['', []],
      }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    this.isLoading = true;

    if (this.form.invalid) {
      this.isLoading = false;
      return;
    }

    this.authService.login(this.form.value).then(r=>{
      if(this.form.value.remember){localStorage.setItem("isRememberMe","true");}
      this.isLoading = false;
      if(this.type === "join")
        this.router.navigate([ '/shared/form-member', this.type, this.code, this.directoryId ]);
      else if(this.backUrl != null)
        this.router.navigate([ this.backUrl ]);
      else
        this.router.navigate([ '/private/index' ]);
    }).catch(e=>{
      this.isLoading = false;
      this.isError = true;
    });
  }

}
