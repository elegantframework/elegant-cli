import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Cms from './Cms';
import { usePathname } from 'next/navigation';

// Mock useRouter:
jest.mock("next/navigation", () => ({
    useRouter() {
      return {
        prefetch: () => null
      };
    },
    usePathname() {
        return {
            prefetch: () => null
        };
    }
}));

describe('The main CMS component', () => {
    it('shows the welcome page when env vars have not been set', () => {
        render(
            <Cms 
                postgresUrl={undefined}
                nonPoolingPUrl={undefined}
                adminCount={0}
                session={null}
                params={{
                    cms: []
                }}
            />
        )

        const heading = screen.getByText('Welcome to Elegant CMS');
 
        expect(heading).toBeInTheDocument();
    });
  })