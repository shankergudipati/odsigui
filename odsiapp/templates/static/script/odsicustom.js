function clickd()
{
$.ajax({
    //url: 'http://10.233.52.152:9090/samplemethod',
    url: 'http://10.233.52.111:8001/req_status_all/',
    contentType: "application/json",
    dataType: "jsonp",
    jsonp: "callback",
    jsonpCallback: "test",
    success: function (data) {
                                console.log(data);
                                console.log(data['1']);
                                $('#product_filter').html('');
                 $('#product_filter').append("<table id='product_filter_table'  style='border:1px solid black;width:90%;'><thead><tr style='border 2px solid black;background-color:#DDD;'><th style='font-weight:bold;color:blue; padding:10px;border:1px solid black;'>Request Id</th><th style='font-weight:bold;color:blue; padding:1px;border:1px solid black;'>Username</th><th style='font-weight:bold;color:blue; padding:10px;border:1px solid black;'>Product Name</th><th style='font-weight:bold;color:blue; padding:10px;border:1px solid black;'>Machine IP</th><th style='font-weight:bold;color:blue; padding:10px;border:1px solid black;'>Status</th><th style='font-weight:bold;color:blue; padding:10px;border:1px solid black;'>Remarks</th></tr></thead></table>");

                   $.each(data,function(key,value){
var tableData = "<tr style='border 2px solid black;background-color:#DDD;width:90%;'><td style='border:1px solid black;padding:5px;text-align:center;'>"+key+"</td>";

                                                                                                                           for (var key in value) {
 tableData = tableData + "<td style='border:1px solid black;padding:5px;text-align:center;'>"+value[key]+"</td>";
                                     }                                                                        
tableData = tableData + "</tr>";
 $('#product_filter_table').append(tableData);
                                                                                                                                });
//                    setTimeout(clickd(),10000);
    }
});
}















function contains(list, element) {
    //alert(typeof list);
    //alert(list);
    list = list.split(",");
    for (var i = 0; i < list.length; i++) {
        if (list[i] === element) {
            return true;
        }
    }
    return false;
}







function sidebar_click(tag,product_information)
{
console.log("============");
console.log(product_information[1]);
console.log("=============");
//document.getElementById("div1").innerHTML="content changed"
//var hello = "{{product_information.0.service_tag}}";
//alert(hello);
var product_info ="";
for(item in product_information) { 
	for (key in item.product_info_list.items ){
//	 product_info +=  values[key].0 +":"+ values[key].1 +":"+ values[key].2 +":"+ values[key].3 +":"+item.service_tag+":"+key;
	}
}
product_info=product_info.split(":");
//alert(product_info[4])
var inner_html="";
for (var i=0 ;i<product_info.length; i++) {
//alert(product_info[i])
//alert(product_info[i]);
//alert(tag);
if (product_info[i]==tag){
inner_html+= "<li class='box'><div class='head'><img src='/static/images/"+product_info[i+1]+".png' /></div><div class='content'><br><br><h4><b>Product : "+product_info[i-4]+"<h4><b>Version : "+product_info[i-3]+"<h4><b>Supporting OS : "+product_info[i-2]+"<h4><b>Architecture : "+product_info[i-1]+"</div><button class='btn' data-toggle='modal'>Install</button></li>"

}
}
//alert(product_info);
document.getElementById("product_filter").innerHTML=inner_html;

}


