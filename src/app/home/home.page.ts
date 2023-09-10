import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  formularioHome: FormGroup;

  constructor(public fb: FormBuilder) {

    this.formularioHome = this.fb.group({
      'usuario': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required)
    })    
}

ngOnInit() {
}

ingresar(){
  
}
}
