    function getSearchResult(){
      event.preventDefault();
      var search = document.getElementById("title").value;
      $.getJSON("http://www.omdbapi.com/?t=" + search + "&y=&plot=short&r=json", function(json) {
          if (json.Title == null){
            var span;
              span = $('<span/>');
              span.append("<h1>Looks like this movie does not exist, try again!</h1>");
              $('#movie').html(span);
            overLay()
          }
          else {
            var title = json.Title;
            var imdbID = json.imdbID;
            var dateVar = json.Released;
            var rlsDate = new Date(dateVar);
            var currentDate = new Date()
            rlsDays(rlsDate, currentDate, title, imdbID)
          }
        });
    };

    function rlsDays(rlsDate, currentDate, title, imdbID){
      var millisecondsPerDay = 1000 * 60 * 60 * 24;
      var millisBetween = rlsDate.getTime() - currentDate.getTime();
      var days = millisBetween / millisecondsPerDay;
      var daysResult = (Math.floor(days));
      if (daysResult < 0 && daysResult > -30) {
        var textResult = "<h1>Looks like " + title + " is already out! better hurry to the theater.</h1>";
      }
      else if (daysResult < -30 && daysResult > -80) {
        daysResult = -daysResult;
        var textResult = "<h1>Looks like " + title + " has been out for " + daysResult + " days now, might be to late!</h1>";
      }
      else if (daysResult < -80 && daysResult > -150) {
        daysResult = -daysResult;
        var textResult = "<h1>Yeah, " + daysResult + " days to slow. Better check this site a little earlier next time, maybe see if " + title + " is out on Blu Ray or Netflix.</h1>";
      }
      else if (daysResult < -150) {
        daysResult = -daysResult;
        var textResult = "<h1>You must have been living under a rock, " + title + " is " + daysResult + " days old, long gone have been its moments of glory in the theater. </h1>";
      }
      else if (daysResult > 0 && daysResult < 10 ) {
        var textResult = "<h1>Almost time! Only <span id='days'></span> left for " + title + ", excitement is rising, better order those tickets before it’s too late.</h1>";
      }
      else {
        var textResult = "<h1><span id='days'></span> days left until " + title + ", you can relax, not time yet.</h1></span>";
      }
      var span;
        span = $('<span/>');
        span.append(textResult);
        $('#movie').html(span);
      var a;
        a = $('<a/>');
        a.append("<a class='button margin-right margin-top' href='http://www.imdb.com/title/" + imdbID + "'" + "target='_blank'>Movie info</a>");
        $('#imdbLink').html(a);

      var span;
        span = $('<span/>');
        span.append("<span>" + daysResult + "</span>");
        $('#days').html(span);
      overLay()
    };

    function overLay() {
      $(".overLay").slideToggle("slow");
    }
