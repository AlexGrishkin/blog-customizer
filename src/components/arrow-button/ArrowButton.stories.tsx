import type { Meta, StoryObj } from '@storybook/react';

import { ArrowButton } from './ArrowButton';

const meta: Meta<typeof ArrowButton> = {
	component: ArrowButton,
};

export default meta;
type Story = StoryObj<typeof ArrowButton>;

export const ArrowButtonStory: Story = {
	render: () => {
		return (
			<>
				<ArrowButton
					//добавили алерт чтобы тестить как как элемент выглядит и работает ли функция вызываемая событием
					onClick={() => alert('Открыть / закрыть сайдбар')}
					isOpen={false}
				/>
			</>
		);
	},
};
