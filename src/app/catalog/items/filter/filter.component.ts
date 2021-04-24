import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import { Category } from '../../../types/Game';
import { CategoryService } from '../../../services/category/category.service';

@Component({
  selector: 'app-filter',
  templateUrl: 'filter.component.html',
  styleUrls: ['filter.component.css'],
})
export class FilterComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  categoryCtrl = new FormControl();
  filteredCategories: Observable<Category[]>;
  categories: Category[] = [];
  allCategories: Category[] = [];

  @ViewChild('categorySearchInput') categorySearchInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.categoryService.getCategories().subscribe((categories) => {
      this.allCategories = categories;
      this.filteredCategories = this.categoryCtrl.valueChanges.pipe(
        startWith(null as string),
        map((fruit: Category | string | null) => {
          return fruit ? this._filter(fruit) : this.allCategories.slice();
        })
      );
    });
  }

  remove(fruit: Category): void {
    const index = this.categories.indexOf(fruit);

    if (index >= 0) {
      this.categories.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.categories.push(event.option.value);
    this.categorySearchInput.nativeElement.value = '';
    this.categoryCtrl.setValue(null);
  }

  private _filter(value: Category | string): Category[] {    
    let filterValue = '';

    if (typeof value === 'string') {
      filterValue = value.toLowerCase();
    } else if (typeof value === 'object') {
      filterValue = value.name.toLowerCase();
    }
    return this.allCategories.filter(fruit => fruit.name.toLowerCase().indexOf(filterValue) === 0);
  }
}
