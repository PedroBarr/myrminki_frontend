import Descriptor from '../models/descriptor.model';

const pageInicio = new Descriptor(
    'Pagina de inicio',
    'Ir al inicio',
    'A continuaci\u00f3n, seleccione el uso que desee del Sistema ' +
      'Myrminki.\n\nSi es su primera vez, se recomienda que use el ' +
      'modo de exploraci\u00f3n o los referentes bibliogr\u00e1ficos ' +
      'del sistema hasta saber como implementar sus propias instancias ' +
      'parametrizadas.\nSi se siente preparado, avance al modo de ' +
      'pr\u00e1ctica y aproveche lo m\u00e1ximo del sistema.',
    '<PropagandaPaginaInicio/>',
    '/inicio'
  )

const pageExplorar = new Descriptor(
    'Pagina de Exploraci\u00f3n',
    'Modo de exploraci\u00f3n',
    '<DescriptorPaginaExplorar/>',
    'El modo de exploraci\u00f3n permite observar los problemas de ' +
      'optimizaci\u00f3n y los optimizadores en condiciones controladas ' +
      'orientadas al aprendizaje.\n\nCada opci\u00f3n de exploraci\u00f3n ' +
      'indexa los referentes conceptuales y diferentes modos de ' +
      'aprendizaje con ejemplos. Se pretenden ilustrar distintos ' +
      'm\u00e9todos de enseñanza seg\u00fan las capacidades individuales.',
    '/explorar'
  )

const pagePractica = new Descriptor(
    'Pagina de Configuraci\u00f3n',
    'Modo de Pr\u00e1ctica',
    '<DescriptorPaginaPractica/>',
    'El modo de pr\u00a1ctica permite instanciar problemas y optimizadores ' +
      'parametrizados basados en las plantillas del sistema Myrminki. Tras ' +
      'la etapa de instanciaci\u00f3n, el sistema permite implementar la ' +
      'soluci\u00f3n, observando el desempe\u00f1o en tiempo real.\n\nAl ' +
      'implementar una soluci\u00f3n eficiente, el modo pr\u00a1ctica ' +
      'permite llevar registro comparativo que demuestra el desempe\u00f1o ' +
      'global de los usuarios.',
    '/configurar'
  )

export const pageDescriptores = {
  'inicio': pageInicio,
  'explorar': pageExplorar,
  'practica': pagePractica,
}