import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { ActivatedRoute, Router, RouterLinkActive } from '@angular/router';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css',
})
export class EditProductComponent {
  productId = null;
  editForm: FormGroup = new FormGroup({
    category: new FormControl(''),
    title: new FormControl(''),
    price: new FormControl(''),
    description: new FormControl(''),
    image: new FormControl(''),
  });
  route = inject(ActivatedRoute);
  productService = inject(ProductService);
  toast = inject(HotToastService);
  router = inject(Router);
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.productId = params['id'];
      this.productService.getProductDetail(params['id']).subscribe({
        next: (data) => {
          this.toast.success('Lấy sản phẩm thành công');
          this.editForm.patchValue(data);
        },
        error: () => {
          this.toast.error('Lấy sản phẩm thất bại');
        },
      });
    });
  }
  handleSubmit() {
    if (!this.productId) return;
    this.productService
      .editProduct(this.productId, this.editForm.value)
      .subscribe({
        next: () => {
          this.toast.success('Cập nhật thành công');
          this.router.navigateByUrl('/product/list');
        },
        error: () => {
          this.toast.error('Cập nhật thất bại');
        },
      });
  }
}
