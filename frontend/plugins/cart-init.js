export default ({ store }) => {
  if (process.client) {
    store.dispatch('initCart')
  }
}
