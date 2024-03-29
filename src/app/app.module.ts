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
import {SignUpModule} from "./sign-up/sign-up.module";
import {AuthInterceptor} from "./providers/auth-interceptor";
import {UserModule} from "./user/user.module";
import {appInitializerProviders} from './core/initializer/app.initializer';
import {SidebarComponent} from "./sidebar/sidebar.component";
import {WorkspaceCurrentComponent} from './sidebar/workspace/workspace-current/workspace-current.component';
import {MatMenuModule} from "@angular/material/menu";
import {OverlayModule} from "@angular/cdk/overlay";
import {WorkspaceComponent} from './workspace/workspace.component';
import {CoreModule} from "./core/core.module";
import {TeamCurrentComponent} from './sidebar/team/team-current/team-current.component';
import {TeamPromptsComponent} from './sidebar/team/team-prompts/team-prompts.component';
import {MatDialogModule} from "@angular/material/dialog";

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    WorkspaceCurrentComponent,
    WorkspaceComponent,
    TeamCurrentComponent,
    TeamPromptsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    MatListModule,
    SignUpModule,
    UserModule,
    MatMenuModule,
    OverlayModule,
    CoreModule,
    MatDialogModule
  ],
  providers: [
    appInitializerProviders,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
