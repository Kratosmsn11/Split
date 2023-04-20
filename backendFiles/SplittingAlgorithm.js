//how much each person spend
// var userSpending = [10,10,10]
//how much each person paid
// var userPaying = [30,0,0]
//will be the difference between how much the paid and spent
// var userNet = []
//the value of the sum of people who paid more than they spent
//this value would be the negative of the people who spent more than they paid
//Example
// 3 people have a bill of 30, each spends 10 dollars, one pays 30
// the net values would be +20, -10, and -10
//The difference value in this case would be 20
//So when calculating what each person who is in the negative owes
// it would be the values of people who are in the positive divided by the difference
//In this case it is 20/20
// So the person needs to pay 100 percent of their net to that person,

// // calculatePaymentNeed(userSpending,userPaying,userNet,userNames);

// calculatePaymentNeed([10,10],[20,0],["Vignesh","Joshua"]);
import { getGroupId } from "../AppData";

export function calculateDebts(userSpending,userPaying,userNames){
    
    var valid = checkValid(userSpending,userPaying);
    
    if(!valid){
        console.log("The spending and paying do not match!");
        return -1;
    }

    var difference = 0;
    var userNet = [];
    var debtList = {};
    var debts = []
    debtList.debts = debts;
    //go through all the spending 
    for (var i = 0;i < userSpending.length;i++){
        //calculate the net for each person
        userNet[i] = userPaying[i] - userSpending[i]
        //getting the sum of all the people with negative
        if(userNet[i]<0){
            difference+=userNet[i];
        }
    }
    //go through the net list
    for (var i = 0; i < userNet.length;i++){
        if(userNet[i] > 0){
            //does not owe anything
            continue;
        }
        else{
            //owes money
            for(var x = 0; x < userNet.length;x++){
                if(x==i){
                    //This would be the person's self so we don't need to owe
                }
                else{
                    if(userNet[x]<=0){
                        //don't owe to someone who owes
                    }
                    else{
                        // I get the difference between the people who paid and spend
                        //then it is used to calculate what percentage of the money you 
                        //owe should go to the other people
                        var debt = Math.abs(difference);
                        debt = userNet[x]/debt;
                        debt = userNet[i]*debt;
                        debt = Math.abs(debt);
                        //the debt data is created, using the groupId that is currently in use
                        var data = {
                            owerId: userNames[i],
                            lenderId: userNames[x],
                            groupId: getGroupId(),
                            total: debt.toFixed(2),
                        }
                        if(debt.toFixed(2)>0){
                            // console.log(userNames[i]+" owes "+userNames[x] + " " + debt);
                            debtList.debts.push(data)
                        }
                    }
                }
            }
        }
    }
    // console.log(debtList.debts);
    return debtList.debts;
}

function checkValid(arr1,arr2){
    let sum1 = arr1.reduce(function(a, b){
      return a + b;
    });
    let sum2 = arr2.reduce(function(a, b){
      return a + b;
    });
    let diff = Math.abs(sum1 - sum2);
    
    //The result will not be valid since the paying and spending is not the same.
    if(diff > 0.5){
        return false;
    }
    else{
        return true;
    }
}