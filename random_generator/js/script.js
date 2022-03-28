(() => {
    var $sortearBtn = document.querySelector(".sortear-btn");
    var $alertMsg = document.querySelector(".alert-container");
    var $result = document.querySelector(".result");

    $sortearBtn.addEventListener("click", () => {
      $alertMsg.classList.add('hidden')
        var $minNum = parseInt(document.getElementById("min-number").value);
      var $maxNum = parseInt(document.getElementById("max-number").value);
      ehGrande($minNum, $maxNum)
      
      if(!ehGrande($minNum, $maxNum)) {
        if (!ehNegativo($minNum, $maxNum)) {
            if (!vazio($minNum, $maxNum)) {
              if (!ehMaior($minNum, $maxNum)) {
                var $numSorteado = sortear($minNum, $maxNum);
                $result.textContent = $numSorteado;
                
              }
            }
          }
      }
    });

    function ehGrande(min, max) {
        if(min > 9999999 || max > 999999){
            $alertMsg.textContent = "O número máximo é 999999";
            $alertMsg.classList.remove("hidden");
            return true;
        }
    }

    function vazio(min, max) {
        min += '';
        max += '';
        if (min == 'NaN'|| max == 'NaN') {
            $alertMsg.textContent = "Preencha todos os campos!";
            $alertMsg.classList.remove("hidden");
            return true;
        }
    }

    function ehNegativo(min, max) {
      if (min < 0 || max < 0) {
        $alertMsg.textContent = "Não é possível sortear números negativos.";
        $alertMsg.classList.remove('hidden')
        return true;
      }
    }

    function ehMaior(min, max) {
      if (min >= max) {
        $alertMsg.textContent =
          "O número máximo deve ser maior que o número mínimo";
        $alertMsg.classList.remove("hidden");
        return true;
      }
    }

    function sortear(min, max) {
      return parseInt(Math.floor(Math.random() * (max - min + 1) + min));
    }
  })();