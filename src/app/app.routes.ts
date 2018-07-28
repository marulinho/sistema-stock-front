import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComponentDialogComponent } from './pages/component-dialog/component-dialog.component';
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
import { ComponentSelectComponent } from './pages/component-select/component-select.component';
import { ComponentSlideToggleComponent } from './pages/component-slide-toggle/component-slide-toggle.component';
import { ComponentSliderComponent } from './pages/component-slider/component-slider.component';
import { ComponentTabsComponent } from './pages/component-tabs/component-tabs.component';
import { ComponentTextEditorComponent } from './pages/component-text-editor/component-text-editor.component';
import { ComponentToolbarComponent } from './pages/component-toolbar/component-toolbar.component';
import { ComponentTooltipComponent } from './pages/component-tooltip/component-tooltip.component';
import { IconMaterialComponent } from './pages/icon-material/icon-material.component';
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
import { AppsCalendarComponent } from './pages/apps-calendar/apps-calendar.component';
import { AppsExplorerComponent } from './pages/apps-explorer/apps-explorer.component';
import { AppsMailComponent } from './pages/apps-mail/apps-mail.component';
import { DashboardEdgeComponent } from './pages/dashboard-edge/dashboard-edge.component';
import { AppComponent } from './app.component';

//IMPORTS MODULO SEGURIDAD
import { IniciarSesionComponent } from './Modulo_Seguridad/CU_Iniciar_Sesion/iniciar.sesion.component';
import { PerfilUsuarioComponent } from './Modulo_Seguridad/Perfil_Usuario/perfil.usuario.component';
import { ModificarUsuarioComponent } from './Modulo_Seguridad/CU_Modificar_Usuario/Modificar_Usuario/modificar.usuario.component';
import { RegistrarUsuarioComponent } from './Modulo_Seguridad/CU_Registrar_Usuario/registrar.usuario.component';
import { RecuperarCuentaComponent } from './Modulo_Seguridad/CU_Recuperar_Cuenta/recuperar.cuenta.component';
import { ModificarContraseniaComponent } from './Modulo_Seguridad/CU_Modificar_Usuario/Cambiar_Contrasenia/modificar.contrasenia.component';

//IMPORTS MODULO CONFIGURACION
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

//IMPORTS MODULO CONFIGURACION FINCA
import { HomeFincaDetalleComponent } from './Modulo_Configuracion_Finca/Home_Finca_Detalle/home.finca.detalle.component';
import { SolicitarCreacionFincaComponent } from './Modulo_Configuracion_Finca/CU_Solicitar_Creacion_Finca/solicitar.creacion.finca.component';
import { GestionarFincaComponent } from './Modulo_Configuracion_Finca/CU_Gestionar_Finca/gestionar.finca.component';
import { GestionarUsuarioFincaComponent } from './Modulo_Configuracion_Finca/CU_Gestionar_Usuario_Finca/gestionar.usuario.finca.compontent';
import { ModificarRolUsuarioComponent } from './Modulo_Configuracion_Finca/CU_Gestionar_Usuario_Finca/Modificar_Rol_Usuario_Finca/modificar.rol.usuario.component';
import { AgregarMecanismoRiegoFincaComponent } from './Modulo_Configuracion_Finca/CU_Asignar_Mecanismo_Riego_Finca/Agregar_Mecanismo_Riego_Finca/agregar.mecanismo.riego.finca.component';

//IMPORTS MODULO CONFIGURACION SECTORES
import { HomeSectorComponent } from './Modulo_Configuracion_Sectores/Home_Sector/home.sector.component';
import { GestionarSectorFincaComponent } from './Modulo_Configuracion_Sectores/CU_Gestionar_Sector/gestionar.sector.component';
import { CrearSectorFincaComponent } from './Modulo_Configuracion_Sectores/CU_Crear_Sector/crear.sector.component';
import { AsignarMecanismoRiegoSectorComponent } from './Modulo_Configuracion_Sectores/CU_Asignar_Mecanismo_Riego_Sector/asignar.mecanismo.riego.sector.component';
import { AsignarCultivoSectorComponent } from './Modulo_Configuracion_Sectores/CU_Asignar_Cultivo_Sector/asignar.cultivo.sector.component';
import { AsignarComponenteSensorSectorComponent } from './Modulo_Configuracion_Sectores/CU_Asignar_Componente_Sensor_Sector/asignar.componente.sensor.sector.component';

//IMPORTS MODULO SENSORES
import { CrearSensorComponent } from './Modulo_Sensores/ABM_Sensores/Crear_Sensor/crear.sensor.component';
import { ModificarSensorComponent } from './Modulo_Sensores/ABM_Sensores/Modificar_Sensor/modificar.sensor.component';
import { CrearComponenteSensorComponent } from './Modulo_Sensores/ABM_Componente_Sensor/CU_Crear_Componente_Sensor/crear.componente.sensor.component';
import { GestionarComponenteSensorComponent } from './Modulo_Sensores/ABM_Componente_Sensor/CU_Gestionar_Componente_Sensor/gestionar.componente.sensor.component';
import { HomeComponenteSensorComponent } from './Modulo_Sensores/Home_Componente_Sensor/home.componente.sensor.component';
import { AsignarSensorComponenteSensorComponent } from './Modulo_Sensores/Asignar_Sensor_Componente_Sensor/asignar.sensor.componente.sensor.component';

//IMPORTS MODULO CULTIVO
import { GestionarCultivoSectorComponent } from './Modulo_Cultivo/CU_Gestionar_Cultivo_Sector/gestionar.cultivo.sector.component';

//IMPORTS MODULO CONFIGURACION RIEGO
import { CrearConfiguracionRiegoComponent } from './Modulo_Configuracion_Riego/Gestionar_Configuracion_Riego/CU_Crear_Configuracion_Riego/crear.configuracion.riego.component';
import { HomeConfiguracionRiegoComponent } from './Modulo_Configuracion_Riego/Home_Configuracion_Riego/home.configuracion.riego.component';
import { ModificarConfiguracionRiegoComponent } from './Modulo_Configuracion_Riego/Gestionar_Configuracion_Riego/CU_Modificar_Configuracion_Riego/modificar.configuracion.riego.component';
import { AgregarCriterioInicioComponent } from './Modulo_Configuracion_Riego/Gestionar_Configuracion_Riego/Agregar_Criterio_Inicio/agregar.criterio.inicio.component';
import { AgregarCriterioFinComponent } from './Modulo_Configuracion_Riego/Gestionar_Configuracion_Riego/Agregar_Criterio_Fin/agregar.criterio.fin.component';
import { ModificarCriterioInicialFinalComponent } from './Modulo_Configuracion_Riego/Gestionar_Configuracion_Riego/Modificar_Criterio_Inicial_Final/modificar.criterio.inicial.fincal.component';



//IMPORTS MODULO OBTENCION INFORMACION EXTERNA
import { ModificarProveedorInformacionComponent } from './Modulo_Obtencion_Informacion_Externa/CU_Gestionar_Proveedor_Informacion/Modificar_Proveedor_Informacion/modficar.proveedor.component';
import { CambiarProveedorInformacionComponent } from './Modulo_Obtencion_Informacion_Externa/CU_Gestionar_Proveedor_Informacion/Cambiar_Proveedor_Informacion/cambiar.proveedor.component';

/**
 * Router Setting
 *
 * Write your component (Page) here to load.
 */
export const ROUTES: Routes = [
  // This default is router like '/'.
  /*{
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },*/


  // Emergency loading, need to import component form file.


  //{
  //path: 'dashboard',
  //component: DashboardComponent
  //},
  // Lazy loading, you need to create a module file.
  //
  // 1. Find file dashboard.module.lazy at folder dashboard
  // 2. Rename file dashboard.module.lazy to dashboard.module.ts
  // 3. Modify this file
  //    change Line "component: DashboardComponent" to "loadChildren: './dashboard/dashboard.module#DashboardModule'"
  // 4. Modify file app.module.ts
  //    remove line "DashboardComponent," and "import { DashboardComponent } from './pages/dashboard/dashboard.component';"
  //
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  //MODULO SEGURIDAD
  { path: 'login', component: IniciarSesionComponent },
  { path: 'addUser', component: RegistrarUsuarioComponent, pathMatch: 'full' },
  { path: 'recoverAccount', component: RecuperarCuentaComponent },
  { path: 'profile', component: PerfilUsuarioComponent },
  { path: 'editUser', component: ModificarUsuarioComponent },
  { path: 'changePassword', component: ModificarContraseniaComponent },

  {
    path: 'dashboard',
    component: DashboardComponent
  },

  //MODULO CONFIGURACION
  { path: 'home', component: HomeSistemaComponent },
  { path: 'homeCategory', component: HomeCategoriaComponent },
  { path: 'addCategory', component: RegistrarCategoriaComponent },
  { path: 'homeCategoryDetail/:id_categoria', component: HomeCategoriaDetalleComponent },
  { path: 'editCategory/:id_categoria', component: ModificarCategoriaComponent },
  { path: 'assignSubCategory/:id_categoria', component: AsignarSubCategoriaCategoriaComponent },
  { path: 'assignProductCategory/:id_categoria', component: AsignarProductoCategoriaComponent },

  { path: 'homeSubCategory', component: HomeSubCategoriaComponent },
  { path: 'addSubCategory', component: RegistrarSubCategoriaComponent },
  { path: 'homeSubCategoryDetail/:id_subcategoria', component: HomeSubCategoriaDetalleComponent },
  { path: 'editSubCategory/:id_subcategoria', component: ModificarSubCategoriaComponent },
  { path: 'assignProductSubCategory/:id_subcategoria', component: AsignarProductoSubCategoriaComponent },



  { path: 'homeProduct', component: HomeProductoComponent },
  { path: 'addProduct', component: RegistrarProductoComponent },
  { path: 'homeProductDetail/:id_producto', component: HomeProductoDetalleComponent },
  { path: 'editProduct/:id_producto', component: ModificarProductoComponent },







  //MODULO CONFIGURACION FINCA
  { path: 'homeFincaDetalle', component: HomeFincaDetalleComponent },
  { path: 'crearFinca', component: SolicitarCreacionFincaComponent },
  { path: 'gestionarFinca', component: GestionarFincaComponent },
  { path: 'gestionarUsuarioFinca', component: GestionarUsuarioFincaComponent },
  //{ path:'modificarRolUsuario/:idUsuarioFinca', component: ModificarRolUsuarioComponent},
  { path: 'agregarMecanismoFinca', component: AgregarMecanismoRiegoFincaComponent },

  //MODULO CONFIGURACION SECTORES
  { path: 'homeSector', component: HomeSectorComponent },
  { path: 'crearSectorFinca', component: CrearSectorFincaComponent },
  { path: 'gestionarSectorFinca', component: GestionarSectorFincaComponent },
  { path: 'asignarMecanismoSector', component: AsignarMecanismoRiegoSectorComponent },
  { path: 'asignarCultivo', component: AsignarCultivoSectorComponent },
  { path: 'asignarSensorComponenteSectorFinca', component: AsignarSensorComponenteSensorComponent },
  { path: 'asignarComponenteSector', component: AsignarComponenteSensorSectorComponent },

  //MODULO SENSORES
  { path: 'crearSensorFinca', component: CrearSensorComponent },
  { path: 'modificarSensorFinca', component: ModificarSensorComponent },
  { path: 'crearComponenteSensorFinca', component: CrearComponenteSensorComponent },
  { path: 'modificarComponenteSensorFinca', component: GestionarComponenteSensorComponent },
  { path: 'homeComponenteSensorFinca', component: HomeComponenteSensorComponent },
  { path: 'asignarSensorComponente', component: AsignarSensorComponenteSensorComponent },

  //MODULO OBTENCION INFORMACION EXTERNA
  { path: 'gestionarProveedor', component: ModificarProveedorInformacionComponent },
  { path: 'cambiarProveedor', component: CambiarProveedorInformacionComponent },


  //MODULO CONFIGURACION RIEGO
  { path: 'crearConfiguracionRiego', component: CrearConfiguracionRiegoComponent },
  { path: 'homeConfiguracionRiego', component: HomeConfiguracionRiegoComponent },
  { path: 'gestionarConfiguracionRiego', component: ModificarConfiguracionRiegoComponent },
  { path: 'agregarCriterioInicial', component: AgregarCriterioInicioComponent },
  { path: 'agregarCriterioFinal', component: AgregarCriterioFinComponent },
  { path: 'gestionarCriterioRiego', component: ModificarCriterioInicialFinalComponent },



  //MODULO CULTIVOS
  { path: 'gestionarCultivoSector', component: GestionarCultivoSectorComponent },


  {
    path: 'dashboard-edge',
    component: DashboardEdgeComponent
  },
  {
    path: 'component-buttons',
    component: ComponentButtonsComponent
  },
  {
    path: 'component-progress',
    component: ComponentProgressComponent
  },
  {
    path: 'component-card',
    component: ComponentCardComponent
  },
  {
    path: 'component-bootstrap',
    component: ComponentBootstrapComponent
  },
  {
    path: 'component-dialog',
    component: ComponentDialogComponent
  },
  {
    path: 'component-notifications',
    component: ComponentNotificationsComponent
  },
  {
    path: 'radio-button',
    component: ComponentRadioButtonComponent
  },
  {
    path: 'component-checkbox',
    component: ComponentCheckboxComponent
  },
  {
    path: 'component-chips',
    component: ComponentChipsComponent
  },
  {
    path: 'component-date-picker',
    component: ComponentDatePickerComponent
  },
  {
    path: 'component-list',
    component: ComponentListComponent
  },
  {
    path: 'component-media-player',
    component: ComponentMediaPlayerComponent
  },
  {
    path: 'component-menu',
    component: ComponentMenuComponent
  },
  {
    path: 'component-grid-list',
    component: ComponentGridListComponent
  },
  {
    path: 'component-select',
    component: ComponentSelectComponent
  },
  {
    path: 'component-slide-toggle',
    component: ComponentSlideToggleComponent
  },
  {
    path: 'component-slider',
    component: ComponentSliderComponent
  },
  {
    path: 'component-tabs',
    component: ComponentTabsComponent
  },
  {
    path: 'component-text-editor',
    component: ComponentTextEditorComponent
  },
  {
    path: 'component-toolbar',
    component: ComponentToolbarComponent
  },
  {
    path: 'component-tooltip',
    component: ComponentTooltipComponent
  },
  {
    path: 'component-radio-button',
    component: ComponentRadioButtonComponent
  },
  {
    path: 'icon-material',
    component: IconMaterialComponent
  },
  {
    path: 'icon-weather',
    component: IconWeatherComponent
  },
  {
    path: 'icon-fontawesome',
    component: IconFontawesomeComponent
  },

  {
    path: 'forms-validation',
    component: FormsValidationComponent
  },
  {
    path: 'forms-wizard',
    component: FormsWizardComponent
  },
  {
    path: 'forms-autocomplete',
    component: FormsAutocompleteComponent
  },
  {
    path: 'forms-upload',
    component: FormsUploadComponent
  },
  {
    path: 'forms-tree',
    component: FormsTreeComponent
  },
  {
    path: 'tables-basic',
    component: TablesBasicComponent
  },
  {
    path: 'tables-dynamic',
    component: TablesDynamicComponent
  },
  {
    path: 'charts-chartjs',
    component: ChartsChartjsComponent
  },
  {
    path: 'charts-peity',
    component: ChartsPeityComponent
  },
  {
    path: 'widgets',
    component: WidgetsComponent
  },
  {
    path: 'layout-flex',
    component: LayoutFlexComponent
  },
  {
    path: 'layout-tabs',
    component: LayoutTabsComponent
  },
  {
    path: 'layout-edges',
    component: LayoutEdgesComponent
  },
  {
    path: 'layout-cards',
    component: LayoutCardsComponent
  },
  {
    path: 'layout-fullscreen',
    component: LayoutFullscreenComponent
  },
  {
    path: 'pages-error',
    component: PagesErrorComponent
  },
  {
    path: 'pages-lockscreen',
    component: PagesLockscreenComponent
  },
  {
    path: 'pages-invoice',
    component: PagesInvoiceComponent
  },
  {
    path: 'pages-notfound',
    component: PagesNotfoundComponent
  },


  {
    path: 'apps-calendar',
    component: AppsCalendarComponent
  },
  {
    path: 'apps-explorer',
    component: AppsExplorerComponent
  },
  {
    path: 'apps-mail',
    component: AppsMailComponent
  }



];

export const routing: ModuleWithProviders = RouterModule.forRoot(ROUTES);