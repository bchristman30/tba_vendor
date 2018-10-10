import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppComponent } from './app.component';
import { BeerComponent } from './components/beer/beer.component';
import { BeerService } from './services/beer.service';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SignupComponent } from './auth/signup/signup.component';
import { LocationService } from './components/location/location.service';
import { LocationComponent } from './components/location/location.component';
import { SingleLocationComponent } from './components/location/single-location/single-location.component';
import { AppRoutingModule } from './app-routing.module';

import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FoodTruckService } from './components/food-truck/food-truck.service';
import { SingleFoodTruckComponent } from './components/food-truck/single-food-truck/single-food-truck.component';
import { LoginComponent } from './auth/signin/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './auth/auth.service';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AuthGuard } from './auth/auth-guard.service';


import {MatSidenavModule} from '@angular/material/sidenav';
import {MatRadioModule} from '@angular/material/radio';
import {MatButtonModule} from '@angular/material/button';

import { ToastrModule } from 'ngx-toastr';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FooterComponent } from './components/footer/footer.component';
import { LocationOverviewComponent,
        DialogRedeemStampComponent
      } from './components/location/single-location/location-overview/location-overview.component';
import { LocationMenuComponent } from './components/location/single-location/location-menu/location-menu.component';
import { LocationEventsComponent } from './components/location/single-location/location-events/location-events.component';

import { NgxSpinnerModule } from 'ngx-spinner';
import { EventCardSquareComponent } from './components/event-card-square/event-card-square.component';
import { StartupService } from './startup.service';
import { MaterialModule } from './shared/modules/material.module';
import {MatChipsModule} from '@angular/material/chips';

import { HeaderComponent } from './components/header/header.component';
import { BeerCardComponent } from './components/cards/beer-card/beer-card.component';
import { Dialogbox } from './dialogbox/dialog.component';
import { FrontComponent } from './Front/Front.component';
import { ChangepasswordComponent } from './auth/forgetpassword/changepassword/changepassword.component';
import { ForgetpasswordComponent } from './auth/forgetpassword/forgetpassword.component';
import { ConfirmaccountComponent } from './auth/confirmaccount/confirmaccount.component';
import { environment } from '../environments/environment';
import { ViewLocationsComponent } from './components/view-locations/view-locations.component';
import { MapViewComponent } from './components/view-locations/map-view/map-view.component';
import { CalendarModule } from 'angular-calendar';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FlatpickrModule } from 'angularx-flatpickr';
import { AgmCoreModule } from '@agm/core';
import { ImgFallbackModule } from 'ngx-img-fallback';
import { HeaderService } from './components/header/header.service';
import { ReviewCardComponent } from './components/cards/review-card/review-card.component';
import { BottomsheetComponent } from './bottomsheet/bottomsheet.component';
import { LayoutModule } from '@angular/cdk/layout';
import { BreakpointService } from './services/breakpoint.service';
import { HeaderDesktopComponent } from './components/header/header-desktop/header-desktop.component';
// tslint:disable-next-line:max-line-length
import { SingleLocationDesktopComponent } from './components/location/single-location/single-location-desktop/single-location-desktop.component';
import { HomeDesktopComponent } from './components/home/home-desktop/home-desktop.component';
import { DesktopSidebarComponent } from './components/desktop-sidebar/desktop-sidebar.component';
import { DialogUpgradePaidComponent } from './components/dialogs/dialog-upgrade-paid/dialog-upgrade-paid.component';
import { UpgradeMembershipComponent } from './components/upgrade-membership/upgrade-membership.component';
import { PaymentService } from './services/payment.service';
import { MembershipThankYouComponent } from './components/upgrade-membership/membership-thank-you/membership-thank-you.component';
import { MembershipSalesComponent } from './components/upgrade-membership/membership-sales/membership-sales.component';
import { MembershipCardInfoComponent } from './components/upgrade-membership/membership-card-info/membership-card-info.component';
import { DialogTermsOfServiceComponent } from './components/dialogs/dialog-terms-of-service/dialog-terms-of-service.component';
import { CalendarEventCardComponent } from './components/cards/calendar-event-card/calendar-event-card.component';
import { UIService } from './shared/snackbar/Ui.service';
import { FoodTruckOverviewComponent } from './components/food-truck/single-food-truck/food-truck-overview/food-truck-overview.component';
import { FoodTruckMenuComponent } from './components/food-truck/single-food-truck/food-truck-menu/food-truck-menu.component';
import { FoodTruckCalendarComponent } from './components/food-truck/single-food-truck/food-truck-calendar/food-truck-calendar.component';
import { MenuItemCardComponent } from './components/cards/menu-item-card/menu-item-card.component';
import { CarouselModule, WavesModule, ButtonsModule } from 'angular-bootstrap-md';
import { YourbeerComponent } from './components/yourbeer/yourbeer.component';
import { BeerinfoComponent } from './components/beerinfo/beerinfo.component';
import { MaininfoComponent } from './components/maininfo/maininfo.component';
import { NeweventComponent } from './components/newevent/newevent.component';
import { EventsComponent } from './components/events/events.component';
import { NewfoodtruckComponent } from './components/newfoodtruck/newfoodtruck.component';




export function init_app(appLoadService: StartupService) {
  return () => appLoadService.initializeApp();
}

@NgModule({
    declarations: [
      AppComponent,
      BeerComponent,
      LoginComponent,
      SignupComponent,
      LocationComponent,
      SingleLocationComponent,
      SingleFoodTruckComponent,
      LoginComponent,
      HomeComponent,
      ProfileComponent,
      FooterComponent,
      LocationOverviewComponent,
      LocationMenuComponent,
      DialogRedeemStampComponent,
      LocationEventsComponent, 
      EventCardSquareComponent,
      HeaderComponent,
      BeerCardComponent,
      Dialogbox,
      FrontComponent,
      ConfirmaccountComponent,
      ForgetpasswordComponent,
      ChangepasswordComponent,
      ViewLocationsComponent,
      MapViewComponent,
      ReviewCardComponent,
      BottomsheetComponent,
      HeaderDesktopComponent,
      SingleLocationDesktopComponent,
      HomeDesktopComponent,
      DesktopSidebarComponent,
      DialogUpgradePaidComponent,
      UpgradeMembershipComponent,
      MembershipThankYouComponent,
      MembershipSalesComponent,
      MembershipCardInfoComponent,
      DialogTermsOfServiceComponent,
      CalendarEventCardComponent,
      FoodTruckOverviewComponent,
      FoodTruckMenuComponent, 
      FoodTruckCalendarComponent,
      MenuItemCardComponent,
      YourbeerComponent,
      BeerinfoComponent,
      MaininfoComponent,
      NeweventComponent,
      EventsComponent,
      NewfoodtruckComponent,
      
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatChipsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgxSpinnerModule,
    ToastrModule.forRoot(),
    CalendarModule.forRoot(),
    NgbModule.forRoot(),
    FlatpickrModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCio99CAZ4YsFvtIccZKjM47yeksAr1ooM'
    }),
    ImgFallbackModule,
    LayoutModule,
    CarouselModule,
    WavesModule,
    ButtonsModule,
    MatSidenavModule,
    MatRadioModule,
    MatButtonModule
  ],
  providers: [
    UIService,
    BeerService,
    LocationService,
    FoodTruckService,
    AuthService,
    StartupService,
    BreakpointService,
    PaymentService,
    HeaderService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    { provide: APP_INITIALIZER,
      useFactory: init_app,
      deps: [StartupService],
      multi: true
    },
    AuthGuard
  ],
  entryComponents: [
    Dialogbox,
    DialogRedeemStampComponent,
    DialogUpgradePaidComponent,
    DialogTermsOfServiceComponent,
    BottomsheetComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
