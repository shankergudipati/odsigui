/*
 * 
 *   Author: Anuja Jadhav
 Project: ODSI Framework
 */

//**********************Toggles Side Bar**********************/
$("#toggle-button").on("click", function() {

    if ($('.sidebar').css('width').substring(0, 3) > 20) {
        $('.sidebar').children().css('visibility', 'hidden');
        $('.sidebar').css('width', '20px');
        $('.sidebar-before').css('width', '20px');
        $('#wrapper').css('margin-left', '20px');
        $('#toggle-button').removeClass('close-panel');
        $('#toggle-button').addClass('open-panel');

    }
    else {
        console.log('open');
        $('#wrapper').css('margin-left', '15%');
        $('.sidebar').css('width', '15%');
        $('.sidebar').children().css('visibility', 'visibile');
        $('.sidebar-before').css('width', '15%');
        $('#toggle-button').removeClass('open-panel');
        $('#toggle-button').addClass('close-panel');

    }
});
//*******************Initiates the Slider****************************/
$(".paging2").children("li").on("click", function() {

});

window.onload = function() {

  $($(".paging2").find("li")[0]).click();
    
    $('.install-btn').avgrund({
        height: 233,
        width: 370,
        holderClass: 'custom',
        showClose: true,
        showCloseText: 'close',
        onBlurContainer: '.container',
        template: $('.modal-box').html()
    });

};
//******************Clicking on elements under the sublist **************/
$(".paging2").find("li").find(".sub").find("li").bind("click", function(event) {
//Set Bread crumb
    var parentName = $($(this).parent().parent().find("span")[0]).text();
    var currentName = $(this).find("span").text();
    var breadCrumb = "<a href=\"#\">" + parentName + "</a>" + ">" + "<a href=\"#\">" + currentName + "</a>"
    $(".subheader").html(breadCrumb);
//add active class
    $(this).parent().find("span").removeClass("active");
    $(this).find("span").addClass("active");
//Set Title
    $($(".page-header").find("span")[0]).text(currentName);
});

/*******************Expand and Collapse Elements inside Sidebar**************/
$(".paging2").find("li").bind("click", function(event) {
    var breadCrumb;
    var title;
    if ($(event.target).parent().parent().prop("class") !== "sub") {
        if ($(this).find("span").prop('class') !== 'active') {
            $(this).children('span').children('span').removeClass(); //remove icon collapse class   
            $(this).parent().find(".active").removeClass("active");//remove active from all elements
            $(this).parent().find('.sub').hide();//hide sub list of all elements
            $(this).parent().find('.icon-expand').addClass("icon-collapse");//expand the list of the current element
            $(this).parent().find('.icon-collapse').removeClass("icon-expand");//replace expand with collapse of all elements
            $(this).children('span').children('span').addClass("icon-expand");
            $(this).children('span').addClass("active");    //add active class to the current element
            $(this).children(".sub").show();//display the sublist of the element
            $($(this).children(".sub").children()[0]).find("span").addClass("active");//set the main content to the first element
            //Set Title and breadcrumb of elements without sub list
            if ($(this).children(".sub").length !== 1) {
                //Set Title            
                title = $(this).children().text();
                $($(".page-header").find("span")[0]).text(title);
                //Set Breadcrumb
                breadCrumb = "<a href=\"#\">" + title + "</a>";
                $(".subheader").html(breadCrumb);
            }
        }
        else {
            $(this).children('span').children('span').removeClass();
            $(this).children('span').children('span').addClass("icon-collapse");
            $(this).parent().children().find(".active").removeClass("active");
            $(this).children(".sub").hide();
        }
    }
    event.stopPropagation();// Prevents the default action of parent list and allows user to click on sub list elements
});

//********************Progress Bar*****************/

$(function() {
    var progressbar = $(".progressbar"),
            progressLabel = $(".progress-label");
    progressbar.progressbar({
        value: false,
        change: function() {
            progressLabel.text(progressbar.progressbar("value") + "%");
        },
        complete: function() {
            progressLabel.text("Complete!");
            //Added code to display check
            $(progressbar).parent().parent().find(".check").show();
            $(progressbar).parent().parent().addClass("active");
        }
    });
    function progress() {
        var val = progressbar.progressbar("value") || 0;
        progressbar.progressbar("value", val + 1);
        if (val < 99) {
            setTimeout(progress, 100);
        }
    }
    setTimeout(progress, 3000);
});

/****************User clicks on install************/
/*$(function() {
    $('.btn').avgrund({
        height: 233,
        width: 370,
        holderClass: 'custom',
        showClose: true,
        showCloseText: 'close',
        onBlurContainer: '.container',
        template: $('.modal-box').html()
    });
});*/

//*******Install Button of panel***********/
$(".install-btn").on("click", function() {

    //Save the name of the software on the panel so that save can access it
    var panel = $(this).parent();
    //Save the name of the software on the button
    $('#save').data("name", $(panel).prop("title"));
    //Save the panel 
    $('#save').data("panel", $(panel));
    $(this).avgrund({
        height: 233,
        width: 370,
        holderClass: 'custom',
        showClose: true,
        showCloseText: 'close',
        onBlurContainer: '.container',
        template: $('.modal-box').html()
    });
   // $('.avgrund-popin').find('form').find('#save.btn').bind("click", function() {save();});
});

            /***************Save Button Inside Modal Box*************/
function saveForm(){
//Create a JSON String to be sent to the server
    var jsonString = "{";

    if (validateIP($('.avgrund-popin').find('#ip')) && validateBlankEntries($('.avgrund-popin').find("form"))) {

        jsonString += "\"ip\":\"" + $('.avgrund-popin').find('#ip').prop('value') + "\",";
        jsonString += "\"username\":\"" + $('.avgrund-popin').find('#username').prop('value') + "\",";
        jsonString += "\"password\":\"" + $('.avgrund-popin').find('#password').prop('value') + "\",";
        jsonString += "\"software\":\"" + $('#save').data("name") + "\"}";
        console.log(jsonString);

        /*Send this string to server using ajax*/

//Close the dialog box
        $('.avgrund-close').click();

//Start progress
        var parent = $('#save').data("panel");
        $(parent).find('button').remove();
        $(parent).append("<div class=\"progressWrapper\"><span>Installation Progress</span><div class=\"progressbar\"><div class=\"progress-label\">Loading...</div></div></div>");
        $(parent).find(".progressbar").progressbar({
            value: false
        });
    }
   
};
//Validate IP
function validateIP(element) {
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test($(element).prop('value')))
    {
        $(element).css('border', '1px solid #CCCCCC');
        $(element).css('background-color', '#fff');
        return true;
    }
    alert("Please enter valid IP address.");
    $(element).css('border', '1px solid red');  
    $(element).prop('title', 'Please enter valid IP address.');
    $(element).prop('value', '');
    return false;
};

/*Validate Blank Entries*/
function validateBlankEntries(form) {
 for (var i = 0; i < $(form).find('input').length; i++) {
 if ($($(form).find('input')[i]).prop('value') === '') {
 $($(form).find('input')[i]).css('border', '1px solid red');
 alert('Please complete your form.');
 $("input").removeProp('disabled'); 
 return false;
 }
 }
 return true;
 }
