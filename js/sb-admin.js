(function($) {
  "use strict"; // Start of use strict

  // Toggle the side navigation
  $("#sidebarToggle").click(function(e) {
    e.preventDefault();
    $("body").toggleClass("sidebar-toggled");
    $(".sidebar").toggleClass("toggled");
  });

  // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
  $('body.fixed-nav .sidebar').on('mousewheel DOMMouseScroll wheel', function(e) {
    if ($window.width() > 768) {
      var e0 = e.originalEvent,
        delta = e0.wheelDelta || -e0.detail;
      this.scrollTop += (delta < 0 ? 1 : -1) * 30;
      e.preventDefault();
    }
  });

  // Scroll to top button appear
  $(document).scroll(function() {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  });

  // Smooth scrolling using jQuery easing
  $(document).on('click', 'a.scroll-to-top', function(event) {
    var $anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: ($($anchor.attr('href')).offset().top)
    }, 1000, 'easeInOutExpo');
    event.preventDefault();
  });
  
  var dataSet = {
	      label: "Wins",
	      lineTension: 0.3,
	      backgroundColor: "rgba(2,117,216,0.2)",
	      borderColor: "rgba(2,117,216,1)",
	      pointRadius: 5,
	      pointBackgroundColor: "rgba(2,117,216,1)",
	      pointBorderColor: "rgba(255,255,255,0.8)",
	      pointHoverRadius: 5,
	      pointHoverBackgroundColor: "rgba(2,117,216,1)",
	      pointHitRadius: 50,
	      pointBorderWidth: 1,
	      data: [12, 8, 10, 12, 10, 13, 13, 13, 9],
	    }
  
  // Area Chart Example
	var ctx = document.getElementById("myAreaChart");
	var myLineChart = new Chart(ctx, {
	  type: 'line', 
	  data: {
	    labels: ["2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017"],
	    datasets: [dataSet],
	  },
	  options: {
	    scales: {
	      xAxes: [{
	        time: {
	          unit: 'date'
	        },
	        gridLines: {
	          display: false
	        },
	        ticks: {
	         // maxTicksLimit: 9
	        }
	      }],
	      yAxes: [{
	        gridLines: {
	          color: "rgba(0, 0, 0, .125)",
	        },
			ticks: {
				min: 0, // minimum value
				//max: 17, // maximum value
				stepSize:1 
			}
	      }],
	    },
	    legend: {
	      display: false
	    }
	  }
	});
	
  var removeData = function(chart) {
			    chart.data.labels = [];
			    chart.data.datasets = []
			    chart.update();
	}
  var addData = function(chart, label, data) {
	    chart.data.labels = label;
	    chart.data.datasets = data;
	    chart.update();
   }
 
  
   var dflt = {
     min: 0,
     max: 100,
     donut: true,
     gaugeWidthScale: 0.6,
     counter: true,
     hideInnerShadow: true
   }
  
   var gg2 = new JustGage({
     id: 'gg2',
     title: 'Win Rate',
     label: 'percent',
     defaults: dflt
   });
   
   var playoffsC = new JustGage({
     id: 'playoffsC',
     title: 'Win Rate',
     label: 'percent',
     defaults: dflt
   });
  
  var teamData = [];
  
  var loadData = function(data) {
	  console.log('data to load', data)
	  $("#founded").text(data.founded);
	  $("#stadium").text(data.stadium);
	  $("#teamlogo").attr('src',data.logo);
	  $("#over-wins").text(data.overall.win);
	  $("#over-loss").text(data.overall.loss);
	  $("#over-tie").text(data.overall.tie);
	  $("#offePts").text(data.overall.offensePts);
	  $("#defPts").text(data.overall.defPts);
	  $("#OverregSeasonChamp").text(data.overall.regSeasonChamp);
	  $("#playOWin").text(data.playoff.win);
	  $("#playOLoss").text(data.playoff.loss);
	  $("#playOTie").text(data.playoff.tie);
	  $("#championships").text(data.playoff.championships);
	  $("#regSeasonChamp").text(data.playoff.regSeasonChamp);
	  $("#appearances").text(data.playoff.appearances);
	  // update chart data
	  removeData(myLineChart);
	  var labels = [];
	  var score = [];
	  for(var i = 0;i < data.yearly.length; i++ ) {
		labels.push(data.yearly[i].year);  
		score.push(parseInt(data.yearly[i].wins))
	  }
	  dataSet.data = score;
	  var sets = [];
	  sets.push(dataSet)
	  addData(myLineChart, labels, sets);
	  
	  //update gauge
	  var totalOGames = parseInt(data.overall.win) + parseInt(data.overall.loss) + parseInt(data.overall.tie);
	  var winPercent = 100 * parseInt(data.overall.win);
	  var overallrate = winPercent / totalOGames;
	  console.log(Math.round(overallrate));
	  gg2.refresh(overallrate);
	  //playoffsC
	  var totalPOGames = parseInt(data.playoff.win) + parseInt(data.playoff.loss) + parseInt(data.playoff.tie);
	  var winPOPercent = 100 * parseInt(data.playoff.win);
	  var POrate = winPOPercent / totalPOGames;
	  playoffsC.refresh(POrate);
  }
  
  var fetchData = function(){
	    console.log( "fetching!" );
	    $.getJSON("data/data.json", function(result){
	        //console.log('fetch result', result);
	        teamData = result.teams;
			//teamSelectors			
			$.each(teamData, function (i, team) {
			    $('#teamSelector').append($('<option>', { 
			        value: team.name,
			        text : team.name 
			    }));
			});
			
			loadData(teamData[0]);
	    }).fail(function (jqxhr, status, error) { 
			console.log('error', status, error) }
		);
  }
  
  var findPurpose = function(purposeName) {
	    for (var i = 0, len = teamData.length; i < len; i++) {
	        if (teamData[i].name === purposeName)
	            return teamData[i]; // Return as soon as the object is found
	    }
	    return null; // The object was not found
	}
  
  $('#teamSelector').change(function(event){
	  var newData = findPurpose(event.target.value);
	  loadData(newData);
  });
  
  
  //doc ready baby!
  $( document ).ready(function() {
	    console.log( "ready!" );
	    fetchData();
	    
	});
  

})(jQuery); // End of use strict
