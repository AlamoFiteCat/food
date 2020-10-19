// [Environment]
import { environment } from '../environments/environment';

// [Modules]
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { MaterialModule } from './modules/material/material.module';
import { AppRoutingModule } from './modules/app-routing/app-routing.module';

// [Components]
import { AppComponent } from './app.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { LoginComponent } from './components/auth/login/login.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { PostsComponent } from './components/pages/posts/posts.component';
import { PostComponent } from './components/pages/post/post.component';
import { CommentComponent } from './components/pages/comment/comment.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    HeaderComponent,
    PostsComponent,
    PostComponent,
    CommentComponent,
    WelcomeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    MaterialModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
