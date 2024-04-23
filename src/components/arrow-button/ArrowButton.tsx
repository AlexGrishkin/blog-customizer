import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';
//импортируем библиотеку clsx для того чтобы добавлять классы в компонент кнопки в зависимости от условия
import clsx from 'clsx';
import React, { ForwardedRef, forwardRef } from 'react';

//Это у наc компонент, отвечающий за кнопку стрелочки в макете, при нажатии на который открывается сайдбар
/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

//это наш пользовательский тип для кнопки который принимает метод события по клику и булево значение в зависимости от того открыт сайдбар или нет
export type ArrowButtonProps = {
	onClick: OnClick;
	isOpen: boolean;
};

export const ArrowButton = forwardRef(
	(
		{ onClick, isOpen }: ArrowButtonProps,
		ref: ForwardedRef<HTMLDivElement>
	) => {
		return (
			/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
			<div
				ref={ref}
				//элемент ведет себя как кнопка
				role='button'
				//текстовое описание для доступности
				aria-label='Открыть/Закрыть форму параметров статьи'
				//этот элемент будет первым при навигации с клавиатуры
				tabIndex={0}
				//здесь у нас styles.container добавляется всегда, а styles.container_open если isOpen true
				className={clsx(styles.container, { [styles.container_open]: isOpen })}
				//событие которое будет вызываться при выполнении метода в свойстве onClick передаваемого объекта
				onClick={onClick}>
				<img
					src={arrow}
					alt='иконка стрелочки'
					//тоже самое styles.arrow всегда, а styles.arrow_open только если сайдбар открыт
					className={clsx(styles.arrow, { [styles.arrow_open]: isOpen })}
				/>
			</div>
		);
	}
);

ArrowButton.displayName = 'ArrowButton';
