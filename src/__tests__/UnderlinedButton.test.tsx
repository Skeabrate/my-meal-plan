import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders } from 'utils/renderWithProviders';
import UnderlinedButton from 'components/UnderlinedButton/UnderlinedButton';

describe('UnderlinedButton', () => {
  it('test if underlined button is rendered', () => {
    renderWithProviders(
      <UnderlinedButton
        label='test button'
        onClick={() => {}}
      />
    );

    expect(screen.getByText('test button')).toBeInTheDocument();
  });

  it('test if underlined button onClick is triggered', () => {
    const buttonOnClick = jest.fn();

    renderWithProviders(
      <UnderlinedButton
        label='test button'
        onClick={buttonOnClick}
      />
    );

    fireEvent.click(screen.getByText('test button'));
    expect(buttonOnClick).toHaveBeenCalled();
  });
});
