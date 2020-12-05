const users = [
  {
    name: `Орлов Дима`,
    wish: `-`,
    dontWish: `-`,
  },
  {
    name: `Илья Куликов`,
    wish: `Плиз, только не книги по C#`,
    dontWish: `Плиз, только не книги по C#`,
  },
  {
    name: `Олег Породников`,
    wish: `Можно что-то съедобное =)`,
    dontWish: `Плед, носочки, текстиль, одежду `,
  },
  {
    name: `Илья Власов`,
    wish: `-`,
    dontWish: `Купоны на посещение воркшопов`,
  },
  {
    name: `Артем Горев`,
    wish: `прошлогодний Оливье (CEO), портрет Меркель с автографом Коляна, пачка аспирина из Нидерландов`,
    dontWish: `то что я не смогу съесть`,
  },
  {
    name: `Алексей Темнов`,
    wish: `Любая хрень сойдёт =)`,
    dontWish: `Книги, консервы и кружки`,
  },
  {
    name: `Анна Горева`,
    wish: `Что-нибудь для уюта, что-то связанное с вышивкой крестом`,
    dontWish: `Алкоголь`,
  },
  {
    name: `Дарья Соколова`,
    wish: `Молочный шоколад `,
    dontWish: `что-то с символикой года, кружка`,
  },
  {
    name: `Марта Харитонова`,
    wish: `Пожалуй, перечислю, что мне нравится, а подстроиться под это, думаю, будет проще:
- сноуборд да и в принципе спорт,
- изучение языков НЕ программирования,
- дрессировка и воспитание собак`,
    dontWish: `Не дарить еду, вот совсем) на некоторые продукты есть аллергия`,
  },
  {
    name: `Зашкалов Илья`,
    wish: `-`,
    dontWish: `-`,
  },
  {
    name: `Колян Неверов`,
    wish: `Клевая монетка`,
    dontWish: `iphone 12`,
  },
  {
    name: `Ольга Зайцева`,
    wish: `-`,
    dontWish: `сладкий подарок`,
  },
  {
    name: `Дмитрий Лукьянов`,
    wish: `-`,
    dontWish: `очки, линзы, монокль`,
  },
  {
    name: `Бражник Сергей`,
    wish: `-`,
    dontWish: `-`,
  },
  {
    name: `Илья Юдин`,
    wish: `Прикольное`,
    dontWish: `Носки`,
  },
  {
    name: `Елена Орлова`,
    wish: `-`,
    dontWish: `-`,
  },
  {
    name: `Владислав Жданов`,
    wish: `-`,
    dontWish: `-`,
  },
  {
    name: `Алешка Кряжев`,
    wish: `Свобода, здоровье или БМВ, на край аппликатор Кузнецова`,
    dontWish: `все что выплюнет фанатик-веган, а также бухло, копилку, кружку, бритву`,
  },
  {
    name: `Хлызова Валерия`,
    wish: `сладенькое, что-то хорошее почитать`,
    dontWish: `я не привередливый, все можно`,
  },
  {
    name: `Сергей Комаров`,
    wish: `поставьте звездочек моим репам на гитхабе`,
    dontWish: `носки и пену для бритья`,
  },
];

const calculateTarget = (players) => {
  const targets = [...players];
  targets.sort(() => 0.5 - Math.random());

  while (existCoincidences(targets, players)) {
    targets.sort(() => 0.5 - Math.random());
  }

  players.forEach((player, index) => (player.target = targets[index]));
};

const existCoincidences = (targets, players) => !!players.find((player, index) => player.name === targets[index].name);

calculateTarget(users);

for (let user of users) {
  const userName = user.name;
  const target = `
  Имя: ${user.target.name}
  
  Пожелания: 
  ${user.target.wish}
  
  Что не дарить ни в коем случае: 
  ${user.target.dontWish}

  Регламент:
    - Подарок нужно упаковать
    - На подарке должно быть указано имя получателя
    - День Х - 13 декабря
    - Место Y - офис / корпоративный дом 
    - Минимальная стоимость подарка: 500 рублей
  `;
  console.log(target.length);
  console.log(userName);
  console.log(`
    // Вставьте это в консоль браузера:
    decodeURIComponent(atob("${Buffer.from(target).toString('base64')}")
      .split('')
      .map((ch) => '%' + ('00' + ch.charCodeAt(0).toString(16)).slice(-2))
      .join('')
    );
  `);
  console.log('==============');
}
