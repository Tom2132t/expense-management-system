import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterModule],
  template: `<div
    class="flex flex-col items-center justify-center h-screen text-center"
  >
    <h1 class="text-9xl font-extrabold text-red-500">404</h1>
    <p class="mt-4 text-2xl font-medium">
      Oops! The page you're looking for doesn't exist.
    </p>
    <a
      routerLink="/login"
      class="mt-6 px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md focus:ring-4 focus:ring-blue-300"
    >
      Go Back Home
    </a>
  </div> `,
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotFoundComponent {}
