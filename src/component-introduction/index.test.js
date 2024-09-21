import { render } from '@testing-library/svelte';
import ComponentIntroduction from './ComponentIntroduction.svelte';

test('renders ComponentIntroduction component', () => {
    const { getByText } = render(ComponentIntroduction);
    const heading = getByText(/ComponentIntroduction 组件/i);
    expect(heading).toBeInTheDocument();
});
