function TriggerNotification(DATA) 
    SendNUIMessage({
        createNew = true,
        data = DATA
    })
end
