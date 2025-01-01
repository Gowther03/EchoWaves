import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  addProductForm: FormGroup | any;
  selectedImages: File[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Initialize the form with form controls and validation
    this.addProductForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      type: ['', [Validators.required, Validators.maxLength(50)]],
      price: ['', [Validators.required, Validators.min(1)]],
      category: ['', [Validators.required, Validators.maxLength(50)]],
      stock: ['', [Validators.required, Validators.min(1)]],
      images: [''],  // File input, will be handled in a different way
      description: ['', [Validators.required, Validators.maxLength(500)]],
    });
  }

  onSubmit(): void {
    if (this.addProductForm.valid) {
      // Handle form submission here
      console.log(this.addProductForm.value);
      console.log(this.selectedImages);  // Show selected images for upload
    } else {
      // Display error or handle invalid form
      console.log('Form is invalid');
    }
  }

  // Handle file input (images)
  onFileSelect(event: any): void {
    const files = event.target.files;
    this.selectedImages = Array.from(files);
  }
}
