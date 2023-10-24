import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BrowserMultiFormatReader, Result, BarcodeFormat } from '@zxing/library';
import { Camera, CameraResultType } from '@capacitor/camera';
import { CameraSource } from '@capacitor/camera/dist/esm/definitions';
import { Geolocation } from '@capacitor/geolocation';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lector',
  templateUrl: 'lector.page.html',
  styleUrls: ['lector.page.scss'],
})
export class LectorPage implements OnInit {
  qrResult: string = '';
  codeReader: BrowserMultiFormatReader;
  isScanning: boolean = false;
  userData: {
    nombre: string;
    apellido: string;
    carrera: string;
    rut: string;
    datosEscaneados?: string[]; 
  } = {
    nombre: '',
    apellido: '',
    carrera: '',
    rut: '',
  };

router = inject(Router);

  latitud: number | any;
  longitud: number | any;

  imageSource: any;

  @ViewChild('videoElement', { static: true }) videoElement: ElementRef | undefined;

  constructor() {
    this.codeReader = new BrowserMultiFormatReader();
  }

  ngOnInit() {
    this.getUserInfo(); 
  }

  openScanner() {
    if (this.videoElement) {
     
      const hints = new Map<BarcodeFormat, any>();
      hints.set(BarcodeFormat.QR_CODE, {});

      
      this.codeReader
        .decodeFromInputVideoDevice(undefined, this.videoElement.nativeElement)
        .then((result: Result) => {
          
          this.qrResult = result.getText();

       
          const datosEscaneados = this.qrResult.split(',');

      
          this.userData = {
            ...this.userData,
            datosEscaneados: datosEscaneados,
          };

          
          localStorage.setItem('userData', JSON.stringify(this.userData));

          this.isScanning = false; 
          this.getUserInfo(); 
        })
        .catch((error: any) => {
          console.error(error);
          this.isScanning = false;
        });

      this.isScanning = true; 
    }
  }

  closeScanner() {
   
    this.codeReader.reset();
    this.qrResult = ''; 
  }

  getUserInfo() {
   
    const userInfoString = localStorage.getItem('usuario');
    
    if (userInfoString) { 
      const userInfo = JSON.parse(userInfoString);
  
      
      this.userData = {
        ...this.userData, 
        ...userInfo, 
        datosEscaneados: this.qrResult.split(','),
      };
    }
  }

  takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt,
      saveToGallery: false,
    });

    this.imageSource= image.dataUrl;
  }

    async obtenerCoordenadas() {
      const coordenadas = await Geolocation.getCurrentPosition();
      this.latitud = coordenadas.coords.latitude;
      this.longitud = coordenadas.coords.longitude;
    }


    onClickLogout(){
      localStorage.removeItem('ingresado');
      this.router.navigate(['/home']);
    }

}
