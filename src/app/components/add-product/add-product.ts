import { CommonModule } from '@angular/common';
import {
  AfterContentChecked,
  AfterContentInit,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../../services/product.service';

@Component({
  selector: 'app-add-product',
  imports: [ReactiveFormsModule, CommonModule], // Make sure CommonModule is included
  templateUrl: './add-product.html',
  styleUrls: ['./add-product.css'],
})
export class AddProduct implements OnInit, OnDestroy, AfterContentInit, AfterContentChecked {
  productForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    // Initialize the form in constructor
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: ['', [Validators.required, Validators.min(0.01)]],
      quantity: ['', [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
    });
  }

  @Output() add = new EventEmitter<Product>();

  ngOnInit(): void {
    console.log('Add Product Component Initialized');
  }

  ngDoCheck(): void {
    console.log('Add Product Component Checked');
  }

  ngAfterContentInit(): void {
    console.log('Add Product Component Content Initialized');
  }

  ngAfterContentChecked(): void {
    console.log('Add Product Component Content Checked');
  }

  ngOnDestroy(): void {
    console.log('Add Product Component Destroyed');
  }

  // Helper method to check if a field is invalid and should show errors
  isFieldInvalid(fieldName: string): boolean {
    const field = this.productForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  // Helper method to check specific error type
  hasError(fieldName: string, errorType: string): boolean {
    const field = this.productForm.get(fieldName);
    return !!(field && field.hasError(errorType) && (field.dirty || field.touched));
  }

  // Mark all fields as touched to show validation errors
  markAllFieldsAsTouched(): void {
    Object.keys(this.productForm.controls).forEach((key) => {
      const control = this.productForm.get(key);
      if (control) {
        control.markAsTouched();
        control.markAsDirty();
      }
    });
  }

  onSubmit(): void {
    console.log('Form submitted');
    this.markAllFieldsAsTouched();
    if (this.productForm.valid) {
      const product: Product = this.productForm.value;
      this.add.emit(product);
      alert('Product added successfully!');
      this.productForm.reset();
    } else {
      console.log('Form is invalid');
      console.log('Form errors:', this.getFormErrors());
    }
  }

  onReset(): void {
    this.productForm.reset();
    console.log('Form reset');
  }

  private getFormErrors(): any {
    const errors: any = {};
    Object.keys(this.productForm.controls).forEach((key) => {
      const control = this.productForm.get(key);
      if (control && control.errors) {
        errors[key] = control.errors;
      }
    });
    return errors;
  }

  onExit(): void {
    this.router.navigate(['/products']);
  }
}
