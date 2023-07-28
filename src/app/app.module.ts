import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from "@angular/material/list";
import {MatToolbarModule} from '@angular/material/toolbar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {WelcomeModule} from "./welcome/welcome.module";
import {SignUpModule} from "./sign-up/sign-up.module";
import {AuthInterceptor} from "./providers/auth-interceptor";
import {UserModule} from "./user/user.module";
import {appInitializerProviders} from './core/initializer/app.initializer';
import {SidebarComponent} from "./sidebar/sidebar.component";
import {WorkspaceCurrentComponent} from './sidebar/workspace/workspace-current/workspace-current.component';
import {MatMenuModule} from "@angular/material/menu";
import {OverlayModule} from "@angular/cdk/overlay";
import { WorkspaceComponent } from './workspace/workspace.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    WorkspaceCurrentComponent,
    WorkspaceComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    WelcomeModule,
    MatListModule,
    SignUpModule,
    UserModule,
    MatMenuModule,
    OverlayModule
  ],
  providers: [
    appInitializerProviders,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
