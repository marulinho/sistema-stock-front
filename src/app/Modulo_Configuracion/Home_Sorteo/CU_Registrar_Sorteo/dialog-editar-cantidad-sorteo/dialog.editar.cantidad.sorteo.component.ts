import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { Constantes } from '../../../../Datos_Sistema/constantes';

@Component({
    selector: "app-dialog-editar-cantidad-sorteo",
    templateUrl: './dialog.editar.cantidad.sorteo.component.html',
    styleUrls: ['./dialog.editar.cantidad.sorteo.component.scss']
})
export class DialogEditarCantidadSorteoComponent implements OnInit {
    title: string;
    description: string;
    option1: string;
    option2: string;
    
    label_cantidad = Constantes.LABEL_CANTIDAD;
    label_error_cantidad = Constantes.MENSAJE_CANTIDAD_INSUFICIENTE;

    cantidad: number;

    constructor(private dialogRef: MdDialogRef<DialogEditarCantidadSorteoComponent>) {
    }

    ngOnInit(): void {}

    
}
