# web-fine
Веб-приложение для отслеживания штрафов ГИБДД

**Диаграмма связей в БД для приложения**

<img width="1299" height="782" alt="изображение" src="https://github.com/user-attachments/assets/82d5f0b0-2442-4ac4-a281-186d39dbc233" />

**Первая версия фронтенда сайта**

<details>
<summary>Страница авторизации</summary>
<img width="969" height="516" alt="изображение" src="https://github.com/user-attachments/assets/7266b5d8-7987-4904-9a50-3de81cb488e9" />
</details>

<details>
<summary>Страница входа для водителя</summary>
<img width="828" height="476" alt="изображение" src="https://github.com/user-attachments/assets/c69bfcc7-6944-4b16-a591-0c2634a400a7" />
</details>

<details>
<summary>Страница регистрации водителя</summary>
<img width="594" height="820" alt="изображение" src="https://github.com/user-attachments/assets/a48a34fe-f429-44e1-82f1-40f48da4cd5e" />
</details>

<details>
<summary>Главная для водителя</summary>
<img width="2091" height="960" alt="изображение" src="https://github.com/user-attachments/assets/e835d0e4-1e86-4679-8dbb-0e7a955c3b8c" />
</details>

<details>
<summary>Главная для сотрудника</summary>
<img width="2088" height="959" alt="изображение" src="https://github.com/user-attachments/assets/4eddbac1-141b-4990-a365-b9f2827bcb9b" />
</details>

<details>
<summary>Страница штрафов</summary>
<img width="2087" height="652" alt="изображение" src="https://github.com/user-attachments/assets/1766c2ff-8091-435f-b2b2-7fa3a631a590" />
</details>

<details>
<summary>Страница отчетности</summary>
<img width="2087" height="738" alt="изображение" src="https://github.com/user-attachments/assets/00328788-43f1-4dc0-b4ce-09b09843eafb" />
</details>

**Готовая версия фронтенда сайта**

<details>
<summary>Главная для сотрудника</summary>
<img width="1872" height="941" alt="изображение" src="https://github.com/user-attachments/assets/2aa48cf2-214f-4f9c-8e0b-7e83d2b132d1" />
</details>


<details>
<summary>Страница штрафов</summary>
<img width="1867" height="937" alt="изображение" src="https://github.com/user-attachments/assets/74b78f74-82cb-44e4-b3ea-9af3fe5cf102" />
</details>

<details>
<summary>Страница отчетности</summary>
<img width="1869" height="938" alt="изображение" src="https://github.com/user-attachments/assets/ffcc1834-702b-4092-8bb6-581150d40185" />
</details>

<details>
<summary>Главная для водителя</summary>
<img width="1870" height="939" alt="изображение" src="https://github.com/user-attachments/assets/4f5f85a7-c773-4e74-861a-1c2ddaf8adb6" />
</details>

<details>
<summary>Профиль водителя</summary>
<img width="1871" height="940" alt="изображение" src="https://github.com/user-attachments/assets/f1058d79-a789-4e9f-b107-5692871c0c91" />
</details>

**Фишка сайта**

Фишкой стал фоновый воркер Celery при помощи брокера Redis. В фоне создается Excel-таблица с просроченными штрафами, после чего создается общий Word-документ со всеми постановлениями.
Запуск происходит при помощи Docker.
