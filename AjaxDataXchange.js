function XSendAndReceive(url, data, callback)    
{
    //funkce posílá metodou POST data na danou adresu URL
    //a volá funkci v parametru Callback, když se vše podaří
    //priklad volani:XSendAndReceive("https://my.cuesystem.com/command/Default.aspx", "{moje zaslana data}", hotovo)  

    //tvorime AJAX objekt pro asynchronni komunikaci
    var x = CreateXmlHttpRequestObject();
    
    //nastavujeme delku prenasenych dat
    var s = data.length.toString(10);
    
    //otevirame asynchronni komunikaci na dane url. true znamena asynchronni komunikaci
    x.open("POST", url, true);
    
    //nastavujeme hlavicku 
    x.setRequestHeader("Content-Length", s);
    
    //nastavujeme delku cekani na provedeni funkce
    x.timeout = 10000;

    x.ontimeout = function()
    {
        callback("XmlHttpRequest timeout. Server can't be reached");
    }

    x.onreadystatechange = function () {

        //readyState values
        //0 - the object has been created
        //1 - server connection establised
        //2 - the send method has been called
        //3 - some data has been received
        //4 - all the data has been received

        if (x.readyState == 4) {
            if (x.status == 200) {
                
                //volame callback funkci a predavame ji odpoved serveru
                callback(x.responseText);
            }
        }
    }
    
    //odesilame data na webovy server
    x.send(data);
}


function CreateXmlHttpRequestObject()
{
    var xmlHttp;

    if (window.ActiveXObject)
    {   //if Internet Explorer
        try
        {
            xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        catch(e)
        {
            xmlHttp = false;
        }
    }
    else
    { //other browsers
        try{
            xmlHttp = new XMLHttpRequest();

        }
        catch(e)
        {
            xmlHttp = false;
        }
    }

    
    if(!xmlHttp)
        {
            alert("CreateXmlHttpRequestObject failed to create xmlHttp object");
        }
    else
        {
            return xmlHttp;
        }

}
