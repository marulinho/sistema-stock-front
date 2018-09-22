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
import { HomeListaPrecioComponent } from './Modulo_Configuracion/Home_ListaPrecio/home.listaprecio.component';
import { RegistrarListaPrecioComponent } from './Modulo_Configuracion/Home_ListaPrecio/CU_Registrar_ListaPrecio/registrar.listaprecio.component';
import { HomeComboComponent } from './Modulo_Configuracion/Home_Combo/home.combo.component';
import { HomeComboDetalleComponent } from './Modulo_Configuracion/Home_Combo_Detalle/home.combo.detalle.component';
import { RegistrarComboComponent } from './Modulo_Configuracion/Home_Combo/CU_Registrar_Combo/registrar.combo.component';
import { ModificarComboComponent } from './Modulo_Configuracion/Home_Combo_Detalle/CU_Modificar_Combo/modificar.combo.component';

//IMPORTS MODULO FINANZAS
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
  { path: 'homePriceList', component: HomeListaPrecioComponent },
  { path: 'addPriceList', component: RegistrarListaPrecioComponent },
  { path: 'homeCombo', component: HomeComboComponent },
  { path: 'homeComboDetail/:id_combo', component: HomeComboDetalleComponent },
  { path: 'addCombo', component: RegistrarComboComponent },
  { path: 'editCombo/:id_combo', component: ModificarComboComponent },
  
  //MODULO FINANZAS
  { path: 'homeCash', component: HomeCajaComponent },
  { path: 'homeBuy', component: HomeCompraComponent },
  { path: 'homeBuyDetail/:id_compra', component: HomeCompraDetalleComponent },
  { path: 'addBuy', component: RegistrarCompraComponent },
  { path: 'homeWithdraw', component: HomeRetiroComponent },
  { path: 'homeWithdrawDetail/:id_retiro', component: HomeRetiroDetalleComponent },
  { path: 'addWithdraw', component: RegistrarRetiroComponent },
  { path: 'homeMove', component: HomeRemitoComponent },
  { path: 'homeMoveDetail/:id_remito', component: HomeRemitoDetalleComponent },
  { path: 'addMove', component: RegistrarRemitoComponent },
  { path: 'homeSell', component: HomeVentaComponent },
  { path: 'homeSellDetail/:id_venta', component: HomeVentaDetalleComponent },
  { path: 'addSell', component: RegistrarVentaComponent },
  


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