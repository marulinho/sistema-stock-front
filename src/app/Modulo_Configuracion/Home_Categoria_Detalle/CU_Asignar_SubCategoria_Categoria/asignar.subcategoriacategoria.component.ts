import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MdSnackBar } from '@angular/material';
import { MdDialog } from '@angular/material';
import { AppService } from '../../../app.service';
import { Constantes } from '../../../Datos_Sistema/constantes';
import { DialogExampleComponent } from '../../../shared/dialog/dialog-example/dialog-example.component';
import { ModuloConfiguracionService, Categoria } from '../../modulo.configuracion.service';

@Component({
    selector: 'app-asignar-subcategoria-categoria',
    templateUrl: './asignar.subcategoriacategoria.component.html',
    styleUrls: ['./asignar.subcategoriacategoria.component.css']

})

export class AsignarSubCategoriaCategoriaComponent implements OnInit {

    snackBarRef: any;
    errorMessage: string = "";
    selectedOption: string;
    label_subcategorias = Constantes.LABEL_SUBCATEGORIA;
    label_detalle_subcategorias = Constantes.DESCRIPCION_SUBCATEGORIAS_NO_CATEGORIA;
    label_nombre = Constantes.LABEL_NOMBRE;
    label_codigo = Constantes.LABEL_CODIGO;
    label_descripcion = Constantes.LABEL_DESCRIPCION;
    label_accion = Constantes.LABEL_ACCION;
    label_buscar_subcategoria = Constantes.LABEL_BUSCAR_SUBCATEGORIA;
    tooltipAsignarSubCategoria = Constantes.LABEL_ASIGNAR_SUBCATEGORIA;
    tooltipAtras = Constantes.LABEL_NAVEGAR_ATRAS;
    position = 'above';
    label_tabla_subcategoria = Constantes.LABEL_BUSCAR_TABLA_SUBCATEGORIA;
    subcategorias = [];
    subcategorias_temp = [];
    codigo_categoria: number;


    constructor(private router: Router,
        private route: ActivatedRoute,
        private moduloConfiguracion: ModuloConfiguracionService,
        private appService: AppService,
        private snackBar: MdSnackBar,
        private dialog: MdDialog) {

        this.route.params.subscribe(params => {
            this.codigo_categoria = (params['id_categoria'])
        });
        this.obtenerSubCategorias();
        appService.getState().topnavTitle = Constantes.LABEL_ASIGNAR_SUBCATEGORIA;

    }

    ngOnInit() {

    }

    obtenerSubCategorias() {
        this.moduloConfiguracion.obtenerSubCategoriasNoCategoriaId(this.codigo_categoria)
            .then(
                response => {
                    this.subcategorias = response.datos_operacion;
                    this.subcategorias_temp = [...response.datos_operacion];
                }
            )
            .catch(
                error => {
                    if (error.error_description == Constantes.ERROR_NO_INICIO_SESION) {
                        this.snackBarRef = this.snackBar.open(Constantes.MENSAJE_NO_INICIO_SESION, Constantes.MENSAJE_OK, { duration: 3000, });
                        this.router.navigate([Constantes.URL_LOGIN]);
                    }
                    else {
                        this.errorMessage = error.error_description;
                    }

                }
            );
    }

    updateFilter(event) {
        const val = event.target.value.toLowerCase();
        const temp = this.subcategorias_temp.filter(function (d) {
            return d.nombre.toLowerCase().indexOf(val) !== -1 || !val;
        });
        this.subcategorias = temp;
    }

    openDialog(codigo_subcategoria) {
        let dialogRef = this.dialog.open(DialogExampleComponent);
        dialogRef.componentInstance.title = Constantes.TITLE_ASIGNAR_SUBCATEGORIA;
        dialogRef.componentInstance.description = Constantes.PREGUNTA_ASIGNAR_SUBCATEGORIA;
        dialogRef.componentInstance.option1 = Constantes.BOTON_ACEPTAR;
        dialogRef.componentInstance.option2 = Constantes.BOTON_CANCELAR;
        dialogRef.afterClosed().subscribe(
            result => {
                this.selectedOption = result;
                if (this.selectedOption === Constantes.OPCION_ACEPTAR) {
                    this.moduloConfiguracion.asignarSubCategoriaCategoria(this.codigo_categoria,codigo_subcategoria)
                        .then(
                            response => {
                                this.router.navigate([Constantes.URL_HOME_CATEGORIA_DETALLE + '/' + this.codigo_categoria]);
                                this.snackBarRef = this.snackBar.open(Constantes.MENSAJE_ASIGNACION_EXISTOSA, Constantes.MENSAJE_OK, { duration: 3000, });
                            }
                        )
                        .catch(
                            error => {
                                if (error.error_description == Constantes.ERROR_NO_INICIO_SESION) {
                                    this.router.navigate([Constantes.URL_LOGIN]);
                                }
                                else {
                                    this.errorMessage = error.error_description;
                                }
                            }
                        );
                }
            });
    }


    apretarAtras() {
        this.router.navigate([Constantes.URL_HOME_CATEGORIA_DETALLE + '/' + this.codigo_categoria]);
    }
}
