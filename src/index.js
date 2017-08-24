import _ from 'lodash';

import './less/base.less';
import './base.css';
import './style.css';
import './css/font-awesome.css';

import imgTest from './img/image.png'



const iconList = 'icon-adjust,icon-tint,icon-edit,icon-share,icon-check,icon-move,icon-step-backward,icon-fast-backward,icon-backward,icon-play,icon-pause,icon-stop,icon-forward,icon-fast-forward,icon-step-forward,icon-eject,icon-chevron-left,icon-chevron-right,icon-plus-sign,icon-minus-sign,icon-remove-sign,icon-ok-sign,icon-question-sign,icon-info-sign,icon-screenshot,icon-remove-circle,icon-ok-circle,icon-ban-circle,icon-arrow-left,icon-arrow-right,icon-arrow-up,icon-arrow-down,icon-mail-forward,icon-share-alt,icon-resize-full,icon-resize-small,icon-plus,icon-minus,icon-asterisk,icon-exclamation-sign,icon-gift,icon-leaf,icon-fire,icon-eye-open,icon-eye-close,icon-warning-sign,icon-plane,icon-calendar,icon-random,icon-comment,icon-magnet,icon-chevron-up,icon-chevron-down,icon-retweet,icon-shopping-cart,icon-folder-close,icon-folder-open,icon-resize-vertical,icon-resize-horizontal,icon-bar-chart,icon-twitter-sign,icon-facebook-sign,icon-camera-retro,icon-key,icon-gears,icon-cogs,icon-comments,icon-thumbs-up-alt,icon-thumbs-down-alt,icon-star-half,icon-heart-empty,icon-signout,icon-linkedin-sign,icon-pushpin,icon-external-link,icon-signin,icon-trophy,icon-github-sign,icon-upload-alt,icon-lemon,icon-phone,icon-unchecked,icon-check-empty,icon-bookmark-empty';


function component() {
    var element = document.createElement('div');
    var img = new Image();
    img.src = imgTest;

    // Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.append(img)
    element.classList.add('hello');

    return element;
}



/*html*/

import Html from './include/html-loader.html';


document.querySelector(".html-demo").innerHTML = Html;


/*iconfont*/
var listDiv = document.createElement('ul')
iconList.split(',').forEach(function(item){
    var li = document.createElement('li');
    li.innerHTML='<i class="fa-5x fa '+item+'"></i>'
    listDiv.append(li)
})

var arr = document.createElement('div'),
    i = 0;
var date1 = new Date();
do {
    arr.append(component());
    i++
} while (i < 2);
document.querySelector(".font-demo").append(listDiv);
document.body.prepend(arr);