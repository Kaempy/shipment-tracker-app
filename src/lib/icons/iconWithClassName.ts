import type { LucideIcon } from 'lucide-react-native';
import { cssInterop } from 'nativewind';

function iconWithClassName(icon: LucideIcon) {
  cssInterop(icon, {
    className: {
      target: 'style',
      nativeStyleToProp: {
        color: true,
        opacity: true,
      },
    },
  });
}
export default iconWithClassName;
