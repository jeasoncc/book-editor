import { render } from '@testing-library/svelte';
import LayoutHome from './LayoutHome.svelte';

test('renders LayoutHome component', () => {
    const { getByText } = render(LayoutHome);
    const heading = getByText(/LayoutHome 组件/i);
    expect(heading).toBeInTheDocument();
});
