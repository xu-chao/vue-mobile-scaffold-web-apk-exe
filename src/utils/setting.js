import db from './dexie'
const { setting } = db

export default {
  async find () {
    return setting.get({ id: 0 })
  },
  async update (docs) {
    return setting.update(0, docs)
  }
}
