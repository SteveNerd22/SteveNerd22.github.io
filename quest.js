var missioniPerPage = 1;      
var paginaCorrente = 1;
var missioni;      
// Funzione per generare il codice HTML delle missioni in base alla pagina corrente
        
function generaCodiceHTMLMissioni() {
  var codiceHTML = "";  
  var inizio = (paginaCorrente - 1) * missioniPerPage;  
  var fine = inizio + missioniPerPage;  
  var missioniVisualizzate = missioni.slice(inizio, fine);  
  missioniVisualizzate.forEach(function(missione) {  
    codiceHTML += "<div class='missione'>";    
    codiceHTML += "<h1 style='" + (missione.urgente === 1 ? "color: red;" : "") + "'>" + missione.titolo + "</h1>";    
    codiceHTML += "<p>" + missione.corpo + "</p>";                
    codiceHTML += "<h2>Ricompensa</h2>";		
    codiceHTML += "<p>Ricompensa base: " + missione.ricompensa.base + " GP</p>";    
    var extraNames = missione.ricompensa["extra names"];
    var extraGP = missione.ricompensa.extraGP:
    if (Array.isArray(extraNames) && Array.isArray(extraGP) && extraNames.length > 0 && extraNames.length === extraGP.length) {		
      codiceHTML += "<h2>Extra</h2>";
      codiceHTML += "<ul>";
      for (var i = 0; i < extraNames.length; i++) {
			  codiceHTML += "<li>" + extraNames[i] + ": " + extraGP[i] + " GP</li>";				
      }			
      codiceHTML += "</ul>";			
    }		
    codiceHTML += "<h2>Conclusione</h2>";		
    codiceHTML += "<p>" + missione.conclusione.corpo + "</p>";		
    codiceHTML += "<p>" + missione.conclusione.tempi + "</p>";    
    codiceHTML += "</div>";    
  });  
  return codiceHTML;  
}

        // Funzione per generare il codice HTML della paginazione
        function generaCodiceHTMLPaginazione() {
            var numeroPagine = Math.ceil(missioni.length / missioniPerPage);
            var codiceHTML = "";

	    	codiceHTML += "<button id='freccia-indietro' onclick='cambiaPagina(paginaCorrente - 1)'>-</button>";

            for (var i = 1; i <= numeroPagine; i++) {
                codiceHTML += "<span class='pagina' onclick='cambiaPagina(" + i + ")'>" + i;
				if(i < numeroPagine) {
					codiceHTML += ", ";
				} else {
					codiceHTML += ".";
				}
				codiceHTML += "</span>";
            }
	    	codiceHTML += "<button id='freccia-avanti' onclick='cambiaPagina(paginaCorrente + 1)'>+</button>";

            return codiceHTML;
        }

        // Funzione per cambiare la pagina delle missioni
function cambiaPagina(pagina) {
  paginaCorrente = pagina;
  aggiornaVisualizzazioneMissioni();
}

// Funzione per aggiornare la visualizzazione delle missioni e della paginazione
function aggiornaVisualizzazioneMissioni() {
  var codiceHTMLMissioni = generaCodiceHTMLMissioni();
  var codiceHTMLPaginazione = generaCodiceHTMLPaginazione();
  document.getElementById("missions").innerHTML = codiceHTMLMissioni;
  document.getElementById("mission-nav").innerHTML = codiceHTMLPaginazione;
  var frecciaIndietro = document.getElementById("freccia-indietro");
  var frecciaAvanti = document.getElementById("freccia-avanti");
  if (paginaCorrente > 1) {
    frecciaIndietro.style.display = 'block';
  } else {
    frecciaIndietro.style.display = 'none';  
  }   
  if (paginaCorrente < Math.ceil(missioni.length / missioniPerPage)) {
    frecciaAvanti.style.display = 'block';
  } else {
    frecciaAvanti.style.display = 'none';
  }
}

function caricaEMostraMissioni() {
  // Effettua una richiesta AJAX per caricare il file JSON delle mission
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        // Parsifica il JSON e aggiorna la visualizzazione delle missioni
        missioni = JSON.parse(xhr.responseText);
        aggiornaVisualizzazioneMissioni();
      } else {
        // Se c'è un errore nel caricamento del JSON, mostra un messaggio appropriate
        document.getElementById("missions").innerHTML = "<h3>Al momento non ci sono missioni</h3><p>Sembra che l'alleanza stia svolgendo un ottimo lavoro!</p>";
      }
    }
  };
  xhr.open("GET", "missioni.json", true);
  xhr.send();
}

// Chiamata alla funzione per caricare e visualizzare le missioni al caricamento della pagina
window.onload = caricaEMostraMissioni;
