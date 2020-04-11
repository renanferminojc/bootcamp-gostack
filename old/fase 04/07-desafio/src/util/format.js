import numeral from 'numeral';
import 'numeral/locales';

numeral.locale('pt-br');

export const formatPrice = num => numeral(num).format('$ 0,0.00');
