import {Colors} from '@utils/color';

export const COMMON_STYLES = {
  flex: {
    flex: 1,
  },
  flexCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textColor: {
    color: Colors.textColor,
    fontSize: 18,
  },

  screenPadding: 16,
  screenBgColor: Colors.textColor,
  itemHeight: 90,
} as const;
