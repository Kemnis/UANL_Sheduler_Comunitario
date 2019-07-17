// ♪♫ I'm sittin' here in the boring room ♪♫
const { app, BrowserWindow } = require('electron');
notifier = require('node-notifier');
var fs  = require('fs');
var ms = 600000; //60 s= 1m

let win

// ♪♫ I'm wasting my time ♪♫
function createWindow () 
{

    //♪♫ I'm waitin' for you ♪♫

    win = new BrowserWindow({ width: 800, height: 600, show: false })
  
    win.maximize()
    win.show()
  
    win.loadURL('https://www.uanl.mx/enlinea/')
    
    notifier.notify({title: 'UANL Sheduler NODEJS', message: 'Sistema programado para revisar cada: ' + ((ms/1000)/60) + ' Minutos', icon: "./img" + '/UANL.jpg', sound: true, wait: true});

    // ♪♫ I'd like to change my point of view ♪♫

    //  Fragment 1 Click
    setInterval(function() {
        win.webContents.sendInputEvent({type:'mouseDown', x:140, y: 122, button:'left', clickCount: 1});
        win.webContents.sendInputEvent({type:'mouseUp', x:140, y: 122, button:'left', clickCount: 1});

        // ♪♫ I wonder ♪♫

    //  Fragment 2 Save
        setTimeout(function() {
            win.webContents.savePage('./tmp/test.html', 'HTMLComplete', (error) => {

                // ♪♫ I wonder how ♪♫

                if (!error) 
                {
                    console.log('Página guardada exitosamente');
                    //  Fragment 3 Exract
                    fs.readFile("./tmp/test_files/ssc_inicio_asprnt_00.html", function (err, data) {
                        if (err) throw err;
                        var str = data.toString();
                        var firstvariable = `<td style="text-align:LEFT" class="rpDet_TD_Center_ch">&nbsp;`;
                        var secondvariable = `<br>&nbsp;`;
                        var re = new RegExp(firstvariable + "(.*)" + secondvariable, "g");
                        var matches = [];
                        var count=0;
                        var ComunitarioDescente = 0;

                        // ♪♫ I wonder why ♪♫

                        do {
                            matches = re.exec(str);
                            count++;
                            if (matches){
                            if (!matches[1].includes("CARITAS")) {
                                console.log(matches[1]+ "  Count: " +count);
                                ComunitarioDescente++;
                            }
                            }
                        } while (matches);
                        if(ComunitarioDescente != 0)
                        {

                            // ♪♫ Yesterday you told me 'bout the blue blue sky ♪♫

                            notifier.notify(
                            {
                                title: 'Comunitarios Nuevos',
                                message: 'Existen nuevas plazas que no son Caritas',
                                icon: "./img" + '/UANL.jpg', 
                                sound: true,
                                wait: true 
                            },
                            function(err, response) {
                            }
                            );

                            // ♪♫ And all that I can see is just a yellow lemon tree ♪♫

                            console.log('Comunitarios que no son caritas disponibles... Cantidad = ' + ComunitarioDescente);
                        }
                    });
                // Fragment 3 END
                }
            })
        }, 10000);
        // Fragment 2 END
    }, ms); 
    // Fragment 1 END
  
    // ♪♫ And I wonder, wonder ♪♫
  
    win.on('closed', () => {
        win = null
    })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    console.log("Cerrando UANL Sheduler");
    app.quit()
  }
})

// ♪♫ And all that I can see ♪♫

app.on('activate', () => {
    if (win === null) {
      createWindow()
    }
  })

// ♪♫ Is just a yellow lemon tree ♪♫