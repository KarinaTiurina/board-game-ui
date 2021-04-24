import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, OnInit, Output, ViewChild, EventEmitter, Input} from '@angular/core';
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
  @Input() categories: Category[] = [];
  @Output() onFilterChange = new EventEmitter<Category[]>();

  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  categoryCtrl = new FormControl();
  filteredCategories: Observable<Category[]>;
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
        map((category: Category | string | null) => {
          return category ? this._filter(category) : this.allCategories.slice();
        })
      );
    });
  }

  remove(category: Category): void {
    const index = this.categories.indexOf(category);

    if (index >= 0) {
      this.categories.splice(index, 1);
    }

    this.onFilterChange.emit(this.categories);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.categories.push(event.option.value);
    this.categorySearchInput.nativeElement.value = '';
    this.categoryCtrl.setValue(null);

    this.onFilterChange.emit(this.categories);
  }

  private _filter(value: Category | string): Category[] {    
    let filterValue = '';

    if (typeof value === 'string') {
      filterValue = value.toLowerCase();
    } else if (typeof value === 'object') {
      filterValue = value.name.toLowerCase();
    }
    return this.allCategories.filter(category => category.name.toLowerCase().indexOf(filterValue) === 0);
  }
}
