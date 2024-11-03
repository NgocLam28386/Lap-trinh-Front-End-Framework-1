import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductService } from '../../service/product.service';
import { HotToastService } from '@ngneat/hot-toast';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export class AddProductComponent {
  addForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required, Validators.min(1)]),
    category: new FormControl('', [Validators.required]),
  });
  get title() {
    return this.addForm.get('title');
  }
  get description() {
    return this.addForm.get('description');
  }
  get image() {
    return this.addForm.get('image');
  }
  get price() {
    return this.addForm.get('price');
  }
  get category() {
    return this.addForm.get('category');
  }
  productService = inject(ProductService);
  toast = inject(HotToastService);
  router = inject(Router);

  handleSubmit() {
    if (this.addForm.invalid) {
      this.toast.error('Check error');
      return;
    }
    this.productService.addProduct(this.addForm.value).subscribe({
      next: (data) => {
        this.toast.success('Add Product success');
        this.router.navigateByUrl('/product/list');
      },
      error: () => {
        this.toast.error('Fail');
      },
    });
  }
}
