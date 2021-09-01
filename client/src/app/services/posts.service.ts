import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Post } from '../types/post.types';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  public posts$ = new BehaviorSubject<Post[]>([]);

  constructor(private readonly http: HttpClient) {
    this.getPosts();
  }

  public fetchPost(id: number): Observable<Object> {
    return this.http.get(`api/post/${id}`).pipe(
      catchError((err: ErrorEvent) => {
        alert(`error getting post with id ${id}: ${err.message}`);
        return of(null);
      })
    );
  }

  private getPosts(): void {
    this.http.get('api/posts').subscribe(
      (posts: Post[]) => this.posts$.next(posts),
      (err: ErrorEvent) => alert(`Error getting posts: ${err.message}`)
    );
  }
}
