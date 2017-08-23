chrome.extension.sendMessage({}, function (response) {
  var readyStateCheckInterval = setInterval(function () {
    if (document.readyState === 'complete') {
      clearInterval(readyStateCheckInterval)
      document.addEventListener('copy', copied)
    }
  }, 10)
})

function copied () {
  chrome.storage.sync.get('tally', function (data) {
    const tally = data.tally || []

    const date = new Date()
    const dateString = (date.getMonth() + 1) + '/' + (date.getDate() - 2) + '/' + date.getFullYear()

    chrome.storage.sync.set({
      tally: tally.concat(dateString)
    })

    chrome.storage.sync.get(null, function (data) { console.info(data) })
  })
}
