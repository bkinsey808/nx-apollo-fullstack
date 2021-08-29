import { FC, memo, useContext } from 'react';

import { AppSelect } from '../../../components/AppSelect';
import { THEME_CHOICES } from '../helpers/themeConsts';
import { ThemeChoice } from '../helpers/themeTypes';

import { ThemeContext } from './ThemeContext';

export const ThemeSelect: FC = memo(() => {
  const { themeChoice, setThemeChoice } = useContext(ThemeContext);

  return (
    <form>
      <AppSelect<ThemeChoice>
        id="theme"
        label="Theme"
        value={themeChoice}
        options={THEME_CHOICES}
        onChange={setThemeChoice}
      />
    </form>
  );
});
ThemeSelect.displayName = 'ThemeSelect';
