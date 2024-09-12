class RecintosZoo {

    recintos = [
    {
        numero: 1,
        bioma: "savana",
        animaisExistentes: ["MACACO"],
        tamanhoTotal: 10,
        espacoDisponivel: 7
    },

    {
        numero: 2,
        bioma: "floresta",
        animaisExistentes: [],
        tamanhoTotal: 5,
        espacoDisponivel: 5
    },

    {
        numero: 3,
        bioma: ["savana e rio"],
        animaisExistentes: ["GAZELA"],
        tamanhoTotal: 7,
        espacoDisponivel: 5 
    },

    {
        numero: 4,
        bioma: "rio",
        tamanhoTotal: 8,
        animaisExistentes: [],
        tamanhoTotal: 8,
        espacoDisponivel: 8
    },

    {
        numero: 5,
        bioma: "savana",
        animaisExistentes: ["LEÃO"],
        tamanhoTotal: 9,
        espacoDisponivel: 6
    }
    ]

    animais = [
        {
            especie: "LEÃO",
            tamanhoOcupado: 3,
            bioma: "savana",
            carnivoro: true
        },

        {
            especie: "LEOPARDO",
            tamanhoOcupado: 2,
            bioma: "savana",
            carnivoro: true
        },

        {
            especie: "CROCODILO",
            tamanhoOcupado: 3,
            bioma: "rio",
            carnivoro: true
        },

        {
            especie: "MACACO",
            tamanhoOcupado: 1,
            bioma: ["savana", "floresta", "savana e rio"],
            carnivoro: false
        },

        {
            especie: "GAZELA",
            tamanhoOcupado: 2,
            bioma: "savana",
            carnivoro: false
        },

        {
            especie: "HIPOPÓTAMO",
            tamanhoOcupado: 4,
            bioma: ["rio", "savana e rio"],
            carnivoro: false
        }
    ]

    analisaRecintos(animal, quantidade) {
       
        const listAnimais = this.animais.find(
            a => a.especie.toUpperCase() === animal
        )
        if(!listAnimais){
            return {
                erro: "Animal inválido", 
                recintosViaveis: null
            };
        }

        if(quantidade <= 0){
            return {
                erro: "Quantidade inválida",
                recintosViaveis: null
            };
        }

        if(quantidade >= 10 && animal === "MACACO"){
            return {
                erro: "Não há recinto viável",
                recintosViaveis: null
            };
        }

        let recintosViaveis = [];

        // Encontrando recinto para 1 crocodilo
        for(let recinto of this.recintos){

            if(quantidade === 1 && animal === "CROCODILO"){

                let validacao = (recinto.bioma === "rio" && recinto.animaisExistentes != "HIPOPÓTAMO") ? true : false
            
    
                if(validacao){

                    let especie = this.animais.find(a => a.especie === "CROCODILO");
                    let tamanho = especie.tamanhoOcupado;

                    recinto.animaisExistentes.push(animal);

                    recinto.espacoDisponivel -= tamanho;

                    recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${recinto.espacoDisponivel} total: ${recinto.tamanhoTotal})`);

                    return {
                        erro: null,
                        recintosViaveis: recintosViaveis
                    }
                }
            } 
        }
    

        // Encontrando recinto para 2 macacos
        for(let recinto of this.recintos){
            
            if(animal === "MACACO" && quantidade === 2){

                let carnivoro = this.animais.find(a => a.carnivoro === true);
                let validacao = (recinto.bioma === "savana" || recinto.bioma === "floresta" || recinto.bioma === "savana e rio" && !carnivoro) ? true : false

                if(validacao){
                    let especie = this.animais.find(a => a.especie === "MACACO");
                    let tamanho =  especie.tamanhoOcupado;
    
                    recinto.animaisExistentes.push(animal);
    
                    recinto.espacoDisponivel -= (tamanho + 1); // Animais da mesma espécie equivalem a +1 de espaço
    
                    recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${recinto.espacoDisponivel} total: ${recinto.tamanhoTotal})\n`);
                    
                
                }
                
            }
            
            
        }
        console.log('Recintos Viáveis:', recintosViaveis);
        return {
            erro: null,
            recintosViaveis: recintosViaveis
        };
        
    }
    

}

export { RecintosZoo as RecintosZoo };
