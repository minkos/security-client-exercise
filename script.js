// try inputting this: <script>alert('hi')</script>
// Now, try inputting this: <img src="/" onerror = "alert(1);">
// Scripts injected into the DOM via script tags in innerHTML
// are not run at the time they are injected (inline scripts
// are run at the time the original page is parsed). On the
// other hand, images injected into the DOM are loaded at that
// time, and if the loading fails, then the onerror event
//handler is called.
const userInputInHTML = (input) => {
  const p = document.getElementById("pleaseNo")
  // Bad
  // DOM has already run, so html will not run the, <script>alert('boom')</script>, injection, ...
  // ...after load or refresh of browser, however,...
  // images like:, <img src='/', onerror='alert("boom")' />, are injected into the DOM, if loading of image fails, '/', ...
  // ...the handler is called
  p.innerHTML = input;

  // Better
  // document.createTextNode(input): Convert into pure text and "sanitizing" it
  // var textnode = document.createTextNode(input);
  // p.appendChild(textnode);
}
const sendToServer = () => {
  const input = document.querySelector('#userinput').value;
  userInputInHTML(input)
  fetch('http://localhost:3000/secret', {
    method: 'POST',
    body: JSON.stringify({userInput: input}),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  })
}
