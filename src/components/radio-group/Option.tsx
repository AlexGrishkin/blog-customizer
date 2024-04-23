import { useRef } from 'react';
import { OptionType } from 'src/constants/articleProps';
import { Text } from 'components/text';
import { useEnterSubmit } from './hooks/useEnterSubmit';

import styles from './RadioGroup.module.scss';

type OptionProps = {
	value: OptionType['value'];
	title: OptionType['title'];
	selected: OptionType;
	groupName: string;
	onChange?: (option: OptionType) => void;
	option: OptionType;
};

export const Option = (props: OptionProps) => {
	const { value, title, selected, groupName, onChange, option } = props;

	const optionRef = useRef<HTMLDivElement>(null);

	const handleChange = () => onChange?.(option);

	useEnterSubmit({ onChange, option });

	const inputId = `${groupName}_radio_item_with_value__${value}`;
	const isChecked = value === selected.title;

	// Причина проблемы
	// В HTML и JavaScript, элементы форм, такие как радиокнопки, сохраняют своё состояние (выбраны или нет) в DOM. Если вы не управляете этим состоянием программно (через JavaScript или, в случае React, через состояние компонента), то браузер будет управлять этим состоянием автономно.

	// Когда вы используете React и не связываете свойство checked радиокнопки с состоянием React:

	// Состояние DOM сохраняется: Каждый раз, когда пользователь выбирает определенную радиокнопку, состояние этого выбора сохраняется непосредственно в DOM, а не в состоянии React.
	// React не контролирует DOM: При сбросе состояния в вашем приложении React, вы обновляете только состояние в React, но поскольку свойство checked не связано с этим состоянием, DOM не получает указания изменить визуальное отображение радиокнопок.
	// Радиокнопка остается выбранной: Таким образом, даже если состояние в вашем React приложении говорит, что ни одна кнопка не должна быть выбрана (или должна быть выбрана другая кнопка), визуально предыдущий выбор пользователя остается активным, так как DOM не был соответствующим образом обновлен.
	return (
		<div
			className={styles.item}
			key={value}
			data-checked={isChecked}
			data-testid={inputId}
			tabIndex={0}
			ref={optionRef}>
			<input
				className={styles.input}
				type='radio'
				name={groupName}
				checked={isChecked}
				id={inputId}
				value={value}
				onChange={handleChange}
				tabIndex={-1}
			/>
			<label className={styles.label} htmlFor={inputId}>
				<Text size={18} uppercase>
					{title}
				</Text>
			</label>
		</div>
	);
};
