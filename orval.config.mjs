// eslint-disable-next-line no-undef
module.exports = {
  employee: {
    input: "./src/docs/user.yaml",
    output: {
      target: "./src/generated/user.ts",
      baseUrl: "https://rodionov.ru.fvds.ru:443/",
    },
  },
  rooms: {
    input: "./src/docs/room.yaml",
    output: {
      target: "./src/generated/room.ts",
      baseUrl: "https://rodionov.ru.fvds.ru:443/",
    },
  },
  categories: {
    input: "./src/docs/categories.yaml",
    output: {
      target: "./src/generated/categories.ts",
      baseUrl: "https://rodionov.ru.fvds.ru:443/",
    },
  },
  owners: {
    input: "./src/docs/owners.yaml",
    output: {
      target: "./src/generated/owners.ts",
      baseUrl: "https://rodionov.ru.fvds.ru:443/",
    },
  },
}
