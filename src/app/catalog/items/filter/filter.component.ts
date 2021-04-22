import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, ViewChild, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Category } from 'src/app/types/Game';

import { CategoryService } from '../../../services/category/category.service';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit  {
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  categoryCtrl = new FormControl();
  filteredCategories: Observable<Category[]>;
  categories: Category[] = [];
  allCategories: Category[] = [];

  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(
    private categoryService: CategoryService
  ) {
    this.filteredCategories = this.categoryCtrl.valueChanges.pipe(
        startWith(null),
        map((fruit: Category | null) => fruit ? this._filter(fruit) : this.allCategories.slice()));
  }

  ngOnInit() {
    this.categoryService.getCategories().subscribe(categoriesList => {
      this.allCategories = categoriesList;
    })
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    const categoryToAdd = this.allCategories.find(category =>
      value === category.name
    );


    // Add category
    if (categoryToAdd) {
      this.categories.push(categoryToAdd);
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.categoryCtrl.setValue(null);
  }

  remove(fruit: Category): void {
    const index = this.categories.indexOf(fruit);

    if (index >= 0) {
      this.categories.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.categories.push(event.option.value);
    this.fruitInput.nativeElement.value = '';
    this.categoryCtrl.setValue(null);
  }

  private _filter(value: Category): Category[] {
    const filterValue = value.name.toLowerCase();

    return this.allCategories.filter(fruit => fruit.name.toLowerCase().indexOf(filterValue) === 0);
  }
}
