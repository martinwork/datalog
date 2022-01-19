datalogger.onLogFull(function () {
    logging = 0
    basic.showIcon(IconNames.Heart)
})
input.onButtonPressed(Button.A, function () {
    basic.clearScreen()
    datalogger.deleteLog(datalogger.DeleteType.Full)
    logging = 1
})
input.onButtonPressed(Button.B, function () {
    logging = 0
})
let logging = 0
datalogger.includeTimestamp(FlashLogTimeStampFormat.Milliseconds)
datalogger.mirrorToSerial(true)
datalogger.setColumns(["pitch", "roll", "light"])
logging = 0
basic.forever(function () {
    led.toggle(0, 0)
    basic.pause(1000)
    if (logging) {
        led.toggle(4, 4)
    }
})
loops.everyInterval(200, function () {
    if (logging) {
        datalogger.logData([
        datalogger.createCV("pitch", input.rotation(Rotation.Pitch)),
        datalogger.createCV("roll", input.rotation(Rotation.Roll)),
        datalogger.createCV("light", input.lightLevel())
        ])
    }
})
