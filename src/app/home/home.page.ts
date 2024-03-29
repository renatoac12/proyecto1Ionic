import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { StorageService } from '../servicios/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  formularioHome: FormGroup;

  constructor(public fb: FormBuilder,
    public alertController: AlertController,
    public navCtrl: NavController,
    public storageService: StorageService) {

    this.formularioHome = this.fb.group({
      'usuario': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required)
    })    
}

ngOnInit() {
}

async userView(){
  console.log("USUARIOS STORAGE",await this.storageService.obtenerUsuario());
}

async ingresar() {
  var f = this.formularioHome.value;
  var usuarioString = localStorage.getItem('usuario');

  if (usuarioString !== null) {
    var usuario = JSON.parse(usuarioString);
    
    if (usuario.usuario == f.usuario && usuario.password == f.password) {
      console.log('Ingresado');
      const alerta = await this.alertController.create({
        header: 'Entrando...',
        message: 'Escanee el código QR para confirmar asistencia',
        buttons: ['Aceptar'],
      });
      await alerta.present();
      localStorage.setItem('ingresado', 'true');
      this.navCtrl.navigateRoot('lector');
    }
    else {
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
