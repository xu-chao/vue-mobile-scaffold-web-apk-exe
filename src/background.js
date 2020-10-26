'use strict'

import { app, protocol, BrowserWindow, Menu, ipcMain, Tray } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
// import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
// 注意这个autoUpdater不是electron中的autoUpdater
import { autoUpdater } from 'electron-updater'
// 软件运行根目录
// import { rootPath } from 'electron-root-path'
const path = require('path')
// const os = require('os')
// 更新服务器地址
const uploadUrl = 'http://10.98.98.182:8000/file/%E5%85%B6%E4%BB%96/release/'

// const path = require('path')
const isDevelopment = process.env.NODE_ENV !== 'production'
const electron = require('electron')
const devToolsUrl = 'C:\\Users\\xucha\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Extensions\\nhdogjmejiglipccpnnnanhbledajbpd\\5.3.3_0'

// 托盘对象
var appTray = null
let trayIcon = path.join(__dirname, '../static/app.png')

if (process.mas) app.setName('LampControlExe')

let win

protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

function createWindow () {
  win = new BrowserWindow({
    icon: trayIcon,
    center: true, // 是否出现在屏幕居中的位置
    width: 375,
    height: 812,
    minWidth: 375,
    minHeight: 812,
    // maxWidth: 375,
    // maxHeight: 812,
    // backgroundColor: '#2f86f6',
    webPreferences: {
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION
      // eslint-disable-next-line no-path-concat
      // preload: __dirname + '/preload.js'
    }
    // webPreferences: {
    //   javascript: true,
    //   plugins: true,
    //   nodeIntegration: true, // 是否集成 Nodejs
    //   webSecurity: false
    //   // preload: path.join(__dirname, '/renderer.js') // 但预加载的 js 文件内仍可以使用 Nodejs 的 API
    // }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) {
      win.webContents.openDevTools()
      // session.defaultSession.loadExtension(devToolsUrl)
      BrowserWindow.addDevToolsExtension(devToolsUrl)
    }
  } else {
    createProtocol('app')
    win.loadURL('app://./index.html')
  }

  win.on('closed', () => {
    win = null
  })

  win.on('close', (event) => {
    win.hide()
    win.setSkipTaskbar(true)
    event.preventDefault()
  })

  // 这个方法要调用
  updateHandle()

  if (process.platform === 'win32') {
    // 设置托盘图标和菜单
    var trayMenuTemplate = [
      {
        label: '打开安装目录',
        icon: path.join(__dirname, '../static/setting.png'), // 设置单个菜单项图标
        click: function () {
          electron.shell.showItemInFolder(path.dirname(app.getPath('exe')))
        }
      }, {
        type: 'separator'
      },
      {
        label: '显示/隐藏',
        icon: path.join(__dirname, '../static/view.png'), // 设置单个菜单项图标
        click: () => {
          // win.show()
          win.isVisible() ? win.hide() : win.show()
          if (win.isVisible()) {
            win.setSkipTaskbar(false)
            win.focus()
          }
        }
      },
      {
        label: '关于',
        icon: path.join(__dirname, '../static/info.png'), // 设置单个菜单项图标
        click: function () {
          electron.shell.openExternal('http://10.98.98.182:8080/v10/')
        }
      }, {
        type: 'separator'
      },
      {
        type: 'checkbox',
        label: '开机启动',
        checked: app.getLoginItemSettings().openAtLogin,
        click: function () {
          if (!app.isPackaged) {
            app.setLoginItemSettings({
              openAtLogin: !app.getLoginItemSettings().openAtLogin,
              path: process.execPath
            })
          } else {
            app.setLoginItemSettings({
              openAtLogin: !app.getLoginItemSettings().openAtLogin
            })
          }
        }
      },
      {
        label: '退出',
        icon: path.join(__dirname, '../static/close.png'), // 设置单个菜单项图标
        click: () => {
          win.destroy() // 强制退出
          // app.exit() // 系统调用退出,会保留进程,不推荐
          // app.quit() // 重写了默认退出事件，所以方法不可用
          // app.quit() // 因为程序设定关闭为最小化，所以调用两次关闭，防止最大化时一次不能关闭的情况
        }
      }
    ]
    // 系统托盘图标
    appTray = process.env.NODE_ENV === 'development' ? new Tray('./app.ico') : new Tray(trayIcon)
    // appTray = new Tray(path.join(__dirname, 'favicon.ico'))
    // const trayIcon =
    //   process.env.NODE_ENV === 'development'
    //     ? path.join(__dirname, 'bundled/favicon.ico')
    //     : path.join(__dirname, 'favicon.ico') // 指定托盘图标，推荐使用 ico 图标。
    // // 创建托盘实例
    // appTray = new Tray(trayIcon)
    // 图标的上下文菜单
    const contextMenu = Menu.buildFromTemplate(trayMenuTemplate)
    // 设置此托盘图标的悬停提示内容
    appTray.setToolTip('华强方特')
    // 设置此图标的上下文菜单
    appTray.setContextMenu(contextMenu)
    // 单击右下角小图标显示应用左键
    appTray.on('click', function () {
      win.isVisible() ? win.hide() : win.show()
      if (win.isVisible()) {
        win.setSkipTaskbar(false)
        win.focus()
      }
      // win.show()
      // win.focus()
    })
    // 鼠标双击
    // appTray.on('double-click', () => {
    //   win.isVisible() ? win.hide() : win.show()
    //   if (win.isVisible()) {
    //     win.setSkipTaskbar(false)
    //     win.focus()
    //   }
    //   // win.show()
    //   // win.focus()
    // })
    // 右键
    appTray.on('right-click', () => {
      appTray.popUpContextMenu(trayMenuTemplate)
    })
  }

  // 重写窗口显示与隐藏方法
  // win.on('show', () => {
  //   appTray.setHighlightMode('always')
  // })
  // win.on('hide', () => {
  //   appTray.setHighlightMode('never')
  // })
}

// 自动更新方法
function updateHandle () {
  let message = {
    error: '检查更新出错',
    checking: '正在检查更新……',
    updateAva: '检测到新版本，正在下载……',
    updateNotAva: '现在使用的就是最新版本，不用更新'
  }
  // eslint-disable-next-line no-unused-vars
  const os = require('os')

  autoUpdater.setFeedURL(uploadUrl)
  autoUpdater.on('error', function (error) {
    console.log(error)
    sendUpdateMessage(message.error)
  })
  autoUpdater.on('checking-for-update', function () {
    console.log(message)

    sendUpdateMessage(message.checking)
  })
  autoUpdater.on('update-available', function (info) {
    console.log(message)

    sendUpdateMessage(message.updateAva)
  })
  autoUpdater.on('update-not-available', function (info) {
    sendUpdateMessage(message.updateNotAva)
  })

  // 更新下载进度事件
  autoUpdater.on('download-progress', function (progressObj) {
    win.webContents.send('downloadProgress', progressObj)
  })
  autoUpdater.on('update-downloaded', function (event, releaseNotes, releaseName, releaseDate, updateUrl, quitAndUpdate) {
    ipcMain.on('isUpdateNow', (e, arg) => {
      console.log(arguments)
      console.log('开始更新')
      // some code here to handle event
      autoUpdater.quitAndInstall()
    })

    win.webContents.send('isUpdateNow')
  })

  ipcMain.on('checkForUpdate', () => {
    // 执行自动更新检查
    autoUpdater.checkForUpdates()
  })
}

// 通过main进程发送事件给renderer进程，提示更新信息
function sendUpdateMessage (text) {
  win.webContents.send('message', text)
}

// 开机自启
// const exeName = path.basename(process.execPath)

// app.setLoginItemSettings({
//   openAtLogin: true,
//   openAsHidden: false,
//   path: process.execPath,
//   args: [
//     '--processStart', `"${exeName}"`
//   ]
// })

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    // win.hide()
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})

const gotTheLock = app.requestSingleInstanceLock()
if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    if (win) {
      if (win.isMinimized()) win.restore()
      win.show()
      win.focus()
    }
  })
  app.on('ready', async () => {
    // if (isDevelopment && !process.env.IS_TEST) {
    //   // Install Vue Devtools
    //   try {
    //     await installExtension(VUEJS_DEVTOOLS)
    //   } catch (e) {
    //     console.error('Vue Devtools failed to install:', e.toString())
    //   }
    // }
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu) // 设置菜单部分
    createWindow()
    // 开机自启
    const exeName = path.basename(process.execPath)

    app.setLoginItemSettings({
      openAtLogin: true,
      openAsHidden: false,
      path: process.execPath,
      args: [
        '--processStart', `"${exeName}"`
      ]
    })
  })
}
// app.on('ready', async () => {
//   if (isDevelopment && !process.env.IS_TEST) {
//     // Install Vue Devtools
//     try {
//       await installExtension(VUEJS_DEVTOOLS)
//     } catch (e) {
//       console.error('Vue Devtools failed to install:', e.toString())
//     }
//   }
//   const menu = Menu.buildFromTemplate(template)
//   Menu.setApplicationMenu(menu) // 设置菜单部分
//   createWindow()
// })

app.on('browser-window-created', function () {
  let reopenMenuItem = findReopenMenuItem()
  if (reopenMenuItem) reopenMenuItem.enabled = false
})

app.on('window-all-closed', function () {
  let reopenMenuItem = findReopenMenuItem()
  if (reopenMenuItem) reopenMenuItem.enabled = true
  // win.hide()
  app.quit()
})

/**
 * 注册键盘快捷键
 * 其中：label: '切换开发者工具',这个可以在发布时注释掉
 */
let template = [
  {
    label: '操作',
    submenu: [{
      label: '重新加载',
      accelerator: 'CmdOrCtrl+R',
      click: function (item, focusedWindow) {
        if (focusedWindow) {
          if (focusedWindow.id === 1) {
            BrowserWindow.getAllWindows().forEach(function (win) {
              if (win.id > 1) {
                win.close()
              }
            })
          }
          focusedWindow.reload()
        }
      }
    }, {
      type: 'separator'
    }, {
      label: '关闭',
      accelerator: 'CmdOrCtrl+W',
      role: 'close'
    }]
  },
  {
    label: '窗口',
    role: 'window',
    submenu: [{
      label: '最小化',
      accelerator: 'CmdOrCtrl+M',
      role: 'minimize'
    }, {
      label: '置顶',
      type: 'checkbox',
      // role: 'front',
      accelerator: (function () {
        if (process.platform === 'darwin') {
          return 'Alt+Command+I'
        } else {
          return 'Ctrl+Shift+I'
        }
      })(),
      checked: false,
      click: function () {
        win.isAlwaysOnTop() === true ? win.setAlwaysOnTop(false, 'normal', 1) : win.setAlwaysOnTop(true, 'normal', 1)
        // win.setAlwaysOnTop(true, 'normal', 1)
      }
      // click: function (item, focusedWindow) {
      //   if (focusedWindow) {
      //     focusedWindow.toggleDevTools()
      //   }
      // }
    }, {
      type: 'separator'
    }]
  },
  {
    label: '帮助',
    role: 'help',
    submenu: [{
      label: '意见反馈',
      click: function () {
        electron.shell.openExternal('http://10.98.98.182:8080/v10/')
      }
    }, {
      type: 'separator'
    }, {
      label: '关于',
      accelerator: 'CmdOrCtrl+B',
      click: function () {
        electron.shell.openExternal('http://10.98.98.182:8080/v10/')
      }
      // role: 'about'
    }]
  }
]

/**
* 增加更新相关的菜单选项
*/
function addUpdateMenuItems (items, position) {
  if (process.mas) return

  const version = electron.app.getVersion()
  let updateItems = [{
    label: `Version ${version}`,
    enabled: false
  }, {
    label: '检查更新',
    enabled: false,
    key: 'checkingForUpdate'
  }, {
    label: '检查更新',
    visible: false,
    key: 'checkForUpdate',
    click: function () {
      require('electron').autoUpdater.checkForUpdates()
    }
  }, {
    label: '重启并安装更新',
    enabled: true,
    visible: false,
    key: 'restartToUpdate',
    click: function () {
      require('electron').autoUpdater.quitAndInstall()
    }
  }]

  items.splice.apply(items, [position, 0].concat(updateItems))
}

function findReopenMenuItem () {
  const menu = Menu.getApplicationMenu()
  if (!menu) return

  let reopenMenuItem
  menu.items.forEach(function (item) {
    if (item.submenu) {
      item.submenu.items.forEach(function (item) {
        if (item.key === 'reopenMenuItem') {
          reopenMenuItem = item
        }
      })
    }
  })
  return reopenMenuItem
}

// 针对Mac端的一些配置
if (process.platform === 'darwin') {
  const name = electron.app.getName()
  template.unshift({
    label: name,
    submenu: [{
      label: 'Quit ( 退出 )',
      accelerator: 'Command+Q',
      click: function () {
        app.quit()
      }
    }]
  })

  // Window menu.
  template[3].submenu.push({
    type: 'separator'
  }, {
    label: 'Bring All to Front',
    role: 'front'
  })

  addUpdateMenuItems(template[0].submenu, 1)
}

// 针对Windows端的一些配置
if (process.platform === 'win32') {
  const helpMenu = template[template.length - 1].submenu
  addUpdateMenuItems(helpMenu, 0)
}

if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
