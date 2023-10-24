import { inject } from "@angular/core"  
import { Router } from "@angular/router"


export const loginGuard = () => {

    const router = inject(Router);

    if (localStorage.getItem('ingresado')){
        return true;
    } else {
        router.navigate(['/e404']);
        return false;
    }    

}