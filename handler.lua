-- @param data: {
--     message = string,
--     type = string,
--     duration = int
-- }
-- @return void
function sendNotification(data)
    local _data <const> = {
        message = data.message,
        type = data.type or 'info',
        duration = data.duration or 5000
    }

    SendNUIMessage({
        createNew = true,
        data = _data
    })
end

exports('sendNotification', sendNotification)
exports('TriggerNotification', sendNotification)
