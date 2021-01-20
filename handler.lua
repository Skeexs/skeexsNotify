function TriggerNotification(DATA) 
    SendNUIMessage({
        createNew = true,
        data = DATA
    })
end

RegisterCommand("r", function()
    TriggerNotification({
        type = "phone",
        message = "Nya notificationer"
    })
end)