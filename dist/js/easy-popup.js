'use strict';
/**
 * 简单的弹窗插件
 * version: 1.0.0 (Wed, 14 August 2015)
 * @author Seven Tao
 * @requires jQuery
 *
 * @param drag 可拖拽 default:true
 * @param closeBtn 有关闭按钮 default:true
 * @param clickOnOverlayer 点击遮罩关闭弹窗 default:true
 * @param contents html代码 default:'<div class="easy-contents"></div>'
 * @param afterClose 回调函数 default:null
 * @usage
 * 引用easy-popup.css 和 easy-popup.js(在jquery之后)
 * 根据设计，重写.easy-contents和.easy-close
 * $('.showbtn').click(function() {
        $.easypop({
            contents: '<div class="easy-contents">' +
                '<h1>Easy-popup</h1>' +
                '<br><p>让设计师随意设计，我只需要把它弹出来就行了~</p>'+
                '</div>',
            afterClose:function(){
            	$('.showbtn').html('So Easy!');
            }
        });
    });
 */

(function($) {
    var defaults = {},
        settings = {},
        tpl = {},
        D = $(document),
        B = $('body');

    // 初始化
    $.easyinit = function() {
        defaults = {
            drag: true,
            closeBtn: true,
            clickOnOverlayer: true,
            contents: '<div class="easy-contents"></div>',
            afterClose: null
        };
        settings = {};
        tpl = {
            overlay: '<div class="easy-overlay"></div>',
            closeBtn: '<a href="javascript:$.easypop.close();" class="easy-close">&#x58;</a>',
            loading: '<div class="easy-loading"></div>'
        };
    };
    $.easyinit();

    // 弹窗主方法
    $.easypop = function(options) {
        $.easyinit();
        // 显示loading
        $.easypop.showLoading();

        // 继承用户设置
        settings = $.extend(defaults, options);

        // 将遮罩append到body里面
        B.prepend(tpl.overlay);
        var overlay = $('.easy-overlay');
        // 将弹窗append到遮罩里面
        overlay.append(settings.contents);
        var contents = $('.easy-contents');
        // 弹窗水平垂直居中
        contents.css({
            marginLeft: -contents.innerWidth() / 2 + 'px',
            marginTop: -contents.innerHeight() / 2 + 'px'
        });
        // 将关闭按钮append到弹窗里面
        if (settings.closeBtn) {
            contents.prepend(tpl.closeBtn);
        };
        // 显示弹窗,移除loading
        overlay.fadeIn(function() {
            $.easypop.hideLoading();
        });
        // 阻止点击弹窗时的事件冒泡
        contents.click(function(event) {
            event.stopPropagation();
        });
        // 点击遮罩关闭弹窗
        if (settings.clickOnOverlayer) {
            overlay.click(function() {
                $.easypop.close();
            });
        };
        // 拖拽
        if (settings.drag) {
            var cnt = {};
            contents.bind("mousedown", function(event) {
                cnt.startY = event.pageY;
                cnt.startX = event.pageX;
                cnt.offY = contents.offset().top;
                cnt.offX = contents.offset().left;
                cnt.distanceX = cnt.startX - cnt.offX;
                cnt.distanceY = cnt.startY - cnt.offY;
                // 只有弹窗的顶部35px内才能触发拖拽
                if (cnt.distanceY > 0 && cnt.distanceY < 35) {
                    // 标志开始拖拽
                    cnt.drag = true;
                    // 鼠标样式改为move
                    contents.css('cursor', 'move');
                    disableText();
                };
            });
            D.bind("mousemove", function(event) {
                if (cnt.drag) {
                    cnt.moveY = event.pageY;
                    cnt.moveX = event.pageX;
                    contents.offset({
                        left: cnt.moveX - cnt.distanceX,
                        top: cnt.moveY - cnt.distanceY
                    })
                }
            });
            D.bind("mouseup", function(event) {
                cnt.drag = false;
                contents.css('cursor', 'default');
                enableText();
            });
        };
    };

    // 关闭方法
    $.easypop.close = function() {
        var overlay = $('.easy-overlay');
        overlay.fadeOut(function() {
            overlay.remove();
            if (settings.afterClose) {
                settings.afterClose();
            };
        });
    };

    // 显示loading
    $.easypop.showLoading = function() {
        B.prepend(tpl.loading);
    };

    // 移除loading
    $.easypop.hideLoading = function() {
        var loading = $('.easy-loading');
        loading.remove();
    };


    // 禁用文本选择
    function disableText() {
        if (document.all) {
            document.onselectstart = function() {
                return false;
                //for ie
            };
        } else {
            document.onmousedown = function() {
                return false;
            };
        }
    };

    function enableText() {
        if (document.all) {
            document.onselectstart = function() {
                return true;
                //for ie
            };
        } else {
            document.onmousedown = function() {
                return true;
            };
        }
    };

}(jQuery));
