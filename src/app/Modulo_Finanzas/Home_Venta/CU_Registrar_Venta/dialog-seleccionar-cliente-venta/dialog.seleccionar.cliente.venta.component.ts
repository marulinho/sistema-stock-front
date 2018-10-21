import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { Constantes } from '../../../../Datos_Sistema/constantes';

@Component({
    selector: "app-dialog-seleccionar-cliente-venta",
    templateUrl: './dialog.seleccionar.cliente.venta.component.html',
    styleUrls: ['./dialog.seleccionar.cliente.venta.component.scss']
})
export class DialogSeleccionarClienteVentaComponent implements OnInit {
    title: string;
    description: string;
    option1: string;
    option2: string;

    label_nombre = Constantes.LABEL_NOMBRE;
    label_apellido = Constantes.LABEL_MARCA;
    label_dni = Constantes.LABEL_DNI;
    label_telefono = Constantes.LABEL_TELEFONO;
    label_direccion = Constantes.LABEL_DIRECCION;
    label_tabla_cliente = Constantes.LABEL_BUSCAR_TABLA_CLIENTE;
    label_buscar_cliente = Constantes.LABEL_BUSCAR_CLIENTE;
    label_accion = Constantes.LABEL_ACCION;

    clientes = [];
    clientes_temp = [];

    constructor(private dialogRef: MdDialogRef<DialogSeleccionarClienteVentaComponent>) {
    }

    ngOnInit(): void {
        
        this.clientes_temp = [...this.clientes];
    }

    

    updateFilter(event) {
        const val = event.target.value.toLowerCase();
        const temp = this.clientes_temp.filter(function (d) {
            return d.nombre.toLowerCase().indexOf(val) !== -1 || !val;
        });
        this.clientes = temp;
    }

    getClientesSeleccionados(){
        this.clientes_temp = [...this.clientes];
        let longitud = this.clientes.length;
        let resultado = false;
        let cantidad = 0;
        for(var i = 0; i<longitud ; i++){
            if(this.clientes[i]['checked']===true){
                cantidad += 1;
            }
        }
        if(cantidad===1){
            resultado = true;
        }
        else{
            resultado = false;
        }
        return resultado;
    }
}
