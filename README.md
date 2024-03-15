<h1>
    Skeexs Notify<br>
</h1>

<p>
    <b>FiveM notification script for roleplay servers</b>
    <br>
    <a href="https://discord.gg/Frxv6uPCFN">Skeexs Inc. Discord Server</a>
</p>

<h2>Documentation for you server owners</h2>

<ol>
    <li>Download the resource and start it in your server.cfg</li>
    <pre>ensure skeexsNotify</pre>
    <li>If youre using ESX Legacy, Goto `es_extended/client/functions.lua` and replace `ESX.ShowNotification` with the following code: <br/>

```lua
    ESX.ShowNotification = function(message, type, options)
        if GetResourceState("skeexsNotify") ~= "started" then
            print("skeexsNotify is not started")
            return
        end

        exports.skeexsNotify:sendNotification({
            type = type or "info",
            message = message or "No message",
            title = options.type or "Notification",
            timeout = options.timeout or 5000
        })
    end
```

</li>

</ol>

<h5>Types of notifications</h5>
<ul>
    <li>success</li>
    <li>info</li>
    <li>error</li>
    <li>message</li>
    <li>phone</li>
    <li>bag</li>
</ul>

<h4>To add an notification-type</h4>
<p>Go to `app.js` and add a new type like this in the `$TYPES` Object:</p>

```js
    ["iconname"]: {
        ["icon"]: "bi bi-telephone-inbound",
        prefix: "~g~", // GTA color codes, doesn't need to be set. Just adds color to the message
    },
```

<h3>Icons</h3>

<H5>ALL THE ICONS NEED TO BE FROM BOOTSTRAP</H5>
<a href="https://icons.getbootstrap.com/">Bootstrap Icons</a>
<br/>

<h2>Events</h2>
<p>There are 2 events you can use to send notifications to the client</p>

```lua
    TriggerClientEvent("skeexsNotify:sendNotification", source, {
        type = "info",
        message = "This is a notification",
        title = "Notification",
        timeout = 5000
    })
```

```lua
    exports.skeexsNotify:sendNotification({
        type = "info",
        message = "This is a notification",
        title = "Notification",
        timeout = 5000
    })
```
