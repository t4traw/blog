let txt = document.getElementById('lets_be_friends').innerHTML.split('')
document.getElementById('lets_be_friends').innerHTML = ''
for (i = 0; i < txt.length; i++) {
  let span = document.createElement('span')
  span.innerHTML = txt[i]
  document.getElementById('lets_be_friends').appendChild(span)
}