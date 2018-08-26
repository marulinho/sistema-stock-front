import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdSnackBar, MdDialog } from '@angular/material';
import { AppService } from '../../../app.service';
import { Constantes } from '../../../Datos_Sistema/constantes';
import { Utils } from '../../../Datos_Sistema/utils';
import { ModuloFinanzasService } from '../../modulo.finanzas.services';
import { DialogExampleComponent } from '../../../shared/dialog/dialog-example/dialog-example.component';


@Component({
    selector: 'app-registrar-compra',
    templateUrl: './registrar.compra.component.html',
    styleUrls: ['./registrar.compra.component.scss']

})

export class RegistrarCompraComponent implements OnInit {


    constructor(private appService: AppService,
        private moduloFinanzas: ModuloFinanzasService,
        private snackBar: MdSnackBar,
        private dialog: MdDialog,
        private router: Router) {

        appService.getState().topnavTitle = Constantes.LABEL_REGISTRAR_COMPRA;
    }

    ngOnInit() {
        
    }

    
    apretarSalir() {
        this.router.navigate([Constantes.URL_HOME_COMPRA]);
    }

    apretarAtras() {
        this.router.navigate([Constantes.URL_HOME_COMPRA]);
    }


}



