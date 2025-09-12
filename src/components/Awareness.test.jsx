import { describe, it, expect } from 'vitest';
import Awareness from './Awareness';

describe('Awareness Component', () => {
    it('renders correctly', () => {
        const { container } = render(<Awareness />);
        expect(container).toBeInTheDocument();
    });

    it('displays the correct text', () => {
        const { getByText } = render(<Awareness />);
        expect(getByText('Expected Text')).toBeInTheDocument();
    });
});