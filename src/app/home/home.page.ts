import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  formularioHome: FormGroup;

  constructor(public fb: FormBuilder,
    public alertController: AlertController,
    public navCtrl: NavController) {

    this.formularioHome = this.fb.group({
      'usuario': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required)
    })    
}

ngOnInit() {
}

async ingresar() {
  var f = this.formularioHome.value;
  var usuarioString = localStorage.getItem('usuario');
  if (usuarioString !== null) {
    var usuario = JSON.parse(usuarioString);
    if (usuario.usuario == f.usuario && usuario.password == f.password) {
      console.log('Ingresado');
      localStorage.setItem('ingresado', 'true');
      this.navCtrl.navigateRoot('home');
    } else {
      const alert = await this.alertController.create({
        header: 'Datos incorrectos',
        message: 'los datos ingresados son incorrectos',
        buttons: ['Aceptar'],
      });
      await alert.present();
    }
  }
}
}
