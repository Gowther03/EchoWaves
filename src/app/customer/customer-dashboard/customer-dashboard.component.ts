import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css']
})
export class CustomerDashboardComponent implements AfterViewInit {
  customerName: string = 'John Doe';
  @ViewChild('womensCarousel') carouselElement!:ElementRef;

  constructor(private router: Router) {}

  navigateToEditProfile() {
    this.router.navigateByUrl('/CustomerDashboard/:userName/EditProfile');
  }
  ngAfterViewInit(): void {
    const carousel = this.carouselElement.nativeElement;
    const carouselInner = carousel.querySelector('.carousel-inner') as HTMLElement;
    const nextButton = carousel.querySelector('.carousel-control-next') as HTMLElement;
    const prevButton = carousel.querySelector('.carousel-control-prev') as HTMLElement;

    // Get all the images inside the carousel
    const items: HTMLElement[] = Array.from(carouselInner.querySelectorAll('.d-block')) as HTMLElement[];
    const visibleItems = 3; // Number of visible images
    let currentIndex = 0;

    // Function to update the visible images
    const updateCarousel = () => {
      items.forEach((item, index) => {
        if (index >= currentIndex && index < currentIndex + visibleItems) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    };

    // Initialize the carousel
    updateCarousel();

    // Event listener for the "Next" button
    nextButton.addEventListener('click', () => {
      if (currentIndex + visibleItems < items.length) {
        currentIndex++;
        updateCarousel();
      }
    });

    // Event listener for the "Previous" button
    prevButton.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
      }
    });
  }
}
