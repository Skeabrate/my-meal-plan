import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { renderWithProviders } from 'utils/renderWithProviders';
import GridSection from '../components/GridSection/GridSection';

const dataWithOneItem = [
  {
    id: '0',
    name: 'first item',
    img: 'https://picsum.photos/id/237/200/300',
    slug: 'first-item',
  },
];

const dataWithTwoOrMoreItems = [
  {
    id: '0',
    name: 'first item',
    img: 'https://picsum.photos/id/237/200/300',
    slug: 'first-item',
  },
  {
    id: '1',
    name: 'second item',
    img: 'https://picsum.photos/id/237/200/300',
    slug: 'second-item',
  },
];

describe('GridSection', () => {
  it('test if sort combobox is rendered when data has more than 1 item', () => {
    renderWithProviders(
      <GridSection
        data={dataWithTwoOrMoreItems}
        label={{ value: 'Test section with two items' }}
        error={{
          value: false,
          fallbackMessage: '',
        }}
        linkUrl={'/'}
        loadingData={false}
      />
    );

    const button = screen.getByRole('button', {
      name: 'Sort by:',
    });

    expect(button).toBeInTheDocument();
  });

  it('test if sort combobox is NOT rendered when data has less than 2 items', () => {
    renderWithProviders(
      <GridSection
        data={dataWithOneItem}
        label={{ value: 'Test section with one item' }}
        error={{
          value: false,
          fallbackMessage: '',
        }}
        linkUrl={'/'}
        loadingData={false}
      />
    );

    expect(screen.queryByText('Sort by:')).toBeNull();
  });
});
