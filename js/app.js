console.log('Am I wired up!')

if( typeof myApiSecret === 'undefined' ){  var myApiSecret = ''  }




var forEach = function(arr, cb) {
  for(var i = 0; i < arr.length; i += 1) {
    cb(arr[i], i, arr)
  }
}

var router = function() {
  var selectedUser = window.location.hash.slice(1)
  console.log('User', selectedUser)
  console.log('hash', window.location.hash)
  if(selectedUser.length === 0) {
    mainPage()
    return

  }
  console.log(selectedUser)
  moviesPage(selectedUser)

}

var mainPage = function() {
  var mainPStr =  '<div class="row container1">'
      mainPStr += "<h1>Who's Watching?</h1>"

    for(var prop in userList) { console.log('prop', prop)
      mainPStr += '<div class="col-xs-6 col-sm-3 text-center userbox">'
      mainPStr +=   '<a href="#' + prop + '">'
      mainPStr +=     '<img src="https://flathash.com/' + prop + '">'
      mainPStr +=     '<h3>' + userList[prop].username + '</h3>'
      mainPStr +=   '</a>'
      mainPStr += '</div>'
    }

    mainPStr += '</div>'
    console.log('showIds', userList[prop].showIds)
    appContainer.innerHTML = mainPStr
}

var moviesPage = function(usr) {
  var userObj = userList[usr]
// <h3 class="homeButton"></h3>
  var HTMLStr = '<a href="#" class="homeButton"><i class="fa fa-home fa-4x houseIcon" aria-hidden="true"></i></a>'
      HTMLStr += '<h2 >All <span class="bg-danger" style="font-size:2em; color:#000">' + userObj.username + '\'s</span> Shows </h2>'
      HTMLStr +='<div class="row shows-list"></div>'
      console.log('HTMLStr', HTMLStr)
      appContainer.innerHTML = HTMLStr

  var firstShowId = userObj.showIds[0]
  console.log('showId[0]', firstShowId);
  forEach(userObj.showIds, function(elementIdNum) {
    console.log('elementID' , elementIdNum)

    $.getJSON("http://api.tvmaze.com/shows/" + elementIdNum).then(function(dataResponse) {
      console.log(dataResponse)
      var showsListContainerEl = document.querySelector('.shows-list')

      var showStr = '<div class="col-sm-3 columnContainer text-center">'
          showStr +=    "<img src='" + dataResponse.image.medium + "'>"
          showStr +=    "<h4>" + dataResponse.name + "</h4>"
          showStr += '</div>'

      showsListContainerEl.innerHTML += showStr

    })
  })
}

var userList = {
   matt: {username: "Matt", showIds: [170,169,175,318,76,270, 255]},
   ed: {username: "Ed", showIds: [5853,431,80,279,570,76,73,20540,83,17119]},
   michelle: {username: "Michelle", showIds: [83,576,735,73,749,170,112,80]},
   justin: {username: "Justin", showIds: [551,169,490,530,73,302, 547, 532]},
}

var appContainer = document.querySelector('#app-container')


router()
window.addEventListener('hashchange', router)//router
