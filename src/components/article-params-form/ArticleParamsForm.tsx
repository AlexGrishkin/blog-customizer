import { useEffect, useRef, useState, FormEvent } from 'react';
import clsx from 'clsx';
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { RadioGroup } from '../radio-group';
import { Select } from '../select';
import { Separator } from '../separator';
import { Text } from '../text/Text';
import {
	ArticleStateType,
	OptionType,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	fontFamily: (select: OptionType) => void;
	fontSize: (select: OptionType) => void;
	fontColor: (select: OptionType) => void;
	backgroundColor: (select: OptionType) => void;
	contentWidth: (select: OptionType) => void;
	resetButton: () => void;
	applyButton: (event: FormEvent) => void;
	sideBarState: ArticleStateType;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const ref = useRef<HTMLFormElement | null>(null);
	const arrowButtonRef = useRef<HTMLDivElement | null>(null);
	const [open, setOpen] = useState(false);
	const toggleForm = () => {
		open === false ? setOpen(true) : setOpen(false);
	};

	useEffect(() => {
		if (!open) return;
		const closeAsideOutside = (event: MouseEvent) => {
			if (event.button !== 0) return;
			const { target } = event;
			const isOutsideClick =
				target instanceof Node && // проверяем, что это `DOM`-элемент/
				ref.current && //на всякий проверяем что ref не null
				!ref.current.contains(target); // проверяем, что кликнули на элемент, который находится не внутри сайдбара
			const isArrowButtonClick =
				target instanceof Node &&
				arrowButtonRef.current &&
				arrowButtonRef.current.contains(target); //нужно чтобы потом проверить не кликнули ли мы на кнопке потому что она тоже вне сайдбара находится
			if (isOutsideClick && !isArrowButtonClick) {
				setOpen(false);
			}
		};
		document.addEventListener('mousedown', closeAsideOutside);
		return () => {
			document.removeEventListener('mousedown', closeAsideOutside);
		};
	}, [open, ref, arrowButtonRef]);

	return (
		<>
			<ArrowButton ref={arrowButtonRef} onClick={toggleForm} isOpen={open} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: open })}>
				<form className={styles.form} ref={ref} onSubmit={props.applyButton}>
					<Text size={31} weight={800} uppercase as={'h3'} align='center'>
						Задайте параметры
					</Text>
					<Select
						selected={props.sideBarState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={props.fontFamily}
						title='Шрифт'
					/>
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={props.sideBarState.fontSizeOption}
						onChange={props.fontSize}
						title='Размер шрифта'
					/>
					<Select
						selected={props.sideBarState.fontColor}
						options={fontColors}
						onChange={props.fontColor}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						selected={props.sideBarState.backgroundColor}
						options={backgroundColors}
						onChange={props.backgroundColor}
						title='Цвет фона'
					/>
					<Select
						selected={props.sideBarState.contentWidth}
						options={contentWidthArr}
						onChange={props.contentWidth}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={props.resetButton} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
