import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { UsersComponent } from './users.component';
import { UserListService } from './store/service';
import * as fromReducer from './store/reducer';
import { EffectsModule } from '@ngrx/effects';
import { UserListEffects } from './store/effects';

@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromReducer.featureKey, fromReducer.reducer),
    EffectsModule.forFeature([UserListEffects])
  ],
  exports: [UsersComponent],
  providers: [UserListService]
})
export class UsersModule { }
