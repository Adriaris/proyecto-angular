import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './guards/auth.guard'; // Importa el guard de ruta
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { ErrorComponent } from './components/error/error.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ContactComponent } from './components/contact/contact.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { PerfilcrudComponent } from './components/perfilcrud/perfilcrud.component';
import { ChatComponent } from './components/chat/chat.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { TermsAndConditionsComponent } from './components/terms-and-conditions/terms-and-conditions.component';
import { ProfileImageUploadComponent } from './components/profile-image-upload/profile-image-upload.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutusComponent,
    ErrorComponent,
    LoginComponent,
    RegisterComponent,
    ContactComponent,
    HeaderComponent,
    FooterComponent,
    PerfilComponent,
    PerfilcrudComponent,
    ChatComponent,
    PrivacyPolicyComponent,
    TermsAndConditionsComponent,
    ProfileImageUploadComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [AuthGuard // Agrega el guard de ruta como un provider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
