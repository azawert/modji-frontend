import { LINKS_FOR_HEADER } from "./data"

export const getSelectedLink = (pathname?: string): string =>
  LINKS_FOR_HEADER.find(l => l.href === pathname)?.label ??
  LINKS_FOR_HEADER[0].label
