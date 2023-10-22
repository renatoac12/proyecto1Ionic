import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, Form } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
import { Usuario } from '../models/usuario';
import { HelperService } from '../servicios/helper.service';
import { StorageService } from '../servicios/storage.service';
import { Router } from '@angular/router';


const { Storage } = Plugins;

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {

  formularioRegistro: FormGroup;
  selectedRegion: any = [];
  selectedComuna: any = [];
  regiones:any[] = [];
  comunas:any[] = [];
  

  constructor(public fb: FormBuilder,
    public alertController: AlertController,
    public navCtrl: NavController,
    private http: HttpClient,
    private helper: HelperService,
    private router: Router,
    private storageService: StorageService) { 

    this.obtenerRegiones();

    this.formularioRegistro = this.fb.group({
      'usuario': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required),
      'nombre': new FormControl('', Validators.required),
      'apellido': new FormControl('', Validators.required),
      'rut': new FormControl('', Validators.required),
      'carrera': new FormControl('', Validators.required)
  })

 
}

ngOnInit(){

  if (this.regiones.length > 0) {
    this.selectedRegion = this.regiones[0];
    this.cargarComunasPorRegion(this.selectedRegion.id);
  }
    
}

  async guardar(){
    var f = this.formularioRegistro.value;

    const loader = await this.helper.showLoader("Cargando");
    if(this.formularioRegistro.invalid){
      const alert = await this.alertController.create({
        header: 'Alerta',
        message: 'Debes completar todos los campos',
        buttons: ['Aceptar'],
    });

    await alert.present();

    await loader.dismiss();
    return;
  }

  var usuario = {
    usuario: f.usuario,
    password: f.password,
    nombre: f.nombre,
    apellido: f.apellido,
    rut: f.rut,
    carrera: f.carrera,
    contrasenia : f.password,
  }

  this.storageService.guardarUsuario([usuario]);
  await loader.dismiss();
 
  this.navCtrl.navigateRoot('home')
  await this.helper.showAlert("Usuario registrado correctamente", "Información");
  localStorage.setItem('usuario', JSON.stringify(usuario));
  localStorage.setItem('ingresado', 'true');
  
}



 

 

  obtenerRegiones() {
    this.http.get<any[]>('https://dev.matiivilla.cl/duoc/location/region')
      .subscribe(
        (data) => {
          this.regiones = data;
        },
        (error) => {
          console.error('Error al obtener las regiones:', error);
        }
      );
  }



  cargarComunasPorRegion(regionId: any) {

    this.http.get<any[]>(`https://dev.matiivilla.cl/duoc/location/comuna/${regionId}`) 
      .subscribe(
        (data) => {
          this.comunas = data;
        },
        (error) => {
          console.error('Error al obtener las comunas:', error);
        }
      );
  }




  
}