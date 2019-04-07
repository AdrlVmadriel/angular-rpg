import { APP_PROVIDERS } from './app.providers';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { APP_IMPORTS } from './app.imports';
import { APP_DECLARATIONS } from './app.declarations';

@NgModule({
  declarations: APP_DECLARATIONS,
  imports: APP_IMPORTS,
  providers: APP_PROVIDERS,
  bootstrap: [AppComponent]
})
export class AppModule {}
