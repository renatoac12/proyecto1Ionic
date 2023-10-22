import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Usuario } from '../models/usuario';

const storageUsuario = 'usuarioData';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  async getItem(key:string):Promise<string | null>{
    const obj = await Preferences.get({key:key});
    return obj.value;
  }

  async setItem(llave:string,valor:string){
    await Preferences.set({key:llave,value:valor});
  }

  async obtenerUsuario():Promise<Usuario[]>{
    const storageData = await this.getItem(storageUsuario);
    if (storageData == null) {
      return[];
    }

    const data:any[] = JSON.parse(storageData);
    if (data) {
      return data;
    }
    else{
      return [];
    }
  }

  async guardarUsuario(usuario:Usuario[]){
    var usuarios = await this.obtenerUsuario();
    for (const i of usuarios) {
      if (i) {
        usuario.push(i);
      }
    }
    this.setItem(storageUsuario,JSON.stringify(usuario));
  }
  
}
