import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState, FormEvent } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	OptionType,
	defaultArticleState,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

//Находим элемент с селектором root, который будет является корневым узлом в который будет монитроваться наше react приложение
const domNode = document.getElementById('root') as HTMLDivElement;
//Создаем корневой react контейнер(точку входа реакт компонентов) тем самым связываем react и наш реальный dom дерево. Без этого мы не сможем
//Компоненты React — это сущности JavaScript, которые представляют собой элементы пользовательского интерфейса и управляются JavaScript. Без процесса рендеринга через React и привязки к элементу DOM HTML-страница не могла бы отображать содержимое, созданное React-компонентами.
const root = createRoot(domNode);

//Здесь будем соединять все реакт компоненты
const App = () => {
	const [sideBarState, setSideBarState] =
		useState<ArticleStateType>(defaultArticleState);
	const [state, setState] = useState<ArticleStateType>(defaultArticleState);

	const changeFontFamily = (select: OptionType) => {
		setSideBarState({ ...sideBarState, fontFamilyOption: select });
	};

	const changeFontSize = (select: OptionType) => {
		setSideBarState({ ...sideBarState, fontSizeOption: select });
	};

	const changeFontColor = (select: OptionType) => {
		setSideBarState({ ...sideBarState, fontColor: select });
	};

	const changeContainerWidth = (select: OptionType) => {
		setSideBarState({ ...sideBarState, contentWidth: select });
	};

	const changeBgColor = (select: OptionType) => {
		setSideBarState({ ...sideBarState, backgroundColor: select });
	};

	const resetSidebarState = () => {
		setState(defaultArticleState);
		setSideBarState(defaultArticleState);
	};

	const applySideBarState = (event: FormEvent) => {
		event.preventDefault();
		setState(sideBarState);
	};

	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': state.fontFamilyOption.value,
					'--font-size': state.fontSizeOption.value,
					'--font-color': state.fontColor.value,
					'--container-width': state.contentWidth.value,
					'--bg-color': state.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				fontFamily={changeFontFamily}
				fontSize={changeFontSize}
				fontColor={changeFontColor}
				backgroundColor={changeBgColor}
				contentWidth={changeContainerWidth}
				resetButton={resetSidebarState}
				applyButton={applySideBarState}
				sideBarState={sideBarState}
			/>
			<Article />
		</div>
	);
};

//Так как у нас root связан с корневым узлом то теперь мы можем через этот корневой контейнер рендерить реакт компоненты. С помощью виртуального dom идет сравнение с реалным dom чтобы отрендерить только то, что изменилось, а не все дерево
root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
