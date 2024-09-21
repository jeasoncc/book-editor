import { render } from '@testing-library/svelte';
import ComponentLogin from './ComponentLogin.svelte';

test('renders ComponentLogin component', () => {
    const { getByText } = render(ComponentLogin);
    const heading = getByText(/ComponentLogin 组件/i);
    expect(heading).toBeInTheDocument();
});
