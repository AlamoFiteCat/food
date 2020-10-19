// [Modules]
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthRoutingModule } from '../auth-routing/auth-routing.module';

// [Components]
import { WelcomeComponent } from '../../components/welcome/welcome.component';
import { PostsComponent } from '../../components/pages/posts/posts.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'posts', component: PostsComponent },
  {
    path: 'posts/:id',
    loadChildren: () => import('../post/post.module').then((m) => m.PostModule),
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes), AuthRoutingModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
