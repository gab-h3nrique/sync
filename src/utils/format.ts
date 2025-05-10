
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

        date: (date:any) => (new Date(date)).toLocaleDateString('pt-BR'),

        money: (value: any) => {

            // const match : any = /(\d+)(\.\d+)?/.exec(String(value))
            // return match[1].replace(/\d(?=(\d{3})+$)/g, "$&,") + (match[2] ? match[2].replace(".", ",") : ",00");

            let v = value.toString().replace(/\D/g,'');
            v = (v/100).toFixed(2) + '';
            v = v.replace(".", ",");
            value = v;
            return value

        },

        phone: (value: string) => value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '($1) $2').replace(/(\d{5})(\d)/, '$1-$2'),

        brDocument: (v: string) => {

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

        }

    }
}

const Format = factory()

export default Format