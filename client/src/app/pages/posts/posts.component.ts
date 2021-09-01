import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { PostsService } from 'src/app/services/posts.service';
import { Post } from 'src/app/types/post.types';

@UntilDestroy()
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
})
export class PostsComponent implements OnInit {
  public posts: Post[] = [];

  constructor(private readonly postsService: PostsService) {}

  ngOnInit() {
    this.getPosts();
  }

  private getPosts(): void {
    this.postsService.posts$
      .pipe(untilDestroyed(this))
      .subscribe((data: Post[]) => (this.posts = data));
  }
}
