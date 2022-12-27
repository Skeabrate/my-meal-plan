import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders } from 'utils/renderWithProviders';
import Combobox from 'components/Comboboxes/template/Combobox';
import { useComboboxValue } from 'components/Comboboxes/template/useComboboxValue';

const ComboboxWrapper = () => {
  const { comboboxValue, setComboboxValue } = useComboboxValue(undefined);

  return (
    <Combobox
      options={[{ id: 0, value: 'first item' }]}
      label='label'
      comboboxValue={comboboxValue}
      setComboboxValue={setComboboxValue}
    />
  );
};

describe('Combobox', () => {
  it('test if combobox list is expanding when clicked on a label and closing when clicked anywhere else', () => {
    renderWithProviders(
      <div>
        wrapper-text
        <ComboboxWrapper />
      </div>
    );

    // OPEN
    fireEvent.click(
      screen.getByRole('button', {
        name: 'label',
      })
    );
    expect(screen.queryByText('first item')).toBeInTheDocument();

    // CLOSE
    fireEvent.click(screen.getByText('wrapper-text'));
    expect(screen.queryByText('first item')).toBeNull();
  });

  it('test if combobox show new label after chosing option from expanded list and if list closes after chosing an option', () => {
    renderWithProviders(
      <div>
        wrapper-text
        <ComboboxWrapper />
      </div>
    );

    fireEvent.click(
      screen.getByRole('button', {
        name: 'label',
      })
    );
    fireEvent.click(
      screen.getByRole('button', {
        name: 'first item',
      })
    );

    expect(screen.queryByText('label')).toBeNull();
    expect(screen.queryByText('first item')).toBeInTheDocument();
  });
});
