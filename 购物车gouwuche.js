/**
 * Created by GR on 2020/3/23.
 */

$(function(){
    // 1、全选、全部选功能模块--就是把全选按钮（checkall）的状态复制给三个小按钮（j-checkbox）--事件可以使用change
    $(".checkall").change(function(){
        //alert($(this).prop("checked"));
        //console.log($(this).prop("checked"));           // 在控制台输出--true或false
        $(".j-checkbox, .checkall").prop("checked", $(this).prop("checked"));  // 传入第二参数是true或false,不传第二个参数好像也一样啊
        if ($(this).prop("checked")) {                         // 意思是如果这个被勾选了
            getSum();                                            // 只有点击了全选才调全部统计函数
            totalMoney();
            //alert("全选了");
            $(".cart-item").addClass("check-cart-item");     // 如果某一个或者全部勾选了，就让商品添加 check-cart-item 类名
        }else {
            $(".cart-item").removeClass("check-cart-item");     // 移除 check-cart-item 类名
            //alert("取消全选了");
            delSum();                                             // 全选取消后就调用清零函数
        }
    });

    // 5.计算总计和总额的模块----全选商品的统计函数 getSum()
    //getSum();   // 先调用一次----网页一刷新就相加
    function getSum() {
        count = 0;   // 计算总件数
        money = 0;   // 计算总价钱
        $(".itxt").each(function (i, ele) {      // i 是索引号，ele是元素
            count += parseInt($(ele).val());       // val() 得到的是字符串
        });
        $(".amount-sum em").text(count);
        $(".p-sum").each(function (i, ele) {
            money += parseFloat($(ele).text().substr(1));
        });
        $(".price-sum em").text("￥" + money.toFixed(2));
    }
    // 清零函数
    function delSum(){
        count = 0;   // 计算总件数
        money = 0;   // 计算总价钱
        $(".amount-sum em").text(count);
        $(".price-sum em").text("￥" + money.toFixed(2));
    }
    // 单选商品的统计函数
    //function danxuanSum(){
    //    count = 0;   // 计算单选件数
    //    money = 0;   // 计算单选各件累计价钱
    //    $(".itxt").each(function (i, ele) {      // i 是索引号，ele是元素
    //        count += parseInt($(ele).val());       // val() 得到的是字符串
    //    });
    //    $(".amount-sum em").text(count);
    //    $(".p-sum").each(function (i, ele) {
    //        money += parseFloat($(ele).text().substr(1));
    //    });
    //    $(".price-sum em").text("￥" + money.toFixed(2));
        //$(".j-checkbox").prop("checked");
        //alert($(".j-checkbox").prop("checked"));
        //count = $(this).parent(".p-checkbox").siblings(".p-num").find(".itxt").val();
        ////alert(count);
        //$(".amount-sum em").text(count);      // 得到勾选商品的个数
        //money = $(this).parent(".p-checkbox").siblings(".p-sum").text();
        ////alert(money);
        //money = parseFloat(money.substr(1));
        //$(".price-sum em").text("￥" + money.toFixed(2));
    //}


    // 2、每一件商品的复选框都被选中--就把全选按钮选上（其个数等于所有商品的个数length），否则不选
    $(".j-checkbox").change(function(){
        if ($(".j-checkbox:checked").length == $(".j-checkbox").length){   // :checked--匹配所有选中的被选中元素(复选框、单选框等，不包括select中的option)
            $(".checkall").prop("checked",true);    // true--就是全部选上
        }else {
            $(".checkall").prop("checked",false);
        }
        if ($(this).prop("checked")) {
            $(this).parents(".cart-item").addClass("check-cart-item");     // 如果某一个商品勾选了，就让商品添加 check-cart-item 类名
            //danxuanSum();

        }else {
            $(this).parents(".cart-item").removeClass("check-cart-item");     // 移除 check-cart-item 类名
            //alert(4444);
        }

        /*
        checked = $(this).prop("checked");    // 自己加的--测试
        if (checked){
            //alert("单选勾选了");
            console.log(checked);
            danxuanSum();
        }else {
            //alert("单选取消了");
            console.log(checked);
        }
        */
    });



    // 3.1、增加商品数量模块--首先声明一个变量，当点击 + 号（increment），就让这个值++，然后赋值给这个文本框
    $(".increment").click(function(){
        // 得到当前兄弟文本框的值
        var n = $(this).siblings(".itxt").val();
        //var n = $(".itxt").val();        // 这个只能加一次
        n++;
        $(this).siblings(".itxt").val(n);
        // 计算小计模块，根据文本框的值 乘以 当前商品的价格
        var p = $(this).parents(".p-num").siblings(".p-price").text();
        p = p.substr(1);   // 去掉价格前面的人民币符号￥
        //console.log(p * n);
        $(this).parents(".p-num").siblings(".p-sum").text("￥" + (p * n).toFixed(2))    // 也可以用html() // toFixed(2)--保留两位小数
        //danxuanSum();

    });

    // 3.2、减少商品数量模块--首先声明一个变量，当点击 - 号（increment），就让这个值--，然后赋值给这个文本框
    $(".decrement").click(function(){
        var n = $(this).siblings(".itxt").val();   // 得到当前兄弟文本框的值
        if (n == 1){
            return false;
        }
        n--;
        $(this).siblings(".itxt").val(n);
        // 计算小计模块，根据文本框的值 乘以 当前商品的价格
        var p = $(this).parents(".p-num").siblings(".p-price").html();
        p = p.substr(1);   // 去掉价格前面的人民币符号￥
        //console.log(p * n);
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + (p * n).toFixed(2))   // toFixed(2)--保留两位小数
        //danxuanSum();

    });


    // 4.用户自己修改了商品的件数时的价格小计
    $(".itxt").change(function(){   // change事件
        var n = $(this).val();
        var p = $(this).parents(".p-num").siblings(".p-price").html();
        p = p.substr(1);   // 去掉价格前面的人民币符号￥
        //console.log(p * n);
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + (p * n).toFixed(2))   // toFixed(2)--保留两位小数
        //danxuanSum();
    });





        /*  这段是视频里的，还有个bug----不管没有选，全部都计算了
        $(".itxt").each(function(i, ele){
            count += parseInt($(ele).val());
        });
        $(".amount-sum em").text(count);

        $(".p-sum").each(function(i, ele){
            money += parseFloat($(ele).text().substr(1));   // 去掉前面的一个￥
        });
        $(".price-sum em").text("￥" + money.toFixed(2));
        */



    // 6.删除商品模块
    // 6.1 商品后面的删除按钮
    $(".p-action a").click(function(){
        $(this).parents(".cart-item").remove();
        getSum();
    });

    // 6.2 删除选中的商品
    $(".remove-batch").click(function(){
        $(".j-checkbox:checked").parents(".cart-item").remove();
        getSum();
    });

    // 6.3 清空购物车，删除全部商品
    $(".clear-all").click(function(){
        $(".cart-item").remove();
        getSum();
    });


    // 7、鼠标移入商品图片放大、移出还原模块
    $(".p-img img").mouseover(function(){
        $(this).css({
            width: "239px",
            height:"239px"
        });
    });
    $(".p-img img").mouseout(function(){
        $(this).css({
            width: "80px",
            height:"80px"
        });
    });






});










