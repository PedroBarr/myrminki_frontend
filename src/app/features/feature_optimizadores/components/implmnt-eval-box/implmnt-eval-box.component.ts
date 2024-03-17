import {
  Component,
  Input,
} from '@angular/core';

import axios from 'axios';

import { environment } from 'src/environments/environment';


@Component({
  selector: 'myrmex-implmnt-eval-box',
  templateUrl: './implmnt-eval-box.component.html',
  styleUrls: ['./implmnt-eval-box.component.scss'],
})

export class ImplmntEvalBoxComponent {

  code_in: string = '';
  code_out: string = '';

  @Input() implmnt_id: string  = '';

  /**
  * Eval code on API
  */
  async eval_code () {
    if (!this.code_in) return;

    axios.get(
      environment.MYRMEX_API +
        '/implementacion/identificador/' + this.implmnt_id + '/ejecutar/' +
          this.code_in,
    )
      .then(response => {
        console.log(response.data);

        if (
          response.data &&
          response.data.retorno !== undefined
        ) {
          this.code_out = String(response.data.retorno);
        } else this.code_out = '';
      })
      .catch(error => {
        console.error(error);
        this.code_out = '';
      })
      .finally(( ) => { });
  }

}