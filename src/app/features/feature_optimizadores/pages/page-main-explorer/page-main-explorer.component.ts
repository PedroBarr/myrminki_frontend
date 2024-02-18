import {
    Component
} from '@angular/core';

import axios from 'axios';

import { pageDescriptores } from '../../constants/descriptor.constant';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'myrmex-page-main-explorer',
  templateUrl: './page-main-explorer.component.html',
  styleUrls: ['./page-main-explorer.component.scss'],
})

export class PageMainExplorerComponent {

  pageDescriptor: string = pageDescriptores['explorar'];

}