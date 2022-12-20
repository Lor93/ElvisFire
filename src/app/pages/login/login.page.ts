import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { ChatService } from 'src/app/services/chat.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentialForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private alertcontroller: AlertController,
    private loadingcontroller: LoadingController,
    private chatservice: ChatService
  ) { }

  ngOnInit() {
    this.credentialForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async signUp()
  {
    const loading = await this.loadingcontroller.create();
    await loading.present();
    this.chatservice
    .signup(this.credentialForm.value)
    .then(
      (user) => {
        loading.dismiss();
        this.router.navigateByUrl('/chat', { replaceUrl: true });
      },
      async (err) => {
        loading.dismiss();
        const alert = await this.alertcontroller.create({
          header: 'Sign up failed',
          message: err.message,
          buttons: ['OK'],
        });

        await alert.present();
      }
    );
  }

  async signIn()
  {
    const loading = await this.loadingcontroller.create();
    await loading.present();

    this.chatservice
      .signIn(this.credentialForm.value)
      .then(
        (res) => {
          loading.dismiss();
          this.router.navigateByUrl('/chat', { replaceUrl: true});
        },
        async (err) => {
          loading.dismiss();
          const alert = await this.alertcontroller.create({
            header: ':(',
            message: err.message,
            buttons: ['OK'],
          });

          await alert.present();
        }
      );
  }

  get email()
  {
    return this.credentialForm.get('email');
  }

  get password()
  {
    return this.credentialForm.get('password');
  }

}
