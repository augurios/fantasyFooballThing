(function($) { 
		
	var yearsData;
	var fetchData = function(){
	   console.log( "fetching!" );
	   $.getJSON("data/schedule.json", function(result){
	       console.log('fetch result', result);
	       yearsData = result.years;
	       var allGameData = [];
	       
	       for(var i = 0; i < yearsData.length; i++) {
		       var yearlink = yearsData[i].link.split("/");
		       var currentYear = yearlink[6];
		       for (var dex = 0;dex < yearsData[i].games.length; dex++) {
			       var currentGame = yearsData[i].games[dex];
			       currentGame.week += " - " + currentYear;
			       allGameData.push(yearsData[i].games[dex]);
		       }
	       }
	       
	    //teamSelectors			
		initModule(allGameData, result.owners);
	   }).fail(function (jqxhr, status, error) { 
	    	console.log('error', status, error) }
	   );
	}
	
	
	var initModule = function(games, owners) {
		console.log("init data:", games, owners);
		var selectors = $('.team-selector');
		var selectorA = $('.team-a .team-selector');
		var selectorB = $('.team-b .team-selector');
		var imageA = $('.team-a .image img');
		var imageB = $('.team-b .image img');
		var findPurpose = function(purposeName) {
				    for (var i = 0, len = owners.length; i < len; i++) {
				        if (owners[i].name === purposeName)
				            return owners[i]; // Return as soon as the object is found
				    }
				    return null; // The object was not found
		}
			
		$.each(owners, function (i, team) {
			    selectors.append($('<option>', { 
			        value: team.name,
			        text : team.fantasyname + " ("+team.name +")"
			    }));
		});
		
		selectors.change(function () { 
			var playedGames = [];
			var teamA = findPurpose(selectorA.val())
			var teamB = findPurpose(selectorB.val())
			var winsA = [];
			var winsB = [];
			var gametable = $("#dataTable tbody");
			gametable.empty();
			if ((selectorA.val()) && (selectorB.val())) {
				console.log('team match enabled')
				
				
				
				imageA.attr('src',teamA.image); 
				imageB.attr('src',teamB.image);
				
				for(var i = 0; i < games.length; i++) {
					if((games[i].team_a[0].owner === selectorA.val() || games[i].team_a[0].owner === selectorB.val())&&(games[i].team_b[0].owner === selectorA.val() || games[i].team_b[0].owner === selectorB.val())) {
						playedGames.push(games[i]);
					}
				}
				
				$.each(playedGames, function (i, game) {
					
					var newRowContent = "<tr><td>"+game.team_a[0].name+" "+game.team_a[0].score+" | "+game.team_b[0].name+" "+game.team_b[0].score+"</td></tr>";

$("#tblEntAttributes tbody").append(newRowContent); 
						
					    $("#dataTable tbody").append(newRowContent);
				});
				
				for(var i = 0; i < playedGames.length; i++) {
					if(
						(playedGames[i].team_a[0].owner === selectorA.val() && 
						 parseInt(playedGames[i].team_a[0].score) > parseInt(playedGames[i].team_b[0].score) 
						 	|| 
						 playedGames[i].team_b[0].owner === selectorA.val() && 
						 parseInt(playedGames[i].team_b[0].score) > parseInt(playedGames[i].team_a[0].score)
						 ) 
					) {
						winsA.push(playedGames[i]);
					} else if(
						(playedGames[i].team_a[0].owner === selectorB.val() && 
						 parseInt(playedGames[i].team_a[0].score) > parseInt(playedGames[i].team_b[0].score) 
						 	|| 
						 playedGames[i].team_b[0].owner === selectorB.val() && 
						 parseInt(playedGames[i].team_b[0].score) > parseInt(playedGames[i].team_a[0].score)
						 ) 
					) {
						winsB.push(playedGames[i]);
					}
				}
				
				$(".team-a .record .wins-record").text(winsA.length);
				$(".team-a .record .loss-record").text(winsB.length);
				$(".team-b .record .wins-record").text(winsB.length);
				$(".team-b .record .loss-record").text(winsA.length);
				
				console.log(playedGames, winsA, winsB)
			} else {
				console.log('team match disabled')
			}
		})
		
		
	}
	
	fetchData();
	// Call the dataTables jQuery plugin
	$('#dataTable').DataTable();
})(jQuery)