import { Component, OnInit } from '@angular/core';

interface Slide {
  image: string;
}

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  slides: Slide[] = [
    {
      image: 'assets/images/slide1.jpg'
    },
    {
      image: 'assets/images/slide2.jpg'
    },
    {
      image: 'assets/images/slide3.jpg'
    },
    {
      image: 'assets/images/slide4.jpg'
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
