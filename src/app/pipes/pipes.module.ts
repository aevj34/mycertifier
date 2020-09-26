import { NgModule } from '@angular/core';
import { ImagePipe } from './image.pipe';
import { ImagenPipe } from './imagen.pipe';


@NgModule({
  declarations: [
    ImagePipe,
    ImagenPipe
  ],
  imports: [

  ],
  exports: [
    ImagePipe
  ]
})
export class PipesModule { }

