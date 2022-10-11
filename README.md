# skeexsNotify
FiveM notification script for roleplay servers



<h1>Documentation</h1>

The first thing you need to do is to download the resource and start it in your server.cfg

<pre>ensure skeexsNotify</pre>

<p> There are different types: <b style="color: lightgreen">"success" </b> | <b style="color: lightblue">"info" </b> | <b style="color: red"> "error"</b> | <b style="color: lightpink"> "message" </b> | <b> "phone" </b> | <b> "bag" </b> </p>

```lua
exports["skeexsNotify"]:TriggerNotification({
  ['type'] = "success",
  ['message'] = 'This is a showoff notification'
})
```

That will look something like this<br>
![demo](https://i.gyazo.com/d412326400f69df6452c838e4281c5a4.png)


<h3>ESX.ShowNotification example</h3>


```lua
ESX.ShowNotification = function(message, type)
    exports["skeexsNotify"]:TriggerNotification({ ['type'] = type, ['message'] = message })
end
```

<h1>All of the available types:</h1>
<img src="https://i.gyazo.com/8a634e691a9c855d5cfcfdcbbf14739a.png">
<img src="https://i.gyazo.com/126825fc098aeda710fba3a420d1e079.png"> 
<img src="https://i.gyazo.com/b5fe55c51c5d18e5d3435e1564245aad.png"> 
<img src="https://i.gyazo.com/8fdeb553ccdd1a3e95cf9e80b31055e3.png">
<img src="https://i.gyazo.com/bc24adf07a103ed1fb9c8dce70320a43.png">


If you want to edit the icons you can find the collection of icons at <br>
https://icons.getbootstrap.com/

or if you want to change the icons you can do that in the JS file like this <br>

```js
  ["iconname"]: {
    ["icon"]: "bi bi-telephone-inbound",
  },
```

Also in these notifications are you able to use the gta color codes<br>
<pre>~g~, ~y~, ~s~, ~b~ etc</pre>

Bablo hälsar!
