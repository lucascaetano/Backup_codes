const operacaoPrevia = document.querySelector("#prev-ope")
const operacaoCorrente = document.querySelector("#ope-corrente")
const buttons = document.querySelectorAll("#buttons-container")

class calculadora {
    constructor(operacaoPrevia, operacaoCorrente, numeroAtual, flagIgual) {
        this.operacaoPrevia = operacaoPrevia
        this.operacaoCorrente = operacaoCorrente
        this.operacaoCorrente = ""
        this.numeroAtual = ""
        this.flagIgual = ""
    }
    // adiciona digitos no visor
    addDigit(digit) {
        if  (this.numeroAtual ===  "") {
            operacaoCorrente.innerText = ""
        }
        // chega se a operação já tem um . 'ponto'
        if (digit === "." && this.operacaoCorrente.innerText.includes(".")) {
            return
        }
        this.operacaoCorrente = digit
        this.numeroAtual = digit
        this.upDateScreen()
    }

    // processo geral da calculadora

    processoDaOperacao(operacao) {
        // checar se o valor corrente está vazio
        if (operacaoCorrente.innerText === "" && operacao !== "C") {
            // muda a operação

            if (this.operacaoPrevia.innerText !== "") {
                this.mudarOperacao(operacao)
            }
            return
        }
        
        // obetendo valors correntes e prévios
        let valorOperante
        let previa = operacaoPrevia.innerText.split(" ")[0]
        if (previa === "") {
            previa = 0
        }
        const corrente = operacaoCorrente.innerText

        switch(operacao) {
            //corrente = operacaoCorrente.innerText
            case "+":
            valorOperante = parseInt(previa) + parseInt(corrente)
            this.upDateScreen(valorOperante, operacao, corrente, previa)
                break;
            case "-":
            valorOperante = previa - corrente
            this.upDateScreen(valorOperante, operacao, corrente, previa)
                break;
            case "*":
            valorOperante = previa * corrente
            this.upDateScreen(valorOperante, operacao, corrente, previa)
                break;
            case "/":
            valorOperante = previa / corrente
            this.upDateScreen(valorOperante, operacao, corrente, previa)
                break;
            case "DEL":
            valorOperante = previa + corrente
            this.deleter()
                break;
            case "CE":
            valorOperante = previa + corrente
            this.limpezarOperacaoCorrente()
                break;
            case "C":
            valorOperante = previa + corrente
            this.limparTodaOperacao()
                break;
            case "=":
            valorOperante = previa + corrente
            this.flagIgual = "Y"
            this.operacaoIgual()
                break;
            default:
                return;
        }
    }

    // muda os valores no visor da calculadora
    upDateScreen(
        valorOperante = null,
        operacao = null,
        corrente = null,
        previa = null
        ) {

            console.log(valorOperante, operacao, corrente, previa)
        
        if (valorOperante === null) {
           operacaoCorrente.innerText += this.operacaoCorrente
           
        } else {
            // checa se o valor é zero, se for. adicione valor corrente
            if (previa === 0) {
                //valorOperante = ""//corrente
            }
            //valorOperante = operacaoCorrente.innerText
            // adiciona o valor corrente para previa
            operacaoPrevia.innerText = `${valorOperante}  ${operacao} `
            previa = valorOperante
            this.valorOperante = ""
            //operacaoCorrente.innerText = ""
            this.numeroAtual = ""
        }
        if (this.flagIgual === "Y") {
            operacaoCorrente.innerText = valorOperante
            operacaoPrevia.innerText = ""
            operacao = ""
            this.flagIgual = ""
        }
        
    }

    // mude para operaçoes Math
    mudarOperacao(operacao) {
        const operacaoMath = ["*", "/", "+", "-"]
    
        if (!operacaoMath.includes(operacao)) {
            return
        }
        
        this.operacaoPrevia.innerText = this.operacaoPrevia.innerText.slice(0, -1) + operacao
    }

    // deleta o ultimo digito
    deleter() {
        operacaoCorrente.innerText = operacaoCorrente.innerText.slice(0, -1)
    }

    //limpa a operação corrente
    limpezarOperacaoCorrente() {
        operacaoCorrente.innerText = ""
    }

    // limpa toda a operção
    limparTodaOperacao() {
        operacaoCorrente.innerText = ""
        operacaoPrevia.innerText = ""
    }

    // processa as operações
    operacaoIgual() {
        const operacao = operacaoPrevia.innerText.split(" ")[1]

        this.processoDaOperacao(operacao)
        operacaoPrevia.innerText = ""
    }
}


const calcu = new calculadora(operacaoPrevia, operacaoCorrente)

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;
        
        if (+value >= 0 || value === "." ) {
            calcu.addDigit(value)
        } else {
            calcu.processoDaOperacao(value)
        }
    })
})