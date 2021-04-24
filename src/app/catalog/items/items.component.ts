import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category/category.service';
import { Category, Game } from 'src/app/types/Game';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  categoriesList: Category[] = [];
  // categoriesList: Category[] = [{
  //   name: 'CategoryName',
  //   idCategories: '123',
  //   gameList: [
  //     {
  //       name: "GameName",
  //       description: "test description",
  //       price: 20
  //     },{
  //       name: "GameName",
  //       description: "test description",
  //       price: 20
  //     },{
  //       name: "GameName",
  //       description: "test description",
  //       price: 20
  //     },{
  //       name: "GameName",
  //       description: "test description",
  //       price: 20
  //     },{
  //       name: "GameName",
  //       description: "test description",
  //       price: 20
  //     }
  //   ]
  // },{
  //   name: 'CategoryName',
  //   idCategories: '123',
  //   gameList: [
  //     {
  //       name: "GameName",
  //       description: "test description",
  //       price: 20
  //     },{
  //       name: "GameName",
  //       description: "test description",
  //       price: 20
  //     },{
  //       name: "GameName",
  //       description: "test description",
  //       price: 20
  //     },{
  //       name: "GameName",
  //       description: "test description",
  //       price: 20
  //     },{
  //       name: "GameName",
  //       description: "test description",
  //       price: 20
  //     }
  //   ]
  // }];
  isLoading: boolean = true;
  gamesList: Game[] = [];

  constructor(
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.getInitialCatalog();
  }

  getInitialCatalog(): void {
    this.categoryService.getCategoriesWithGames(1).subscribe(categories => {
      this.categoriesList = categories;
      this.isLoading = false;
    });
  }

  onFilterChange(categories: Category[]): void {
    this.isLoading = true;
    if (categories.length) {
      this.getFilterdByCategories(categories);
    } else {
      this.getInitialCatalog();
    }
  }

  getFilterdByCategories(categories: Category[]): void {
    this.categoryService.getGamesByCategories(categories).subscribe((categories) => {
      this.categoriesList = categories;
      this.isLoading = false;
    });
  }
}
