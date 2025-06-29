

function factory() {

    return {

        stringDate: (startParam: any, endParam?:string | number): string => {

            if(!startParam) return ''

            const start = new Date(String(startParam));
            const end = endParam ? new Date(String(startParam)) : null;
        
            const time1 = start.getTime();
            const time2 = end ? end.getTime() : Date.now();
        
            const diff = time2 - time1;
        
            const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
            const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            const years = Math.floor(months / 12);
        
            if(years > 0) return `há ${years} ano${years > 1 ? "s" : ""}`;
            if(years == 0 && months > 0) return `há ${months} mes${months > 1 ? "es" : ""}`;
            if(months == 0 && days > 0) return `há ${days} dia${days > 1 ? "s" : ""}`;
            if(days == 0 && hours > 0) return `há ${hours} hora${hours > 1 ? "s" : ""}`;
            if(hours == 0 && minutes > 0) return `há ${minutes} minuto${minutes > 1 ? "s" : ""}`;
            if(minutes == 0) return `há ${seconds} segundos`;
        
            return 'não estimado';

        },

        date: (date:any) => !date ? '' : (new Date(date)).toLocaleDateString('pt-BR'),

        fullDate: (date:any) => !date ? '' : (new Date(date)).toLocaleDateString('pt-BR', { hour: "numeric", minute: 'numeric' }),

        creationTime(date: any) {

            if(!date) return ''

            const start = new Date(date);
            const end = new Date();
        
            const time1 = start.getTime();
            const time2 = end ? end.getTime() : Date.now();
        
            const diff = time2 - time1;
        
            const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
            const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            const years = Math.floor(months / 12);
        
            if(years > 0) return `${years} year${years > 1 ? "s" : ""}`;
            if(years == 0 && months > 0) return `${months} month${months > 1 ? "s" : ""} ago`;
            if(months == 0 && days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
            if(days == 0 && hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
            if(hours == 0 && minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
            if(minutes == 0) return `${seconds} seconds`;
        
            return 'not estimated';
            
        },

        money: (value: any) => {

            if(!value) return '';

            // const match : any = /(\d+)(\.\d+)?/.exec(String(value))
            // return match[1].replace(/\d(?=(\d{3})+$)/g, "$&,") + (match[2] ? match[2].replace(".", ",") : ",00");

            if(!value) return ''

            let v = value.toString().replace(/\D/g,'');
            v = (v/100).toFixed(2) + '';
            v = v.replace(".", ",");
            value = v;
            return value

        },

        kilomotre: (value: any) => {

            if(!value) return ''

            let v = value.replace(/\D/g,'');

            v = v.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

            return v

        },

        phone: (value: string) => !value ? '' : value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '($1) $2').replace(/(\d{5})(\d)/, '$1-$2'),

        brDocument: (v: string) => {

            if(!v) return ''


            v = v.replace(/\D/g, "")

            if(v.length > 11) {
                v = v.replace(/^(\d{2})(\d)/, "$1.$2")
                v = v.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
                v = v.replace(/\.(\d{3})(\d)/, ".$1/$2")
                v = v.replace(/(\d{4})(\d)/, "$1-$2")
                return v
            }
  
            v = v.replace(/(\d{3})(\d)/, "$1.$2")
            v = v.replace(/(\d{3})(\d)/, "$1.$2")
            v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2")
            return v

        },

        replaceAt: (v: string, startIndex: number, endIndex: number, newValue: string) => {

            if(!v) return ''

            return v.substring(0, startIndex) + newValue + v.substring(endIndex)
            
        },

        validateEmail: (email: string) => {

            if(!email) return true

            const re = /\S+@\S+\.\S+/;
            return re.test(email);

        },

        validateDocument: (value: string): boolean => {

            if(!value) return false

            if(value.replace(/\D/g, '').length == 11) {

                let cpf = value.replace(/\D/g, '')
                let soma = 0
                let resto

                const arrayCpf = [
                    '00000000000',
                    '11111111111',
                    '22222222222',
                    '33333333333',
                    '44444444444',
                    '55555555555',
                    '66666666666',
                    '77777777777',
                    '88888888888',
                    '99999999999',
                ]

                if(arrayCpf.includes(cpf)) return false

                for(let i = 1; i <= 9; i++) {
                    soma = soma + parseInt(cpf.substring(i-1, i)) * (11 - i)
                }
                resto = (soma * 10) % 11
                if((resto == 10) || (resto == 11)) resto = 0
                if(resto != parseInt(cpf.substring(9, 10)) ) return false
                soma = 0
                for(let i = 1; i <= 10; i++){
                    soma = soma + parseInt(cpf.substring(i-1, i)) * (12 - i)
                }
                resto = (soma * 10) % 11
                if((resto == 10) || (resto == 11))  resto = 0
                if(resto != parseInt(cpf.substring(10, 11) ) ) return false
                return true

            }

            let cnpj = value.replace(/\D/g, '')
            let tamanho = cnpj.length - 2
		    let numeros = cnpj.substring(0,tamanho) as any
		    let digitos = cnpj.substring(tamanho)
		    let soma = 0

            const arrayCnpj = [
                '00000000000000',
                '11111111111111',
                '22222222222222',
                '33333333333333',
                '44444444444444',
                '55555555555555',
                '66666666666666',
                '77777777777777',
                '88888888888888',
                '99999999999999',
            ]

            if(arrayCnpj.includes(cnpj)) return false

		    let pos = tamanho - 7
		    for(let i = tamanho; i >= 1; i--) {
		      soma += numeros.charAt(tamanho - i) * pos--
		      if (pos < 2) pos = 9
		    }
		    let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11 as any
		    if(resultado != digitos.charAt(0)) return false;
		    tamanho = tamanho + 1
		    numeros = cnpj.substring(0,tamanho)
		    soma = 0
		    pos = tamanho - 7
		    for(let i = tamanho; i >= 1; i--) {
		      soma += numeros.charAt(tamanho - i) * pos--
		      if (pos < 2) pos = 9
		    }
		    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11
		    if(resultado != digitos.charAt(1)) return false
		    return true;

        },

        sanitizeText: (value: string) => !value ? '' : value.replace(/[^\w\sÀ-ÖØ-öø-ÿ]/gi, ''),

        sanitizeEmail: (value: string) => !value ? '' : value.replace(/[^a-zA-Z0-9@.]/g, ''),

        sanitizeNumber: (value: string) => !value ? '' : value.replace(/\D/g,''),

        ToXLS(data: any[], fileName: string) {

            const colunas = Object.keys(data[0]);
      
            let html = "<table><tr>";
            colunas.forEach(coluna => {
              html += `<th>${coluna}</th>`;
            });
            html += "</tr>";
          
            data.forEach(obj => {
              html += "<tr>";
              colunas.forEach(coluna => {
                html += `<td>${obj[coluna]}</td>`;
              });
              html += "</tr>";
            });
            html += "</table>";
          
            const blob = new Blob([html], { type: "application/vnd.ms-excel" });
            const url = URL.createObjectURL(blob);
          
            const link = document.createElement("a");
            link.href = url;
            link.download = fileName.endsWith(".xls") ? fileName : `${fileName}.xls`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          
            URL.revokeObjectURL(url);
      
        },

    }
}

const Format = factory()

export default Format
