import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../app.service';
import { Constantes } from '../../Datos_Sistema/constantes';
import { ModuloSeguridadService } from '../moludo.seguridad.service';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar.sesion.component.html',
  styleUrls: [
    './iniciar.sesion.component.scss'
  ]
})
export class IniciarSesionComponent implements OnInit, OnDestroy {
  
  label_iniciar_sesion = Constantes.LABEL_INICIAR_SESION;
  label_usuario = Constantes.LABEL_USUARIO;
  label_contrasenia = Constantes.LABEL_CONTRASENIA;
  label_datos_recuperacion = Constantes.LABEL_DATOS_RECUPERACION;
  boton_login = Constantes.BOTON_INICIAR_SESION;
  link_registarse = Constantes.LINK_REGISTRAR;
  link_olvide_contrasenia = Constantes.LINK_OLVIDO_CONTRASENIA;
  errorMessage: string = "";

  constructor(private appService: AppService,
    private router: Router,
    private moduloSeguridad: ModuloSeguridadService) {
    appService.getState().pageFullscreen = true;
  }

  ngOnInit() {}
  ngOnDestroy(){
    this.appService.getState().pageFullscreen = false;
  }

  apretarLogin(username: string, password: string) {
    if (username.length == 0 || password.length == 0) {
      this.errorMessage = Constantes.ERROR_CAMPOS_INCOMPLETOS;
    }
    else {
      this.moduloSeguridad.login(username, password)
        .then(
          response => {
            localStorage.setItem('idUsuario',JSON.stringify(response.datos_operacion.id_usuario));
            this.router.navigate([Constantes.URL_HOME]);
          }
        )
        .catch(
          error => {
            this.errorMessage = error.error_description;
          }
        );
    }
  }

  apretarLinkRegistrar() {
      this.appService.getState().pageFullscreen = false;
      this.router.navigate([Constantes.URL_REGISTRAR_USUARIO]);
  }

  apretarLinkRecuperar(){
    this.appService.getState().pageFullscreen = false;
    this.router.navigate([Constantes.URL_RECUPERAR_CUENTA]);
  }
}
