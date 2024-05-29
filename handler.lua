local USE_SOUND <const> = false -- Set to true if you want to use sound for notifications

--- @param data: table<{ message = string, type = string, duration = int }>
--- @return void
function sendNotification(data)
    local _data <const> = {
        message = data.message,
        type = data.type or 'info',
        duration = data.timeout or 5000,
        title = data.title or 'Notification',
    }

    if USE_SOUND then
        PlaySoundFrontend(-1, 'Click', 'DLC_HEIST_HACKING_SNAKE_SOUNDS', 0) -- Thanks to https://github.com/MrMillxr
    end

    SendNUIMessage({
        createNew = true,
        data = _data
    })
end

-- ? Event To Send Notification
RegisterNetEvent("skeexsNotify:sendNotify", function(data)
    sendNotification(data)
end)

exports('sendNotification', sendNotification)
exports('TriggerNotification', sendNotification)
