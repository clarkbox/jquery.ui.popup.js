jquery.ui.popup.js
==================

proposed rewrite of popup

```
<a href="#" id="button">click for popup</div>
<div id="popup" style="display:none;">POP</popup>

```

```
//open #popup when #button is clicked
$('#button').popup({popup:$('#popup')});

//delegate
$('body').popup({delegate:'#button', popup:$('#popup')});

//change event
$('body').popup({delegate:'#button', event: 'dblclick', popup:$('#popup')});
```