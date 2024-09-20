import { render } from '@testing-library/svelte';
import AppEntry from './AppEntry.svelte';

test('renders AppEntry component', () => {
    const { getByText } = render(AppEntry);
    const heading = getByText(/AppEntry 组件/i);
    expect(heading).toBeInTheDocument();
});
