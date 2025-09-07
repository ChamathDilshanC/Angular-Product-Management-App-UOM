import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Products } from './components/products/products';
import { ReactiveFormsModule ,FormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Products, ReactiveFormsModule, FormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {
  protected readonly title = signal('Smart Grocery App');
  protected readonly subtitle = signal('Your one-stop shop for fresh groceries!');
}
