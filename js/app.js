const appRoot = document.querySelector('.app')

window.getActivities().then(main)
function main(activities) {
  for(let activity of activities) {
    appRoot.appendChild(activityView(activity))
  }
}

function activityView(activity) {
  const node = document.createElement('div')
  node.classList.add('activity')

  node.innerHTML = `
    <img src="${activity.image || ''}" height="32">
    <strong>${activity.title}</strong>
    <p>${activity.description}</p>
  `

  node.addEventListener('click', function() {
    alert(`You clicked the ${activity.title} event!`)
  })

  return node
}
