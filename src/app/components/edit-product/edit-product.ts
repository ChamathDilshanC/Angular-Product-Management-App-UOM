import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import type { Product } from '../../services/product.service';

@Component({
  selector: 'app-edit-product',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-product.html',
  styleUrls: ['./edit-product.css'],
})
export class EditProduct {
  @Input() product?: Product;
  @Input() index?: number;
  @Output() update = new EventEmitter<{ index: number; product: Product }>();

  productForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      name: [''],
      price: [''],
      quantity: [''],
      category: [''],
    });
  }

  ngOnChanges() {
    if (this.product) {
      this.productForm.patchValue(this.product);
    }
  }

  onUpdateProduct() {
    if (typeof this.index === 'number') {
      this.update.emit({ index: this.index, product: this.productForm.value });
    }
  }

  onCancel(): void {
    this.productForm.reset();
    console.log('Form cancelled and reset');
  }
}
