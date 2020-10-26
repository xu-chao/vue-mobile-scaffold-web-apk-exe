import Dexie from 'dexie'
import { setting } from './initData'

const db = new Dexie('xuchao')

db.version(3).stores({
  setting: 'id, theme, site, shortcut, view'
})

db.on('populate', () => {
  db.setting.bulkAdd(setting)
})

db.open()

export default db
