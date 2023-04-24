export const isInternalLink = url => {
  return /^\/(?!\/)/.test(url)
}
