import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes, ExtraOptions } from '@angular/router';
import { LocationComponent } from './components/location/location.component';
import { SingleLocationComponent } from './components/location/single-location/single-location.component';
import { SingleLocationResolver } from './components/location/single-location/single-location.resolver.service';
import { SingleFoodTruckComponent } from './components/food-truck/single-food-truck/single-food-truck.component';
import { SingleFoodTruckResolver } from './components/food-truck/single-food-truck/single-food-truck.resolver';
import { LoginComponent } from './auth/signin/login.component';
import { AuthGuard } from './auth/auth-guard.service';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LocationOverviewComponent } from './components/location/single-location/location-overview/location-overview.component';
import { LocationEventsComponent } from './components/location/single-location/location-events/location-events.component';
import { LocationMenuComponent } from './components/location/single-location/location-menu/location-menu.component';
import { SignupComponent } from './auth/signup/signup.component';
import { FrontComponent } from './Front/Front.component';
import { ForgetpasswordComponent } from './auth/forgetpassword/forgetpassword.component';
import { ChangepasswordComponent } from './auth/forgetpassword/changepassword/changepassword.component';
import { ConfirmaccountComponent } from './auth/confirmaccount/confirmaccount.component';
import { MapViewComponent } from './components/view-locations/map-view/map-view.component';
import { ViewLocationsComponent } from './components/view-locations/view-locations.component';
import { BeerResolver } from './components/beer/beer.resolver.server';
import { BeerComponent } from './components/beer/beer.component';
import { UpgradeMembershipComponent } from './components/upgrade-membership/upgrade-membership.component';
import { MembershipThankYouComponent } from './components/upgrade-membership/membership-thank-you/membership-thank-you.component';
import { MembershipSalesComponent } from './components/upgrade-membership/membership-sales/membership-sales.component';
import { MembershipCardInfoComponent } from './components/upgrade-membership/membership-card-info/membership-card-info.component';
import { FoodTruckOverviewComponent } from './components/food-truck/single-food-truck/food-truck-overview/food-truck-overview.component';
import { FoodTruckMenuComponent } from './components/food-truck/single-food-truck/food-truck-menu/food-truck-menu.component';
import { FoodTruckCalendarComponent } from './components/food-truck/single-food-truck/food-truck-calendar/food-truck-calendar.component';
import { YourbeerComponent } from './components/yourbeer/yourbeer.component';
import { BeerinfoComponent } from './components/beerinfo/beerinfo.component';
import { MaininfoComponent } from './components/maininfo/maininfo.component';
import { NeweventComponent } from './components/newevent/newevent.component';
import {MatButtonModule} from '@angular/material/button';
import { EventsComponent } from './components/events/events.component';
import { NewfoodtruckComponent } from './components/newfoodtruck/newfoodtruck.component';

const routes: Routes = [ 

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'yourbeer', component: YourbeerComponent }, 
  { path: 'beerinfo/:beer', component: BeerinfoComponent },
  { path: 'maininfo', component: MaininfoComponent },
  { path: 'newevent', component: NeweventComponent },
  { path: 'events', component: EventsComponent},
  { path: 'newfoodtruck', component: NewfoodtruckComponent},





  { path: 'user', component: ProfileComponent },
  { path: 'search', component: ViewLocationsComponent,
    children : [
      { path: '', redirectTo: 'list-view', pathMatch: 'full' },
      { path: 'list-view', component: LocationComponent },
      { path: 'map-view', component: MapViewComponent },
    ]
   },
  { path: 'login', component: FrontComponent,
    children: [
      { path: '', component: LoginComponent },
      { path: 'registration', component: SignupComponent }
    ]
  },
  {
    path: 'upgrade', component: UpgradeMembershipComponent, canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'why-upgrade', pathMatch: 'full' },
      { path: 'why-upgrade', component: MembershipSalesComponent },
      { path: 'card-info', component: MembershipCardInfoComponent },
      { path: 'thank-you', component: MembershipThankYouComponent }
    ]
  },
  { path: 'register', component: SignupComponent },
  { path: 'resetpassword', component: ForgetpasswordComponent },
  { path: 'recoverypassword', component: ChangepasswordComponent },
  { path: 'confirm', component: ConfirmaccountComponent },
  {
    path: 'brewery/:id',
    component: SingleLocationComponent,
    resolve: { location: SingleLocationResolver },
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview', component: LocationOverviewComponent },
      { path: 'menu', component: LocationMenuComponent },
      { path: 'events', component: LocationEventsComponent }
    ]
  },
  {
    path: 'beer/:id',
    component: BeerComponent,
    resolve: {beer: BeerResolver}
  },
  {
    path: 'food-truck/:id',
    component: SingleFoodTruckComponent,
    resolve: { foodTruck: SingleFoodTruckResolver },
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview', component: FoodTruckOverviewComponent },
      { path: 'menu', component: FoodTruckMenuComponent },
      { path: 'calendar', component: FoodTruckCalendarComponent }
    ]
  },
  
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'}
  )],
  providers: [SingleLocationResolver, SingleFoodTruckResolver, BeerResolver]
})
export class AppRoutingModule { }
