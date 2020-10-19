// [Modules]
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PostComponent } from '../../components/pages/post/post.component';

// [Components]

const routes: Routes = [{ path: '', component: PostComponent }];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostRoutingModule {}
