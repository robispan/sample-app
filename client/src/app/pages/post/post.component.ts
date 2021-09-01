import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { PostsService } from 'src/app/services/posts.service';
import { Post } from 'src/app/types/post.types';

@UntilDestroy()
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
})
export class PostComponent implements OnInit {
  public post: Post;

  constructor(
    private readonly postsService: PostsService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(untilDestroyed(this)).subscribe((params) => {
      this.postsService.fetchPost(params.id).subscribe((post: Post) => {
        this.post = post;
      });
    });
  }
}
