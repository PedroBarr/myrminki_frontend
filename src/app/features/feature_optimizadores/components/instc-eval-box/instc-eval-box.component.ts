import {
  Component,
  Input,
} from '@angular/core';

import axios from 'axios';

import { environment } from 'src/environments/environment';


@Component({
  selector: 'myrmex-instc-eval-box',
  templateUrl: './instc-eval-box.component.html',
  styleUrls: ['./instc-eval-box.component.scss'],
})

export class InstcEvalBoxComponent {

  code_in: string = '';
  code_out: string = '';

  @Input() instc_id: string  = '';
  @Input() arg_selecto: string | null = null;
  @Input() args_editados: {[clave_param: string]: string} = {};

  /**
  * Eval code on API
  */
  async eval_code () {
    if (!this.code_in) return;

    const arg_url: string = (
      this.arg_selecto ?
      ('/argumentacion_instancia/' + this.arg_selecto) :
      ''
    );

    axios.get(
      environment.MYRMEX_API +
        '/instancia/identificador/' + this.instc_id + '/ejecutar/' +
          this.code_in + arg_url,
      {
        params: this.args_editados,
      }
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