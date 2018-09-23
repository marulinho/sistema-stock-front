import { ROUTES } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { MaterialModule, MdTabsModule } from '@angular/material';
import { Md2Module } from 'md2/module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule, NoPreloading } from '@angular/router';
import { DialogExampleComponent } from './shared/dialog/dialog-example/dialog-example.component';
import { ComponentDialogComponent } from './pages/component-dialog/component-dialog.component';
//import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ComponentButtonsComponent } from './pages/component-buttons/component-buttons.component';
import { ComponentProgressComponent } from './pages/component-progress/component-progress.component';
import { ChartsChartjsComponent } from './pages/charts-chartjs/charts-chartjs.component';
import { TablesDynamicComponent } from './pages/tables-dynamic/tables-dynamic.component';
import { TablesBasicComponent } from './pages/tables-basic/tables-basic.component';
import { FormsTreeComponent } from './pages/forms-tree/forms-tree.component';
import { ComponentCardComponent } from './pages/component-card/component-card.component';
import { ComponentBootstrapComponent } from './pages/component-bootstrap/component-bootstrap.component';
import { ComponentNotificationsComponent } from './pages/component-notifications/component-notifications.component';
import { ComponentRadioButtonComponent } from './pages/component-radio-button/component-radio-button.component';
import { ComponentCheckboxComponent } from './pages/component-checkbox/component-checkbox.component';
import { ComponentChipsComponent } from './pages/component-chips/component-chips.component';
import { ComponentDatePickerComponent } from './pages/component-date-picker/component-date-picker.component';
import { ComponentListComponent } from './pages/component-list/component-list.component';
import { ComponentMediaPlayerComponent } from './pages/component-media-player/component-media-player.component';
import { ComponentMenuComponent } from './pages/component-menu/component-menu.component';
import { ComponentGridListComponent } from './pages/component-grid-list/component-grid-list.component';
import { ComponentTextEditorComponent } from './pages/component-text-editor/component-text-editor.component';
import { ComponentSelectComponent } from './pages/component-select/component-select.component';
import { ComponentSlideToggleComponent } from './pages/component-slide-toggle/component-slide-toggle.component';
import { ComponentSliderComponent } from './pages/component-slider/component-slider.component';
import { ComponentTabsComponent } from './pages/component-tabs/component-tabs.component';
import { ComponentToolbarComponent } from './pages/component-toolbar/component-toolbar.component';
import { ComponentTooltipComponent } from './pages/component-tooltip/component-tooltip.component';
import { IconWeatherComponent } from './pages/icon-weather/icon-weather.component';
import { IconFontawesomeComponent } from './pages/icon-fontawesome/icon-fontawesome.component';
import { FormsValidationComponent } from './pages/forms-validation/forms-validation.component';
import { FormsWizardComponent } from './pages/forms-wizard/forms-wizard.component';
import { FormsAutocompleteComponent } from './pages/forms-autocomplete/forms-autocomplete.component';
import { FormsUploadComponent } from './pages/forms-upload/forms-upload.component';
import { ChartsPeityComponent } from './pages/charts-peity/charts-peity.component';
import { WidgetsComponent } from './pages/widgets/widgets.component';
import { LayoutFlexComponent } from './pages/layout-flex/layout-flex.component';
import { LayoutTabsComponent } from './pages/layout-tabs/layout-tabs.component';
import { LayoutEdgesComponent } from './pages/layout-edges/layout-edges.component';
import { LayoutCardsComponent } from './pages/layout-cards/layout-cards.component';
import { LayoutFullscreenComponent } from './pages/layout-fullscreen/layout-fullscreen.component';
import { PagesErrorComponent } from './pages/pages-error/pages-error.component';
import { PagesLockscreenComponent } from './pages/pages-lockscreen/pages-lockscreen.component';
import { PagesInvoiceComponent } from './pages/pages-invoice/pages-invoice.component';
import { PagesNotfoundComponent } from './pages/pages-notfound/pages-notfound.component';
import { PagesSigninComponent } from './pages/pages-signin/pages-signin.component';
import { PagesSignupComponent } from './pages/pages-signup/pages-signup.component';
import { AppsCalendarComponent } from './pages/apps-calendar/apps-calendar.component';
import { AppsExplorerComponent } from './pages/apps-explorer/apps-explorer.component';
import { AppsMailComponent } from './pages/apps-mail/apps-mail.component';
import { IconMaterialComponent } from './pages/icon-material/icon-material.component';
import { ScheduleModule } from './shared/schedule/schedule.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FileUploadModule } from 'ng2-file-upload';
import { TreeModule } from 'angular2-tree-component';
import { ChartModule } from './shared/chart/chart.module';
import { MediaModule } from './shared/media/media.module';
import { WidgetModule } from './shared/widget/widget.module';
import { CustomFormsModule } from 'ng2-validation';
import { DashboardEdgeComponent } from './pages/dashboard-edge/dashboard-edge.component';
import { DialogThemeComponent } from './shared/dialog/dialog-theme/dialog-theme.component';
import { TranslateStaticLoader, TranslateLoader, TranslateModule } from 'ng2-translate';
import { QuillEditorComponent } from './shared/editor/quill-editor.component';



//IMPORTS MODULO SEGURIDAD
  import { IniciarSesionComponent } from './Modulo_Seguridad/CU_Iniciar_Sesion/iniciar.sesion.component';
  import { PerfilUsuarioComponent } from './Modulo_Seguridad/Perfil_Usuario/perfil.usuario.component';
  import { ModificarUsuarioComponent } from './Modulo_Seguridad/CU_Modificar_Usuario/Modificar_Usuario/modificar.usuario.component';
  import { RegistrarUsuarioComponent } from './Modulo_Seguridad/CU_Registrar_Usuario/registrar.usuario.component';
  import { RecuperarCuentaComponent } from './Modulo_Seguridad/CU_Recuperar_Cuenta/recuperar.cuenta.component';
  import { ModificarContraseniaComponent } from './Modulo_Seguridad/CU_Modificar_Usuario/Cambiar_Contrasenia/modificar.contrasenia.component';
  import { ModuloSeguridadService } from './Modulo_Seguridad/moludo.seguridad.service';

//IMPORTS MODULO CONFIGURACION
  import { ModuloConfiguracionService } from './Modulo_Configuracion/modulo.configuracion.service';
  import { HomeSistemaComponent } from './Modulo_Configuracion/Home_Sistema/home.sistema.component';  
  import { HomeCategoriaComponent } from './Modulo_Configuracion/Home_Categoria/home.categoria.component';
  import { RegistrarCategoriaComponent } from './Modulo_Configuracion/Home_Categoria/CU_Registrar_Categoria/registrar.categoria.component';
  import { HomeCategoriaDetalleComponent } from './Modulo_Configuracion/Home_Categoria_Detalle/home.categoria.detalle.component';
  import { ModificarCategoriaComponent } from './Modulo_Configuracion/Home_Categoria_Detalle/CU_Modificar_Categoria/modificar.categoria.component';
  import { AsignarSubCategoriaCategoriaComponent } from './Modulo_Configuracion/Home_Categoria_Detalle/CU_Asignar_SubCategoria_Categoria/asignar.subcategoriacategoria.component';
  import { AsignarProductoCategoriaComponent } from './Modulo_Configuracion/Home_Categoria_Detalle/CU_Asignar_Producto_Categoria/asignar.productocategoria.component';
  import { HomeSubCategoriaComponent } from './Modulo_Configuracion/Home_SubCategoria/home.subcategoria.component';
  import { RegistrarSubCategoriaComponent } from './Modulo_Configuracion/Home_SubCategoria/CU_Registrar_SubCategoria/registrar.subcategoria.component';
  import { HomeSubCategoriaDetalleComponent } from './Modulo_Configuracion/Home_SubCategoria_Detalle/home.subcategoria.detalle.component';
  import { ModificarSubCategoriaComponent } from './Modulo_Configuracion/Home_SubCategoria_Detalle/CU_Modificar_SubCategoria/modificar.subcategoria.component';
  import { AsignarProductoSubCategoriaComponent } from './Modulo_Configuracion/Home_SubCategoria_Detalle/CU_Asignar_Producto_SubCategoria/asignar.productosubcategoria.component';
  import { HomeProductoComponent } from './Modulo_Configuracion/Home_Producto/home.producto.component';
  import { RegistrarProductoComponent } from './Modulo_Configuracion/Home_Producto/CU_Registrar_Producto/registrar.producto.component';
  import { HomeProductoDetalleComponent } from './Modulo_Configuracion/Home_Producto_Detalle/home.producto.detalle.component';
  import { ModificarProductoComponent } from './Modulo_Configuracion/Home_Producto_Detalle/CU_Modificar_Producto/modificar.producto.component';
  
  import { HomeClienteComponent } from './Modulo_Configuracion/Home_Cliente/home.cliente.component';
  import { RegistrarClienteComponent } from './Modulo_Configuracion/Home_Cliente/CU_Registrar_Cliente/registrar.cliente.component';
  import { HomeClienteDetalleComponent } from './Modulo_Configuracion/Home_Cliente_Detalle/home.cliente.detalle.component';
  import { ModificarClienteComponent } from './Modulo_Configuracion/Home_Cliente_Detalle/CU_Modificar_Cliente/modificar.cliente.component';

  import { HomeListaPrecioComponent } from './Modulo_Configuracion/Home_ListaPrecio/home.listaprecio.component';
  import { RegistrarListaPrecioComponent } from './Modulo_Configuracion/Home_ListaPrecio/CU_Registrar_ListaPrecio/registrar.listaprecio.component';
  import { HomeComboComponent } from './Modulo_Configuracion/Home_Combo/home.combo.component';
  import { HomeComboDetalleComponent } from './Modulo_Configuracion/Home_Combo_Detalle/home.combo.detalle.component';
  import { RegistrarComboComponent } from './Modulo_Configuracion/Home_Combo/CU_Registrar_Combo/registrar.combo.component';
  import { ModificarComboComponent } from './Modulo_Configuracion/Home_Combo_Detalle/CU_Modificar_Combo/modificar.combo.component';

//IMPORTS MODULO FINANZAS
  import { ModuloFinanzasService } from './Modulo_Finanzas/modulo.finanzas.services';  
  import { HomeCajaComponent } from './Modulo_Finanzas/Home_Caja/home.caja.component';
  import { HomeCompraComponent } from './Modulo_Finanzas/Home_Compra/home.compra.component';
  import { HomeCompraDetalleComponent } from './Modulo_Finanzas/Home_Compra_Detalle/home.compra.detalle.component';
  import { RegistrarCompraComponent } from './Modulo_Finanzas/Home_Compra/CU_Registrar_Compra/registrar.compra.component';
  import { HomeRetiroComponent } from './Modulo_Finanzas/Home_Retiro/home.retiro.component';
  import { HomeRetiroDetalleComponent } from './Modulo_Finanzas/Home_Retiro_Detalle/home.retiro.detalle.component';
  import { RegistrarRetiroComponent } from './Modulo_Finanzas/Home_Retiro/CU_Registrar_Retiro/registrar.retiro.component';
  import { HomeRemitoComponent } from './Modulo_Finanzas/Home_Remito/home.remito.component';
  import { HomeRemitoDetalleComponent } from './Modulo_Finanzas/Home_Remito_Detalle/home.remito.detalle.component';
  import { RegistrarRemitoComponent } from './Modulo_Finanzas/Home_Remito/CU_Registrar_Remito/registrar.remito.component';
  import { HomeVentaComponent } from './Modulo_Finanzas/Home_Venta/home.venta.component';
  import { HomeVentaDetalleComponent } from './Modulo_Finanzas/Home_Venta_Detalle/home.venta.detalle.component';
  import { RegistrarVentaComponent } from './Modulo_Finanzas/Home_Venta/CU_Registrar_Venta/registrar.venta.component';

/**
 * Root Module
 *
 * App bootstrap here, add your component (Page) to var [declarations] for load.
 */
@NgModule({
  declarations: [
    // Page
    AppComponent,
    DialogExampleComponent,
    DialogThemeComponent,
    ComponentDialogComponent,
    DashboardComponent,
    DashboardEdgeComponent,
    ComponentButtonsComponent,
    ComponentProgressComponent,
    ComponentCardComponent,
    ComponentBootstrapComponent,
    ComponentDialogComponent,
    ComponentNotificationsComponent,
    ComponentRadioButtonComponent,
    ComponentCheckboxComponent,
    ComponentChipsComponent,
    ComponentDatePickerComponent,
    ComponentListComponent,
    ComponentMediaPlayerComponent,
    ComponentMenuComponent,
    ComponentGridListComponent,
    ComponentSelectComponent,
    ComponentSlideToggleComponent,
    ComponentSliderComponent,
    ComponentTabsComponent,
    ComponentTextEditorComponent,
    ComponentToolbarComponent,
    ComponentTooltipComponent,
    ComponentRadioButtonComponent,
    IconWeatherComponent,
    IconMaterialComponent,
    IconFontawesomeComponent,
    FormsValidationComponent,
    FormsWizardComponent,
    FormsAutocompleteComponent,
    FormsUploadComponent,
    FormsTreeComponent,
    TablesBasicComponent,
    TablesDynamicComponent,
    ChartsChartjsComponent,
    ChartsPeityComponent,
    WidgetsComponent,
    LayoutFlexComponent,
    LayoutTabsComponent,
    LayoutEdgesComponent,
    LayoutCardsComponent,
    LayoutFullscreenComponent,
    PagesErrorComponent,
    PagesLockscreenComponent,
    PagesInvoiceComponent,
    PagesNotfoundComponent,
    PagesSigninComponent,
    PagesSignupComponent,
    AppsCalendarComponent,
    AppsExplorerComponent,
    AppsMailComponent,
    QuillEditorComponent,

    //COMPONENTS MODULO SEGURIDAD
    IniciarSesionComponent,
    PerfilUsuarioComponent,
    ModificarUsuarioComponent,
    RegistrarUsuarioComponent,
    RecuperarCuentaComponent,
    ModificarContraseniaComponent,

    //COMPONENTS MODULO CONFIGURACION
    HomeSistemaComponent,
    HomeCategoriaComponent,
    RegistrarCategoriaComponent,
    HomeCategoriaDetalleComponent,
    ModificarCategoriaComponent,
    AsignarSubCategoriaCategoriaComponent,
    AsignarProductoCategoriaComponent,

    HomeSubCategoriaComponent,
    RegistrarSubCategoriaComponent,
    HomeSubCategoriaDetalleComponent,
    ModificarSubCategoriaComponent,
    AsignarProductoSubCategoriaComponent,

    HomeProductoComponent,
    RegistrarProductoComponent,
    HomeProductoDetalleComponent,
    ModificarProductoComponent,

    HomeClienteComponent,
    RegistrarClienteComponent,
    HomeClienteDetalleComponent,
    ModificarClienteComponent,

    HomeListaPrecioComponent,
    RegistrarListaPrecioComponent,

    HomeComboComponent,
    RegistrarComboComponent,
    HomeComboDetalleComponent,
    ModificarComboComponent,

    //MODULO FINANZAS
    HomeCajaComponent,
    HomeCompraComponent,
    HomeCompraDetalleComponent,
    RegistrarCompraComponent,
    HomeRetiroComponent,
    HomeRetiroDetalleComponent,
    RegistrarRetiroComponent,
    HomeRemitoComponent,
    HomeRemitoDetalleComponent,
    RegistrarRemitoComponent,
    HomeVentaComponent,
    HomeVentaDetalleComponent,
    RegistrarVentaComponent,


  ],
  imports: [
    // Angular Imports
    BrowserModule,
    BrowserAnimationsModule,
    MdTabsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    // Lokra Imports
    ScheduleModule,
    ChartModule,    
    MediaModule,
    WidgetModule,
    // Extra Plugin Imports
    NgxDatatableModule,
    // If you using lazy loading, var [preloadingStrategy] can change to PreloadAllModules or NoPreloading.
    RouterModule.forRoot(ROUTES, {useHash: true, preloadingStrategy: NoPreloading}),
    MaterialModule,
    FlexLayoutModule,
    Md2Module,
    NgxDatatableModule,
    FileUploadModule,
    CustomFormsModule,
    TreeModule,
    
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    }),
  ],
  providers: [
    // Global service (Global state)
    
    //SERVICES MODULO SEGURIDAD
    AppService,
    ModuloSeguridadService,

    //SERVICES MODULO CONFIGURACION
    ModuloConfiguracionService,

    //SERVICES MODULO FINANZAS
    ModuloFinanzasService
    
  ],
  entryComponents: [
    // Customize dialog must be import here.
    DialogExampleComponent,
    DialogThemeComponent,
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, './assets/i18n', '.json');
}
