import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HomeFincaService, Finca } from './home.finca.service';
import { AppService } from '../../app.service';
import { ErroresSistema } from '../../Datos_Sistema/errores.sistema';
import { Constantes } from '../../Datos_Sistema/constantes';


@Component({
    selector:'homeFinca',
    templateUrl: './home.finca.component.html',
    styleUrls:['./home.finca.component.css']
    
})

export class HomeFincaComponent implements OnInit{

    constructor(private router:Router,
                private appService:AppService ){
                    
           appService.getState().topnavTitle = Constantes.LABEL_HOME_SISTEMA;
                    

    }

    ngOnInit(){
    }


}


