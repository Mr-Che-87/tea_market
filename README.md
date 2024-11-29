## Установка зависимостей
npm i

## Запуск
npm run dev
- or
yarn dev

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.



## Краткое описание структуры проекта.
СТЕК: NextJS(SSR), React, SCSS. Типизация – TypeScript. Стейт-менеджер – Redux Toolkit.
- src/app - серверные компоненты;
- src/app/api - серверные API-роуты (забирают из "базы данных" - public/mock.json);
- scr/components - клиентские компоненты;
- store - глобальное хранилище и редьюсеры;
- styles - глобальные стили и стили контейнера приложения;

## Доп-фичи и пояснения:
1) сделал отдельную страницу «Избранное»(зачаток корзины) – с возможностью добавления/удаления оттуда товаров через отдельный redux-слайс. Список избранных товаров сохраняется в sessionStorage. (добавлять/удалять через кнопку звёздочка во всех интерфейсах)

2) помимо поиска по имени, сделал двойную сортировку по цене (всё через редакс)

3) в utils  – функция склонения существительных в зав-ти от количества 

4) В ТЗ увидел некое противоречие: требуется Next от 13-й версии и выше + использование getServerSideProps или getStaticProps(но эти фукнции актуальны только для Next до 12-й версии включительно). Я использовал NextJS-14(аpp-router взамен page-router): в нём данные загружаются в серверных компонентах, а передача параметров в клиентские происходит через params.

5) Функционал для улучшения пользовательского опыта: 
есть прелоадер, есть сообщения об ошибках на UX, есть счётчик найденных товаров при поиске, есть анимация при переходе между страницами.

6) UI/UX
Стили – SCSS. Material-UI использовал частично (только в файле ProductCard.tsx, чтоб показать что умеем-могём). Ибо не очень люблю мешать стили и вёрстку.

7) Оптимизация производительности
- мемоизация отфильтрованных товаров, кэширование в серверных АПИ(при обращении к мок-заглушке)
- применил Image Optimization (next-компонент <Image> со встроенным lazy loading) и чутка динамических импортов.
