function QueryKeyword(keyword,site,callback)
{
    var querykeyword = keyword;
    var website = site;
    
    if(website == "bing"){
    
    $.ajax({
        url: "https://api.bing.com/osjson.aspx?JsonType=callback&JsonCallback=?",
        jsonp: "jsonp",
        dataType: "jsonp",
        data: {
        Query: querykeyword,
        Market: "en-us"
        },
        success: callback
    }); 
    
    }
    
    if(website == "google"){
    	
        $.ajax({
            url: "https://suggestqueries.google.com/complete/search",
            jsonp: "jsonp",
            dataType: "jsonp",
            data: {
            q: querykeyword,
            client: "chrome"
            },
            success: callback
        });        	
    	
    }
    
    if(website == "youtube"){
    	
        $.ajax({
            url: "https://suggestqueries.google.com/complete/search",
            jsonp: "jsonp",
            dataType: "jsonp",
            data: {
            q: querykeyword,
            client: "chrome",
            ds: "yt"
            },
            success: callback
        });        	
    	
    } 
    
    if(website == "yahoo"){
    	
        $.ajax({
            url: "https://search.yahoo.com/sugg/gossip/gossip-us-ura/",
            dataType: "jsonp",
            data: {
            command: querykeyword,
            nresults: "20",
            output: "jsonp"
            },
            success: callback
        });        	
    	
    }

    if(website == "ebay"){
        
        $.ajax({
            url: "https://autosug.ebay.com/autosug",
            dataType: "jsonp",
            data: {
            kwd: querykeyword,
            v: "jsonp",
            _dg: "1",
            sId: "0"
            },
            success: callback
        }); 
        
        }
        
        if(website == "amazon"){
        	
            $.ajax({
                url: "https://completion.amazon.com/search/complete",
                dataType: "jsonp",
                data: {
                q: querykeyword,
                method: "completion",
                'search-alias': "aps",
                mkt: "1"
                },
                success: callback
            });        	
        	
        }                
}

function CleanVal(input)
{       
    var val = input;
    val = val.replace("\\u003cb\\u003e", "");
    val = val.replace("\\u003c\\/b\\u003e", "");
    val = val.replace("\\u003c\\/b\\u003e", "");
    val = val.replace("\\u003cb\\u003e", "");
    val = val.replace("\\u003c\\/b\\u003e", "");
    val = val.replace("\\u003cb\\u003e", "");
    val = val.replace("\\u003cb\\u003e", "");
    val = val.replace("\\u003c\\/b\\u003e", "");
    val = val.replace("\\u0026amp;", "&");
    val = val.replace("\\u003cb\\u003e", "");
    val = val.replace("\\u0026", "");
    val = val.replace("\\u0026#39;", "'");
    val = val.replace("#39;", "'");
    val = val.replace("\\u003c\\/b\\u003e", "");
    val = val.replace("\\u2013", "2013");
    if (val.length > 4 && val.substring(0, 4) == "http") val = "";
    return val; 
}

$(document).ready(function() {
    $("#search").keyup(function(){
		var html = '';
	   	html = html + '<table id="results_table" width="1200" cellspacing="0" cellpadding="5" border="0" align="center">';
	   	html = html + '<tbody><tr class="odd-row">'
	   	html = html + '<th width="16%" class="googleta title is-2" align="left">Google</th>'
	   	html = html + '<th width="16%" class="yahot title is-2" align="left">Yahoo</th>'
	   	html = html + '<th width="16%" class="bingg title is-2" align="left">Bing</th>'
	   	html = html + '<th width="16%" class="youtubee title is-2" align="left">Youtube</th>'
	   	html = html + '<th width="16%" class="amazonn title is-2" align="left">Amazon</th>'
	   	html = html + '<th width="16%" class="ebayy title is-2" align="left">Ebay</th>'	   	
	   	html = html + '</tr>'	
	   	html = html + '<tr><td class="googlet title is-6" id="google"></td><td class="yahoot title is-6" id="yahoo"></td><td class="binng title is-6" id="bing"></td><td class="youtubeet title is-6" id="youtube"></td><td class="amazonnt title is-6" id="amazon"></td><td class="ebayyy title is-6 " id="ebay"></td></tr>'
	   	html = html + '</tbody></table>';
		$('#results').empty();
		$('#results').append(html); 
		
		QueryKeyword($('#search').val(),"google",function(res) {
            var retList = res[1];
            
            var i = 0; 
            var sb = ''; 
            for(i = 0; i < retList.length; i++)
            {
                var currents = CleanVal(retList[i]); 

                    sb = sb + '<a href="https://www.google.com/search?q=' + encodeURIComponent(CleanVal(retList[i])) + '" target="_blank" class="live">' + CleanVal(retList[i]) + '</a><br />';

            }
            $('#google').empty();
            $('#google').append(sb);
        });

		QueryKeyword($('#search').val(),"yahoo",function(res) {
            var sb = '';
            $.each(res.gossip.results, function(i, val) {

                sb = sb + '<a href="https://search.yahoo.com/search?p=' + encodeURIComponent(CleanVal(val.key)) + '" target="_blank" class="live">' + CleanVal(val.key) + '</a><br />';

            });
            $('#yahoo').empty();
            $('#yahoo').append(sb);
        });
        
		QueryKeyword($('#search').val(),"bing",function(res) {
            var retList = res[1];
            var i = 0; 
            var sb = ''; 
            for(i = 0; i < retList.length; i++)
            {
                var currents = CleanVal(retList[i]); 

                sb = sb + '<a href="http://www.bing.com/search?q=' + encodeURIComponent(CleanVal(retList[i])) + '" target="_blank" class="live">' + CleanVal(retList[i]) + '</a><br />';
            }
            $('#bing').empty();
            $('#bing').append(sb);
        });
		QueryKeyword($('#search').val(),"youtube",function(res) {
            var retList = res[1];
            
            var i = 0; 
            var sb = ''; 
            for(i = 0; i < retList.length; i++)
            {
                var currents = CleanVal(retList[i]); 

                sb = sb + '<a href="https://www.youtube.com/results?search_query=' + encodeURIComponent(CleanVal(retList[i])) + '" target="_blank" class="live">' + CleanVal(retList[i]) + '</a><br />';
            }
            $('#youtube').empty();
            $('#youtube').append(sb);

        });
        		
		QueryKeyword($('#search').val(),"amazon",function(res) {
			var retList = res[1];
            var i = 0; 
            var sb = ''; 
            for(i = 0; i < retList.length; i++)
            {
                var currents = CleanVal(retList[i]); 

                sb = sb + '<a href="http://www.amazon.com/s/?field-keywords=' + encodeURIComponent(CleanVal(retList[i])) + '" target="_blank" class="live">' + CleanVal(retList[i]) + '</a><br />';
            }
            $('#amazon').empty();
            $('#amazon').append(sb);
        });

		QueryKeyword($('#search').val(),"ebay",function(res1) {
            var retList = res1.res.sug;
            
            var i = 0; 
            var sb = ''; 
            for(i = 0; i < retList.length; i++)
            {
                var currents = CleanVal(retList[i]); 
                  
                sb = sb + '<a href="http://www.ebay.com/sch/i.html?_nkw=' + encodeURIComponent(CleanVal(retList[i])) + '" target="_blank" class="live">' + CleanVal(retList[i]) + '</a><br />';

            }
            $('#ebay').empty();
            $('#ebay').append(sb);
        });          	
    	
	});
});