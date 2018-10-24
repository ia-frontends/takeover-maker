import SeeThru from 'seethru';
import template from '../markup.html';
import { parserTemplateBaseUrls } from './utils';
import analytics from './analytics';

export default class Takeover {
  isProdEnv = process.env.NODE_ENV === 'production';
  // parser markup depend enviroment
  markup = this.isProdEnv
    ? parserTemplateBaseUrls(`<link rel="stylesheet" href="{{BASE_URL}}/main.css">${template}`)
    : parserTemplateBaseUrls(template);

  render = () => {
    $('body').append(this.markup);
  }

  cache = () => {
    this.tk_obj = $('#takeover');
    this.tk_content = $('#takeover-content');
    this.tk_close = $('#takeover-close');
    this.tk_video = $('#bgvideo');
    this.tk_videoCanv = $('#bgvideo')[0];
    this.tk_mute = $('#takeover-mute');
    this.tk_area = $('.wrapper');
  }

  bindEvents = () => {
    // Here init event listeners
    this.tk_close.on('click', function (e) {
      e.preventDefault();
      this.closeTakeover();
    }.bind(this));

    if (this.isProdEnv) this.tk_content.on('click', analytics.clickHit)
  }

  showTakeover = () => {
    // Here init animations and show takeover
    this.tk_obj.delay(2000).fadeIn(600);
    this.vid();
  }

  vid = () => {
    var $bgVideo = $('#bgvideo')[0]

    this.resizeVideos();
    $('.bs__video').fadeIn();
    SeeThru.create($bgVideo);
    $bgVideo.play();

    this.tk_area.addClass('to-stamp')

    this.tk_video.bind('ended', function () {
      this.closeTakeover();
    }.bind(this));
  }

  closeTakeover = () => {
    this.tk_obj.fadeOut(600);
    this.tk_area.removeClass('to-stamp');
    window.clearTimeout(this.timeout);
  }

  autoClose = () => {
    this.timeout = setTimeout(function () {
      this.closeTakeover();
    }.bind(this), 1000 * 11);
  }

  resizeVideos = () => {
    var vW = 1366;
    var vH = 648;
    var wW = $(window).width();
    var wH = $(window).height();

    var adjW = wW;
    var calcH = Math.round(wW * vH / vW);

    var adjH = wH;
    var calcW = Math.round(wH * vW / vH);

    var fW, fH, fL, fT;
    if (calcW > wW) {
      fW = calcW; fH = adjH; fL = -Math.round((calcW - wW) / 2); fT = 0;
    } else {
      fW = adjW; fH = calcH; fL = 0; fT = -Math.round((calcH - wH) / 2);
    }

    $(".bs__video").css({ width: fW, height: fH, left: fL, top: fT });
    $('.seeThru-display').css({ width: fW, height: fH, left: fL, top: fT });
  }

  constructor() {
    this.render();
    this.cache();
    this.bindEvents();
    this.showTakeover();

    if (this.isProdEnv) analytics.viewHit();
  }
}