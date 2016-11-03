function addLoadEvent(functionName){
    var oldFunctions = window.onload;

    if(!oldFunctions){
        window.onload = function(){
            functionName();
        }
    }else{
        window.onload = function(){
            oldFunctions();
            functionName();
        }
    }

}

addLoadEvent(analyseForm);

/* -----------------------页面加载的函数------------------------ */
function analyseForm(){
    var i;

    //遍历所有[自定义Select元素]
    var selectDoms = document.getElementsByClassName('input_select_wrp');
    for(i=0;i<selectDoms.length;i++){
        var selectDom = selectDoms[i];
        selectDom.onclick = function(){
            //为每个[自定义Select元素]添加点击事件
            //点击用于触发:是否显示[自定义Option选项列表]
            selectClick(this);
        };
    }

    //遍历所有[自定义Option选项元素]
    var optionDoms = document.getElementsByClassName('input_option');
    for(i=0;i<optionDoms.length;i++){
        var optionDom = optionDoms[i];
        //获取一整块Option的id,用于显示和隐藏
        var optionId = optionDom.id;

        //遍历这个Option中的所有item,为他们添加点击事件
        var itemDoms = optionDom.getElementsByClassName('input_option_item');
        for(var j=0;j<itemDoms.length;j++){
            var itemDom = itemDoms[j];
            itemDom.onclick = function(){
                optionItemClick(optionId,this);
            }
        }
    }

    //遍历所有[自定义File元素]
    //为他们添加previewImg方法
    var fileDoms = document.getElementsByClassName('edit-file');
    for(i=0;i<fileDoms.length;i++){
        var fileDom = fileDoms[i];
        fileDom.onchange = function () {
            previewImage(this,this.name+'_id');
        };
    }

}

/*
备注:Option列表的id是Select id+'_option'
功能:显示/隐藏Option列表
 */
function selectClick(select_dom){
    //获取option的dom
    var select_id = select_dom.id;
    var option_id = select_id+'_option';
    var option_dom = document.getElementById(option_id);

    if(option_dom.getAttribute('hidden') == 'hidden'){
        option_dom.removeAttribute('hidden');
    }else{
        option_dom.setAttribute('hidden','hidden');
    }
}

/*
备注:Input的id是Select id+'_input'
功能:Option Item被点击,将值赋给form中的input,同时刷新UI(刷新显示值,隐藏Option列表)
*/
function optionItemClick(option_id,item_dom){

    //获取隐藏的，真正需要被提交的input的id
    //这个id是select的id+_input
    var input_id = option_id.replace('_option','_input');

    //获取option列表的dom，并将option列表隐藏
    var option_dom = document.getElementById(option_id);
    option_dom.setAttribute('hidden','hidden');

    //获取option item的子节点
    //option item内有两个节点，第一个节点存放的是key，第二个节点存放的是value
    var key_dom = item_dom.firstChild;
    var value_dom = item_dom.lastChild;

    //获取真正提交的input，并未他赋值
    var real_input = document.getElementById(input_id);
    real_input.value = value_dom.innerHTML;

    //同时要更新整个select用于展示值得span，他在select内，input后面
    real_input.nextElementSibling.innerHTML = key_dom.innerHTML;

}

/* -------------------被动触发的函数，在HTML中被调用-------------------- */
function previewImage(file,wrpID)
{
    //这个wrpID是创建input的时候根据name生成的（为了防止重复）
    var MAXWIDTH  = 300;
    var MAXHEIGHT = 200;
    var div = document.getElementById(wrpID);
    var imgID = wrpID+'_img';

    if (file.files && file.files[0])
    {
        var fileName = file.files[0].name;
        var fileNameL = fileName.toLowerCase();

        if(fileNameL.indexOf(".jpg")>0||fileNameL.indexOf(".png")>0||fileNameL.indexOf(".jpeg")>0||fileNameL.indexOf(".gif")>0){
            div.innerHTML ='<img id='+imgID+'>';
            var img = document.getElementById(imgID);
            img.onload = function() {
                var rect = getThumbnailRect(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
                img.width = rect.width;
                img.height = rect.height;
            };

            var reader = new FileReader();
            reader.onload = function(evt){img.src = evt.target.result;};
            reader.readAsDataURL(file.files[0]);
        }else{
            div.innerHTML = "<p>已选择文件：<span>"+fileName+"</span></p>";
        }
    }
    else
    {
        var sFilter='filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src="';
        file.select();
        var src = document.selection.createRange().text;
        div.innerHTML = '<img id='+imgID+'>';
        var img = document.getElementById('imgID');
        img.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = src;
        var rect = getThumbnailRect(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
        status =('rect:'+rect.top+','+rect.left+','+rect.width+','+rect.height);
        div.innerHTML = "<div id=divhead style='width:"+rect.width+"px;height:"+rect.height+"px;"+sFilter+src+"\"'></div>";
    }
}

function fitImg(imgDom,MAXWIDTH,MAXHEIGHT) {
    var rect = getThumbnailRect(MAXWIDTH, MAXHEIGHT, imgDom.offsetWidth, imgDom.offsetHeight);
    imgDom.width = rect.width;
    imgDom.height = rect.height;
}

/* -----------------------功能函数------------------------ */
function getThumbnailRect( maxWidth, maxHeight, width, height ){
    var param = {top:0, left:0, width:width, height:height};
    if( width>maxWidth || height>maxHeight )
    {
        var rateWidth = width / maxWidth;
        var rateHeight = height / maxHeight;
        if( rateWidth > rateHeight )
        {
            param.width =  maxWidth;
            param.height = Math.round(height / rateWidth);
        }else
        {
            param.width = Math.round(width / rateHeight);
            param.height = maxHeight;
        }
    }

    param.left = Math.round((maxWidth - param.width) / 2);
    param.top = Math.round((maxHeight - param.height) / 2);
    return param;
}

/*
功能：后退一步
*/
function goback(){
    history.go(-1);
}