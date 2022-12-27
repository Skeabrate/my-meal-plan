import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders } from 'utils/renderWithProviders';
import SortCombobox from 'components/Comboboxes/SortCombobox';

jest.useFakeTimers();
jest.spyOn(global, 'setTimeout');

describe('SortCombobox', () => {
  const itemsToSort = [
    {
      id: '0',
      name: 'a',
      img: '',
      slug: '',
    },
    {
      id: '1',
      name: 'd',
      img: '',
      slug: '',
    },
    {
      id: '2',
      name: 'c',
      img: '',
      slug: '',
    },
    {
      id: '3',
      name: 'b',
      img: '',
      slug: '',
    },
  ];

  it('test if loading state is triggered for 0.2s after chosing an option from combobox expanded list', () => {
    const loadingHandler = jest.fn();

    renderWithProviders(
      <SortCombobox
        itemsToSort={itemsToSort}
        setLoadingFilters={loadingHandler}
      />
    );

    fireEvent.click(
      screen.getByRole('button', {
        name: 'Sort by:',
      })
    );
    fireEvent.click(
      screen.getByRole('button', {
        name: 'Name: A - Z',
      })
    );

    expect(loadingHandler).toHaveBeenCalled();
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 200);
  });

  it('test ascending sort', () => {
    renderWithProviders(
      <SortCombobox
        itemsToSort={itemsToSort}
        setLoadingFilters={() => {}}
      />
    );

    fireEvent.click(
      screen.getByRole('button', {
        name: 'Sort by:',
      })
    );
    fireEvent.click(
      screen.getByRole('button', {
        name: 'Name: A - Z',
      })
    );

    expect(itemsToSort[0].name).toBe('a');
    expect(itemsToSort[1].name).toBe('b');
    expect(itemsToSort[2].name).toBe('c');
    expect(itemsToSort[3].name).toBe('d');
  });

  it('test descending sort', () => {
    renderWithProviders(
      <SortCombobox
        itemsToSort={itemsToSort}
        setLoadingFilters={() => {}}
      />
    );

    fireEvent.click(
      screen.getByRole('button', {
        name: 'Sort by:',
      })
    );
    fireEvent.click(
      screen.getByRole('button', {
        name: 'Name: Z - A',
      })
    );

    expect(itemsToSort[0].name).toBe('d');
    expect(itemsToSort[1].name).toBe('c');
    expect(itemsToSort[2].name).toBe('b');
    expect(itemsToSort[3].name).toBe('a');
  });
});
