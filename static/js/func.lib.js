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

}

/*
备注:Option列表的id是Select id+'_option'
功能:显示/隐藏Option列表
 */
function selectClick(select_dom){
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
    var input_id = option_id.replace('_option','_input');

    var option_dom = document.getElementById(option_id);

    option_dom.setAttribute('hidden','hidden');

    var real_input = document.getElementById(input_id);
    real_input.value = item_dom.innerHTML;
    real_input.nextElementSibling.innerHTML = item_dom.innerHTML;
}