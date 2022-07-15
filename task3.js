class Good {
    constructor(id, name, descrition, sizes, price, availeble){
        this.id = id;
        this.name = name;
        this.descrition = descrition;
        this.sizes = sizes;
        this.price = price;
        this.available = availeble;
    }
    setAvailable(bool){
        this.available = bool;
    }
}

class GoodsList{
    #goods
    constructor(goods, filter, sortPrice, sortDir){
        this.#goods = goods;
        this.filter =  filter;
        this.sortPrice = sortPrice;
        this.sortDir = sortDir;
    }
    get list(){
        let returnArray = [];
        if (this.sortPrice != undefined){
            if(this.sortDir == false){
            returnArray = this.#goods.sort((a, b) => b.price > a.price ? 1 : -1);
            } else{
                returnArray = this.#goods.sort((a, b) => a.price > b.price ? 1 : -1);
            }
        }
        if (this.filter != undefined) {
            returnArray = returnArray.filter(good => this.filter.test(good.name));
        }
        returnArray = returnArray.filter(good => good.available);
        return returnArray;
    }
    add(Good){
        this.#goods.push(Good);
    }
    remove(id){
        for(let i=0; i<this.#goods.length; i++){
            if (this.#goods[i]['id'] === id){
                this.#goods.splice(i,1);
            }
        }
    }
}

class BasketGood extends Good {
    constructor(good, amount){
        super(good)
        this.amount = amount
    }
}

class Basket {
    constructor(BasketGood){
        this.BasketGood = BasketGood
    }

    showMe() {
        console.log(this.BasketGood)
    }

    get totalAmount() {
        let amount = 0;
        for (let i=0; i<this.BasketGood.length;i++) {
            amount += this.BasketGood[i].id.price * this.BasketGood[i].amount
        }
        return amount;
    }
    get totalSumm(){
        let summ = 0;
        for (let i=0; i<this.BasketGood.length;i++) {
            summ += this.BasketGood[i].amount;
        }
        
        return summ;
    }
    add(good, amount){
        let basketGood = new BasketGood(good, amount)
        for (let i = 0; i <this.BasketGood.length; i++){
            if (this.BasketGood[i].id.id == basketGood.id.id ){
                this.BasketGood[i].amount = this.BasketGood[i].amount + amount;
                return this.BasketGood;
            }
        }
        this.BasketGood.push(basketGood);
    }
    remove(good, amount){
        for (let i = 0; i <this.BasketGood.length; i++){
            if (this.BasketGood[i].id.id == good.id){
                console.log('first')
                this.BasketGood[i].amount = this.BasketGood[i].amount - amount
                if(this.BasketGood[i].amount<1){
                    this.BasketGood.splice(i, 1);
                }
            }
        }
        return this.BasketGood;
    }
    clear(){
        this.BasketGood =[]
        return this.BasketGood;
    }
    removeUnavailable(){
        this.BasketGood = this.BasketGood.filter(good => good.id.available == true)
        return this.BasketGood;
    }

}


let g1 = new Good(1,'t-shirt','desc',[52,54,58], 1200, true);
let g2 = new Good(2,'boots','desc',[52,54,58], 2500, true);
let g3 = new Good(3,'hat','desc',[52,54,58], 1500, true);
let g4 = new Good(4,'jacket','desc',[52,54,58], 3000, true);
let g5 = new Good(5, 'socks', 'black socks',[3,5,7],200, true)
let gl = new GoodsList([g1,g2,g3],/[a-z]/u, true,true)
gl.add(g4);
gl.remove(2)
let bG1 = new BasketGood(g1,1);
let bG2 = new BasketGood(g2,2);
let bG3 = new BasketGood(g3,3);
let bG4 = new BasketGood(g4,5);
let Bs = new Basket([bG1, bG2, bG3]);

Bs.add(g3,15);
Bs.add(g5,5);
//Bs.showMe();
Bs.remove(g3,7);
//Bs.showMe();
Bs.removeUnavailable();
//Bs.showMe();
Bs.clear();
//Bs.showMe();
