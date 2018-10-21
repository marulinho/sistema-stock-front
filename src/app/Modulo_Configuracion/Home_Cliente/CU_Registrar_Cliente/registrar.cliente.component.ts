import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';
import { AppService } from '../../../app.service';
import { Constantes } from '../../../Datos_Sistema/constantes';
import { Utils } from '../../../Datos_Sistema/utils';
import { ModuloConfiguracionService } from '../../modulo.configuracion.service'

@Component({
    selector: 'app-registrar-cliente',
    templateUrl: './registrar.cliente.component.html',
    styleUrls: ['./registrar.cliente.component.scss']

})

export class RegistrarClienteComponent implements OnInit {

    snackBarRef: any;
    arrayVerificar = [];
    utils = new Utils();
    errorMessage = '';
    label_registrar_cliente = Constantes.LABEL_REGISTRAR_CLIENTE;
    label_datos_obligatorios = Constantes.LABEL_DATOS_OBLIGATORIOS;
    label_datos_cliente = Constantes.LABEL_DATOS_CLIENTE;
    label_nombre = Constantes.LABEL_NOMBRE;
    label_apellido = Constantes.LABEL_APELLIDO;
    label_dni = Constantes.LABEL_DNI;
    label_telefono = Constantes.LABEL_TELEFONO;
    label_direccion = Constantes.LABEL_DIRECCION;
    label_tipo_cliente = Constantes.LABEL_TIPO_CLIENTE;
    boton_registrar = Constantes.BOTON_REGISTRAR;
    boton_salir = Constantes.BOTON_SALIR;

    nombre: string;
    apellido: string;
    dni: number;
    telefono: number;
    direccion: string;
    tipo_cliente: string;
    
    tipo_clientes = [
        { nombre: Constantes.LABEL_TIPO_CLIENTE_INTERNO, },
        { nombre: Constantes.LABEL_TIPO_CLIENTE_PROVEEDOR }
    ];
    
    
    constructor(private appService: AppService,
        private moduloConfiguracion: ModuloConfiguracionService,
        private snackBar: MdSnackBar,
        private router: Router) {

        appService.getState().topnavTitle = Constantes.LABEL_REGISTRAR_CLIENTE;
    }

    ngOnInit() {

    }


    apretarRegistrarCliente() {
        this.arrayVerificar = this.utils.limpiarArray(this.arrayVerificar);
        this.arrayVerificar.push(this.nombre,this.apellido,this.dni,this.telefono,this.direccion,this.tipo_cliente);
        if (this.utils.verificarDatosIncompletos(this.arrayVerificar) == true) {
            this.errorMessage = Constantes.ERROR_CAMPOS_INCOMPLETOS;
        }
        else {
            this.arrayVerificar = this.utils.limpiarArray(this.arrayVerificar);
            this.errorMessage = "";

            this.moduloConfiguracion.registrarCliente(this.nombre, this.apellido,this.dni,this.telefono,this.direccion,this.tipo_cliente)
                .then(
                    response => {
                        this.router.navigate([Constantes.URL_HOME_CLIENTE]);
                        this.snackBarRef = this.snackBar.open(Constantes.MENSAJE_REGISTRACION_EXITOSA, Constantes.MENSAJE_OK, { duration: 3000, });
                    }
                )
                .catch(
                    error => {
                        if (error.error_description == Constantes.ERROR_NO_INICIO_SESION) {
                            this.router.navigate([Constantes.URL_LOGIN]);
                            this.snackBarRef = this.snackBar.open(Constantes.MENSAJE_NO_INICIO_SESION, Constantes.MENSAJE_OK, { duration: 3000, });
                        }
                        else {
                            this.errorMessage = error.error_description;
                        }
                    }
                );
        }
    }

    apretarSalir() {
        this.router.navigate([Constantes.URL_HOME_CLIENTE]);
    }


}



