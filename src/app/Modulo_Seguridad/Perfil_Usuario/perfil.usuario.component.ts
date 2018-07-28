import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../app.service';
import { MdDialog } from '@angular/material';
import { MdSnackBar } from '@angular/material';
import { DialogExampleComponent } from '../../shared/dialog/dialog-example/dialog-example.component';
import { ModuloSeguridadService, Usuario } from '../moludo.seguridad.service';
import { Constantes } from '../../Datos_Sistema/constantes';

@Component({
    selector: 'app-perfil-usuario',
    templateUrl: './perfil.usuario.component.html',
    styleUrls: ['./perfil.usuario.component.css']

})

export class PerfilUsuarioComponent implements OnInit {
    
    snackBarRef: any;
    position = 'above';
    errorMessage: string = "";
    usuarioActual: Usuario;
    perfilUsuarioSeleccionado: Boolean;
    
    id_usuario = JSON.parse(localStorage.getItem('idUsuario'));
    tooltipEditarUsuario = Constantes.LABEL_EDITAR_USUARIO;
    tooltipEliminarUsuario = Constantes.LABEL_ELIMINAR_USUARIO;
    tooltipCambiarContrasenia = Constantes.LABEL_CAMBIAR_CONTRASENIA;
    selectedOption: string;

    label_perfil_usuario = Constantes.LABEL_PERFIL_USUARIO;
    label_datos_personales = Constantes.LABEL_DATOS_PERSONALES;
    label_nombre = Constantes.LABEL_NOMBRE;
    label_apellido = Constantes.LABEL_APELLIDO;

    constructor(private router: Router,
        private moduloSeguridad: ModuloSeguridadService,
        private appService: AppService,
        private snackBar: MdSnackBar,
        private dialog: MdDialog) {
        appService.getState().topnavTitle = Constantes.LABEL_PERFIL_USUARIO;
    }

    ngOnInit() {

        this.moduloSeguridad.obtenerUsuarioId(this.id_usuario)
            .then(
                response => {
                    this.perfilUsuarioSeleccionado = true;
                    this.usuarioActual = response.datos_operacion;
                }
            )
            .catch(
                error => {
                    if (error.error_description == Constantes.ERROR_NO_INICIO_SESION) {
                        this.snackBarRef = this.snackBar.open(Constantes.MENSAJE_NO_INICIO_SESION, Constantes.MENSAJE_OK, {duration: 3000,});
                        this.router.navigate([Constantes.URL_LOGIN]);
                    }
                    else{
                        this.perfilUsuarioSeleccionado = false;
                        this.errorMessage = error.error_description;
                    }

                }
            );
    }

    getPerfilSeleccionado() {
        return this.perfilUsuarioSeleccionado;
    }

    apretarEliminarIcono() {
        this.openDialog();
    }

    openDialog() {
        let dialogRef = this.dialog.open(DialogExampleComponent);
        dialogRef.componentInstance.title = Constantes.TITLE_ELIMINAR_USUARIO;
        dialogRef.componentInstance.description = Constantes.PREGUNTA_ELIMINAR_USUARIO;
        dialogRef.componentInstance.option1 = Constantes.BOTON_ACEPTAR;
        dialogRef.componentInstance.option2 = Constantes.BOTON_CANCELAR;
        dialogRef.afterClosed().subscribe(
            result => {
                this.selectedOption = result;
                if (this.selectedOption === Constantes.OPCION_ACEPTAR) {
                    this.moduloSeguridad.eliminarUsuario(this.id_usuario)
                        .then(
                        response => {
                            this.router.navigate([Constantes.URL_LOGIN]);
                            this.snackBarRef = this.snackBar.open(Constantes.MENSAJE_USUARIO_ELIMINADO, Constantes.MENSAJE_OK, {duration: 3000,});
                        }
                        )
                        .catch(
                            error => {
                                if (error.error_description == Constantes.ERROR_NO_INICIO_SESION) {
                                    this.router.navigate([Constantes.URL_LOGIN]);
                                }
                                else{
                                    this.errorMessage = error.error_description;
                                }
                            }
                        );
                }
            });
        }
}
