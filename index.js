const { app, BrowserWindow, Menu, globalShortcut  } = require('electron')

// set environment
process.env.NODE_ENV = 'developer'

const isDev = process.env.NODE_ENV !== 'production' ? true : false
const isMac = process.platform === 'darwin' ? true : false

let mainWindow

function createMainWindow() {
    mainWindow = new BrowserWindow({
        width: 500,
        height: 600,
        title: "ImageShrink",
        icon: './assets/icons/Icon_256x256.png',
        resizable: isDev ? true : false,
        backgroundColor: '#ffffff'
    })

    // mainWindow.loadURL(`file://${__dirname}/app/index.html`)
    mainWindow.loadFile('./app/index.html')

}

app.on('ready', () => {
    createMainWindow()

    const mainMenu = Menu.buildFromTemplate(menu)
    Menu.setApplicationMenu(mainMenu)
    
    globalShortcut.register('CmdOrCtrl+R', () => mainWindow.reload() )
    globalShortcut.register(isMac ? 'Command+Alt+I' : 'Ctrl+Shift+I', () => mainWindow.toggleDevTools() )

    mainWindow.on('ready', () => mainWindow = null)
})

const menu = [
    ...(isMac ? [
        { role: 'appMenu' }
    ] : []),
    {
        role: 'filemenu'
    },
    ...(isDev ? [
        {
            label: 'Developer',
            submenu: [
                { role: 'reload' },
                { role: 'forcereload' },
                { type: 'separator' },
                { role: 'toggledevtools' },
            ]
        }
    ] : [])
]

app.on('window-all-closed', () => {
    if(!isMac) {
        app.quit()
    }
})

app.on('activate', () => {
    if(BrowserWindow.getAllWindows().length === 0) {
        createMainWindow()
    }
})