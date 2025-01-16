import { ViewportScroller } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild, Renderer2, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css']
})
export class CustomerDashboardComponent implements AfterViewInit,OnInit {
  picture = localStorage.getItem('picture');
  userName = localStorage.getItem('userName');
  searchForm: FormGroup;

  @ViewChild('womensCarousel', { static: false }) carouselElement!: ElementRef;

  constructor(private router: Router, public loginService: LoginService, private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      searchQuery: ['']  // Initialize searchQuery form control
    });
  }
  ngOnInit(): void {
    // Scroll to the categories section after a delay
    setTimeout(() => {
      const element = document.getElementById('categoriesSection');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        console.error('Element with ID "categoriesSection" not found.');
      }
    }, 5000); // Adjust delay in milliseconds (5000 = 5 seconds)
  }


  ngAfterViewInit(): void {
    const carousel = this.carouselElement.nativeElement;
    const carouselInner = carousel.querySelector('.carousel-inner') as HTMLElement;
    const nextButton = carousel.querySelector('.carousel-control-next') as HTMLElement;
    const prevButton = carousel.querySelector('.carousel-control-prev') as HTMLElement;
     // Adjust the delay to match the typewriter animation duration
    
  


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
  navbarColor = '#b9aedc';  // Default color

  changeColor(color: string) {
    this.navbarColor = color;
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('picture');
    localStorage.removeItem('cartId');
    this.userName = "";
    this.router.navigateByUrl('/');
  }


  onSearch(): void {
    const searchQuery = this.searchForm.get('searchQuery')?.value;
    if (searchQuery) {
      this.router.navigate(['CustomerDashboard/:userName/search'], { queryParams: { query: searchQuery } });
    }
  }
  onLogout(): void {
    this.loginService.logout();
    // Additional logout logic if required
  }
}

