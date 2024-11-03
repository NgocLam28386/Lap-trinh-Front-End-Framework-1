import { Component, inject } from '@angular/core';
import { Product, ProductService } from '../../service/product.service';
import { HotToastService } from '@ngneat/hot-toast';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-product',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.css',
})
export class ListProductComponent {
  products: Product[] = [];
  productService = inject(ProductService);

  toast = inject(HotToastService);

  ngOnInit() {
    this.productService.getAll().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (e) => this.toast.error('Error' + e.message),
    });
  }
  handleDelete(id: string | number) {
    if (confirm('Do you want delete product?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          this.toast.success('Done');
          location.reload();
        },
        error: (e) => this.toast.error('Error'),
      });
    }
  }
}
