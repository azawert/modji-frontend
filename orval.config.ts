module.exports = {
  employee: {
    input: "./src/docs/user.yaml",
    output: {
      target: "./src/generated/user.ts",
      baseUrl: "https://rodionov.ru.fvds.ru:443/",
    },
  },
}
