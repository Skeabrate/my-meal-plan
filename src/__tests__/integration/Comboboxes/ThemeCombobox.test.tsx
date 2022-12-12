import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders } from 'utils/renderWithProviders';
import ThemeCombobox from 'components/Comboboxes/ThemeCombobox';

it('test theme combobox', () => {
  renderWithProviders(<ThemeCombobox />);

  // fireEvent.click(
  //   screen.getByRole('button', {
  //     name: 'open theme combobox',
  //   })
  // );
});
