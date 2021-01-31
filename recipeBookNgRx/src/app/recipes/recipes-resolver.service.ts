import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { DataStorageService } from '../shared/data-storage.service';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as RecipesActions from '../recipes/store/recipe.actions';
import { Actions, ofType } from '@ngrx/effects';
import { take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(
    private dataStorageService: DataStorageService,
    private recipeService: RecipeService,
    private store: Store<fromApp.AppState>,
    private actions$: Actions
  ) {}

  // resolver subscribes automatically
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log('Recipes resolver running');

    // const recipes = this.recipeService.getRecipes();
    // if (recipes.length === 0) {
    //   console.log('resolver fetching recipes');
    //   return this.dataStorageService.fetchRecipes();
    // } else {
    //   console.log('resolver not fetching recipes');
    //   return recipes;
    // }

    this.store.dispatch(new RecipesActions.FetchRecipes());
    return this.actions$.pipe(ofType(RecipesActions.SET_RECIPES), take(1));
  }
}
