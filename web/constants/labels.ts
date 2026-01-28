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
  },
  cart: {
    checkout: 'Оформить заказ',
    clear: 'Очистить корзину',
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
    },
  },
  modal: {
    authRequired: {
      titlePrefix: 'Войдите, чтобы',
      bodyPrefix: 'Чтобы',
      bodySuffix:
        'вам нужно войти. Если у вас нет аккаунта, нужно зарегистрироваться.',
      actionButton: 'Войти / Зарегистрироваться',
      actionLabel: 'сохранять товары в избранное',
    },
  },
} as const;
