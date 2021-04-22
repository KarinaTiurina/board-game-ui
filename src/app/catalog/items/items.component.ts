import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category/category.service';
import { Category } from 'src/app/types/Game';

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

  constructor(
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.categoryService.getCategoriesWithGames(1).subscribe(categories => {
      this.categoriesList = categories;
      this.isLoading = false;
    });
  }
}
