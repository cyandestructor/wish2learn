function activarlo(){
    var metermochi = "nav-link active" ;
    var metermochi2 = "nav-link" ;
  //  var metermochi3 = document.getElementById(home-tab);
   
    const demoId = document.querySelector('#miscursosindex');
    demoId.removeAttribute('class');
    demoId.setAttribute('class', 'nav-link');
    const demoId2 = document.querySelector('#mimochilacursos2');
    demoId2.setAttribute('class', 'nav-link active');

    const demoId3 = document.querySelector('#home');
    demoId3.removeAttribute('class');
    demoId3.setAttribute('class', 'tab-pane fade container');
    const demoId4 = document.querySelector('#mimochilacursos');
    demoId4.setAttribute('class', 'tab-pane fade show active container');
    
}

module.exports = {
    "activarlo": activarlo
}