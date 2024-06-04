import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Cms from './Cms';

describe('The main CMS component', () => {
    it('shows the welcome page when env vars have not been set', () => {
        render(<Cms 
            postgresUrl={undefined}
            nonPoolingPUrl={undefined}
        />)

        const heading = screen.getByText('Welcome to Elegant CMS');
 
        expect(heading).toBeInTheDocument();
    });
  })