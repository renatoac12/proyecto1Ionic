import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, Form } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {

  formularioRegistro: FormGroup;

  constructor(public fb: FormBuilder,
    public alertController: AlertController,
    public navCtrl: NavController) { 

    this.formularioRegistro = this.fb.group({
      'usuario': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required),
      'confirmarPassword': new FormControl(''),
      'nombre': new FormControl('', Validators.required),
      'apellido': new FormControl('', Validators.required),
      'rut': new FormControl('', Validators.required),
      'carrera': new FormControl('', Validators.required)
  })
}

ngOnInit(){
    
}

  async guardar(){
    var f = this.formularioRegistro.value;

    if(this.formularioRegistro.invalid){
      const alert = await this.alertController.create({
        header: 'Alerta',
        message: 'Debes completar todos los campos',
        buttons: ['Aceptar'],
    });

    await alert.present();
    return;
  }

  var usuario = {
    usuario: f.usuario,
    password: f.password,
    nombre: f.nombre,
    apellido: f.apellido,
    rut: f.rut,
    carrera: f.carrera
  }

  localStorage.setItem('usuario', JSON.stringify(usuario));

  localStorage.setItem('ingresado', 'true');
  this.navCtrl.navigateRoot('home');
}
}