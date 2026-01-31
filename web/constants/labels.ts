export const labels = {
  auth: {
    login: 'Войти',
    logout: 'Выйти',
    register: 'Регистрация',
    creatingAccount: 'Создание аккаунта…',
  },
  common: {
    save: 'Сохранить',
    cancel: 'Отмена',
    close: 'Закрыть',
    loadMore: 'Больше товаров',
    learnMore: 'Узнать подробнее',
    updated: 'Обновляется',
    createOne: 'Зарегистрироваться',
    ok: 'Понятно',
    goToPayment: 'Перейти к оплате',
    add: 'Добавить',
    logout: 'Выход',
    delete: 'Удалить',
    login: 'Войти',
    notFound: 'Не найден',
    okText: 'Подтверждаю',
    loading: 'Загрузка',
  },

  account: {
    editAccount: 'Редактирование профиля',
    editPassword: 'Редактирование пароля',
  },

  product: {
    articul: 'Артикул',
    category: 'Категория',
    brand: 'Бренд',
    model: 'Модель',
    color: 'Цвет',
    delivery: 'Доставка',
    payment: 'Оплата',
    FAQ: 'FAQ',
    details: 'Детали',
  },

  cart: {
    checkout: 'Оформить заказ',
    clear: 'Очистить корзину',
    elements: 'Элементы',
    price: 'Цена',
    qnty: 'Количество',
  },
  placeholders: {
    search: 'Поиск товаров',
    email: 'Введите email',
    password: 'Введите пароль',
    name: 'Введите имя',
    phone: '+996 555 555 555',
  },
  fields: {
    name: 'Имя',
    email: 'Email',
    password: 'Пароль',
    currentPassword: 'Текущий пароль',
    phone: 'Номер телефона',
    userAccount: 'Профиль пользователя',
    changePassword: 'Смена пароля',
    newPassword: 'Новый пароль',
    confirmPassword: 'Подтвердите новый пароль',
    favorites: 'Избранное',
    cart: 'Корзина',
  },
  filters: {
    brands: 'Бренд',
    colors: 'Цвета',
    subCategories: 'Группы',
    sizes: 'Размеры',
  },
  validation: {
    nameRequired: 'Введите имя',
    emailRequired: 'Введите email',
    emailInvalid: 'Некорректный email',
    passwordRequired: 'Введите пароль',
    passwordMin6: 'Пароль должен быть не короче 6 символов',
    repeatPassword: 'Повторите новый пароль',
    notEqualPassword: 'Пароли не совпадают',
  },
  hints: {
    auth: {
      loginRequired: 'Сначала войдите в аккаунт',
      haveLogin: 'У вас нет аккаунта?',
      haveRegister: 'Уже есть аккаунт?',
    },
    favorites: {
      add: 'Добавить в избранное',
      remove: 'Убрать из избранного',
    },
    cart: {
      empty: 'Корзина пуста',
      checkoutUnavailable: 'Оформление заказа недоступно в этой версии',
    },
    common: {
      disabledWhileLoading: 'Недоступно во время загрузки',
      notAvailable: 'Нет в наличии',
      mvpText: 'Данный функционал не предусмотрен в этой реализации',
    },
  },
  modal: {
    authRequired: {
      titlePrefix: 'Войдите, чтобы',
      bodyPrefix: 'Чтобы',
      bodySuffix:
        'вам нужно войти. Если у вас нет аккаунта, нужно зарегистрироваться.',
      actionButton: 'Войти / Зарегистрироваться',
      actionLabel: 'сохранять товары',
    },
  },
  footer: {
    catalog: 'Каталог',
    information: 'Инфонмация',
    contacts: 'Контакты',
    subscribe: 'Подписка на новости',
    connect: 'Связаться',
  },
  descriptions: {
    aboutTextFirst: `Команда XWEAR предоставляет услугу доставки только оригинальных
товаров с крупнейшего китайского маркетплейса Poizon, чтобы наши
клиенты экономили более 40% на каждой покупке`,
    aboutTextSecond: `Работаем без посредников, благодаря чему можем предоставлять лучшую
цену. Быстрая, бесплатная доставка.`,
    aboutTextThird: `Сайт, на котором можно будет удобно оформить покупку, не скачивая
китайское мобильное приложение Poizon, с удобной фильтрацией огромного
количества товаров, а также с возможностью сразу увидеть
окончательную цену товара.`,
  },
  titles: {
    aboutTitle: 'О интернет-магазине XWEAR',
  },
} as const;
