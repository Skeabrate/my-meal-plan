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
  it('test if combobox expands when label button is clicked', () => {
    renderWithProviders(<ComboboxWrapper />);

    fireEvent.click(
      screen.getByRole('button', {
        name: 'label',
      })
    );

    expect(
      screen.getByRole('button', {
        name: 'first item',
      })
    ).toBeInTheDocument();
  });

  it('test if combobox is closing when user clicks anything other than combobox label', () => {
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
    expect(screen.queryByText('first item')).toBeInTheDocument();
    fireEvent.click(screen.getByText('wrapper-text'));
    expect(screen.queryByText('first item')).toBeNull();
  });

  it('test if combobox show proper label after chosing option from expanded list', () => {
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

    fireEvent.click(screen.getByText('wrapper-text'));

    expect(screen.queryByText('label')).toBeNull();
    expect(screen.queryByText('first item')).toBeInTheDocument();
  });
});
