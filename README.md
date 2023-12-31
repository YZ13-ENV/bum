# ![dey-logo](/public/bum.svg) bum (находится в бета тестировании)

> [Ссылка на сервис](https:/bum.darkmaterial.space)

> [Ссылка на репо с бэком](https://github.com/YZ13-ENV/dm-darkstore)

### Вдохновение
Я часто использую сервисы Dribbble и Behance для вдохновения на создание проектов, так что я решил сделать свой аналог, 
который предоставлял бы возможность делиться своими работами, просматривать и оценивать работы других, и был бы нацелен на аудиторию СНГ.

### Стэк
Стэк проекта - **TypeScript + NextJS**, **Redux/toolkit**, **Tailwindcss**.

Бэк написан на **Python** с использованием **FastAPI**.

В качестве СУБД - **Firebase**

За хранение файлов отвечает **Yandex Cloud - Object Storage**

За доставку контента отвечает **Yandex Cloud - Cloud CDN**

### Команда разработчиков
Фронт, бэк, дизайн - [@YZ13](https://github.com/yz13-env)

## Текущие задачи
- [x] Авторизация & регистрация
- [x] Страница пользователя с его работами
- [x] Поиск по работами
- [x] Подсветка главного блока
- [x] Поддержка подписки (DM+)
- [x] Поддержка MarkDown синтаксиса (частичная)

## Планы на будущее
- Перенос в монорепозиторий DM
- Миграция с AntDesign на Shadcn
      
## Подписка DM+
Подписка распространяется через промокоды.
- Большее кол-во медиа блоков ( с 5 до 10 ).
- Доступ к новому блоку "Карусель", можно загрузить до 4 изображений.
- Возможность загружать в медиа блоки видео ( без подписки можно загружать только в главный блок ).
- Обновления дизайна доступны раньше, чем пользователям без подписки.
- Подсветка главного блока на старнице работы ( Ambient Light, референсом была профессиональная подсветка от YouTube ).
- Значок, который указывает на наличие подписки рядом с ником, и обводка иконки белым цветом.
