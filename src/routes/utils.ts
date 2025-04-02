import { APP_ROUTES, AppRoutes } from "./types"

/**
 * Находит ключ маршрута по его значению с учетом любого количества параметров
 * @param pathValue - проверяемый путь
 * @returns Ключ маршрута или null, если не найден
 */
export function getRouteKeyByPath(pathValue: string): keyof AppRoutes | null {
  const staticRoutes = Object.entries(APP_ROUTES).filter(
    ([, value]) => typeof value === "string"
  ) as Array<[keyof AppRoutes, string]>

  for (const [key, staticPath] of staticRoutes) {
    if (staticPath === pathValue) {
      return key
    }
  }

  const dynamicRoutes = Object.entries(APP_ROUTES).filter(
    ([, value]) => typeof value === "function"
  ) as Array<[keyof AppRoutes, Function]>

  for (const [key, generator] of dynamicRoutes) {
    const testParams = Array.from({ length: 10 }, (_, i) => `:param${i + 1}`)
    const testPath = generator(...testParams)

    const regexPattern =
      "^" + testPath.replace(/\/:\w+/g, "/([^/]+)").replace(/\?/g, "\\?") + "$"

    if (new RegExp(regexPattern).test(pathValue)) {
      return key
    }
  }

  return null
}
