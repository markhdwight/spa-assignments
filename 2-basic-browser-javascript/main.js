let total = 0;
let currentBonus = 1;
let multiplier = 1.2;
let numAutos = 0;
let multCost = 10;
let autoCost = 100;
let canReset = false;
let autoClickerArray = [];

let cookie = document.cookie

const saveCookie = (()=> {
    Cookies.set("total",total,{expires:100})
    Cookies.set("currentBonus",currentBonus,{expires:100})
    Cookies.set("numAutos",numAutos,{expires:100})
})

const getFromCookie = (() =>{
    
    if(Cookies.get("total"))
        {
            total=parseFloat(Cookies.get("total"))
            currentBonus=parseFloat(Cookies.get("currentBonus"))
            numAutos = parseInt(Cookies.get("numAutos"))

            $("#header_label").text("Total: "+total.toFixed(2)+" ")
            $("#button").text(currentBonus.toFixed(2))
            $("#right_label").text("Cost: 100, Autos: "+numAutos)

            if(total>=multCost)
                $("#multiply_button").css("background","white")
            if(total>=autoCost)
                $("#autoclick_button").css("background","white")

            for(let i = 0; i<numAutos; i++)
                {
                    autoClickerArray[i] = setInterval(()=>{$("#button").trigger("click")},1000)
                }
        }
        else{
            total=0
            currentBonus=1
            numAutos=0
        }

})

$(document).ready( () => {


    $("#button").click( (event) =>{

        total += currentBonus

        canReset = true
        $("#header_label").text("Total: "+total.toFixed(2))

        if(total>=multCost)
            $("#multiply_button").css("background","white")
        if(total>=autoCost)
            $("#autoclick_button").css("background","white")
    })

    $("#multiply_button").click( (event) =>{

        if(total >= multCost)
            {
                total-=multCost
                currentBonus *= multiplier
                
                $("#button").text(currentBonus.toFixed(2))
                $("#header_label").text("Total: "+total.toFixed(2))
                if(total < multCost)
                    $("#multiply_button").css("background","grey")
                if(total < autoCost)
                    $("#autoclick_button").css("background","grey")
            }
    })

    $("#autoclick_button").click( (event) =>{

        if(total >= autoCost)
            {
                total-=autoCost
                numAutos++
                
                $("#right_label").text("Cost: 100, Autos: "+numAutos)
                $("#header_label").text("Total: "+total.toFixed(2))
                if(total < multCost)
                    $("#multiply_button").css("background","grey")
                if(total < autoCost)
                    $("#autoclick_button").css("background","grey")

                autoClickerArray[numAutos] = setInterval(()=>{$("#button").trigger("click")},1000);
            }
    })

    $("#reset_button").click((event) =>{
        
        if(canReset)
            {    
                total = 0;
                currentBonus = 1;
                numAutos = 0;

                for(let i = 0; i < autoClickerArray.length; i++)
                    {
                        clearInterval(autoClickerArray[i])
                    }

                $("#header_label").text("Total: "+total+" ")
                $("#multiply_button").css("background","grey")
                $("#right_label").text("Cost: 100, Autos: "+numAutos)
                $("#multiply_button").css("background","grey")
                $("#autoclick_button").css("background","grey")

            }
        
    })

    $(window).on("beforeunload", ()=>{

        saveCookie()

    })  

    getFromCookie()

})

