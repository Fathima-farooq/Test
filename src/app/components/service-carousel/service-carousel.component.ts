import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  HostListener,
  EventEmitter,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';

interface ServiceItem {
  name: string;
  image: string;
  isActive: boolean;
}

@Component({
  selector: 'app-service-carousel',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="carousel-container">
      <button
        class="nav-button prev"
        (click)="scroll('left')"
        [class.disabled]="isPrevDisabled"
      >
        <i class="fas fa-chevron-left"></i>
      </button>

      <div class="carousel-content" #carouselContent (scroll)="onScroll()">
        <div
          *ngFor="let service of services"
          class="service-item"
          [class.active]="service.isActive"
          (click)="setActive(service)"
        >
          <div class="icon">
            <img [src]="service.image" alt="{{ service.name }}" />
          </div>
          <div class="title">{{ service.name }}</div>
          <div class="active-indicator" *ngIf="service.isActive"></div>
        </div>
      </div>

      <button
        class="nav-button next"
        (click)="scroll('right')"
        [class.disabled]="isNextDisabled"
      >
        <i class="fas fa-chevron-right"></i>
      </button>
    </div>
  `,
  styles: [
    `
      .carousel-container {
        position: relative;
        width: 100%;
        height: 120px; /* ⬆️ Increased height for better visibility */
        background: white;
        display: flex;
        align-items: center; /* Ensures items are centered */
        padding: 10px 0;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .carousel-content {
        display: flex;
        overflow-x: auto;
        scroll-behavior: smooth;
        padding: 0 10px;
        gap: 20px;
        scrollbar-width: none;
        align-items: center; /* Keep items vertically aligned */
        height: 100%;
      }

      .carousel-content::-webkit-scrollbar {
        display: none; /* Hides scrollbar for Chrome, Safari */
      }

      .service-item {
        min-width: 150px; /* Increased min-width for longer names */
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        padding: 15px;
        cursor: pointer;
        position: relative;
        border-radius: 8px;
        transition: all 0.3s ease;
      }

      .service-item:hover {
        background: #f8f9fa;
      }

      .service-item.active {
        background: #5d87ff;
        color: white;
        border-radius: 10px;
      }

      .icon {
        width: 50px;
        height: 50px;
        margin-bottom: 8px;
      }

      .icon img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }

      .title {
        font-size: 14px;
        font-weight: 500;
        white-space: nowrap;
      }

      .active-indicator {
        position: absolute;
        bottom: 0; /* ⬆️ Fully visible underline */
        left: 50%;
        transform: translateX(-50%);
        width: 60%;
        height: 4px; /* ⬆️ Increased thickness for visibility */
        background: #ffcc00; /* 🔵 You can change this to match your theme */
        border-radius: 2px;
      }

      .nav-button {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: none;
        background: white;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        z-index: 1;
        transition: all 0.3s ease;
      }

      .nav-button:hover {
        background: #f8f9fa;
      }

      .nav-button.disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .prev {
        left: 10px;
      }

      .next {
        right: 10px;
      }

      @media (max-width: 768px) {
        .service-item {
          min-width: 100px;
        }

        .nav-button {
          width: 30px;
          height: 30px;
        }

        .prev {
          left: 5px;
        }

        .next {
          right: 5px;
        }
      }
    `,
  ],
})
export class ServiceCarouselComponent implements AfterViewInit {
  services: ServiceItem[] = [
    {
      name: 'Periodic Services',
      image: 'assets/images/landing/1.png',
      isActive: true,
    },
    {
      name: 'AC Service and Repair',
      image: 'assets/images/landing/18.png',
      isActive: false,
    },
    {
      name: 'Batteries',
      image: 'assets/images/landing/19.png',
      isActive: false,
    },
    {
      name: 'Tyres and Wheel Care',
      image: 'assets/images/landing/15.png',
      isActive: false,
    },
    {
      name: 'Denting and Painting',
      image: 'assets/images/landing/16.png',
      isActive: false,
    },
    {
      name: 'Detailing Services',
      image: 'assets/images/landing/17.png',
      isActive: false,
    },
    {
      name: 'Car Spa and Cleaning',
      image: 'assets/images/landing/10.png',
      isActive: false,
    },
    {
      name: 'Car Inspections',
      image: 'assets/images/landing/13.png',
      isActive: false,
    },
    {
      name: 'Windshields and Lights',
      image: 'assets/images/landing/14.png',
      isActive: false,
    },
    {
      name: 'Suspension and Fitments',
      image: 'assets/images/landing/9.png',
      isActive: false,
    },
    {
      name: 'Clutch and Body Parts',
      image: 'assets/images/landing/11.png',
      isActive: false,
    },
    {
      name: 'Insurance Claims',
      image: 'assets/images/landing/12.png',
      isActive: false,
    },
    {
      name: 'SOS Service',
      image: 'assets/images/landing/12.png',
      isActive: false,
    },
  ];

  @ViewChild('carouselContent', { static: false }) carousel!: ElementRef;

  isPrevDisabled = true;
  isNextDisabled = false;

  ngAfterViewInit(): void {
    this.updateNavButtons();
  }

  /** Updates button states dynamically */
  updateNavButtons(): void {
    const container = this.carousel.nativeElement;
    this.isPrevDisabled = container.scrollLeft === 0;
    this.isNextDisabled =
      container.scrollLeft + container.clientWidth >= container.scrollWidth;
  }

  /** Handles the scroll event */
  onScroll(): void {
    this.updateNavButtons();
  }

  /** Scrolls left or right */
  scroll(direction: 'left' | 'right'): void {
    const scrollAmount = 300;
    const container = this.carousel.nativeElement;

    if (direction === 'left') {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }

  @Output() categorySelect = new EventEmitter<string>();

  /** Updates active service and emits selected category */
  setActive(selectedService: ServiceItem): void {
    this.services.forEach((service) => {
      service.isActive = service === selectedService;
    });
    // Emit the selected service name
    this.categorySelect.emit(selectedService.name);
  }
}
