import { sortBy } from "lodash";

//modify data for chart goal diff
export const formatTableDataForChart = (data, start = 0, end = 20) => {
    console.log(data); //test
    console.log(start);
    console.log(end);

    //1. sort data
    data = sortBy(data, [g => g.goalDifference]); //sort data by goalsDiff

    //2. object for new data
    let newData = {}; 

    //3. extract neccesery data
    const teams = data.map((el => {
        return el.team.name;
    }));

    const goalsDiff = data.map(el => {
        return el.goalDifference;
    });

    //4. put data into object
    newData.teams = teams.reverse(); //reverse - sortby in wrong way
    newData.goalDifference = goalsDiff.reverse(); //reverse - sortby in wrong way

    //5. Cut data - acording to require length
    newData.teams = teams.slice(start , end);
    newData.goalDifference = goalsDiff.slice(start , end); 

    console.log(newData);

    return newData
};

//additionl function for formatDataForChartForAgainst
const extractHomeAway = (teams, table, type) => {

    // console.log(teams); //test
    // console.log(table); //test

    const finalData = [];
    teams.forEach((el) => {
        table.forEach((el2) => {
            if(el2.team.name === el){
                finalData.push(el2[type])
            }
        })
    });

    // console.log(finalData); //test
    return finalData

};

export const formatDataForChartForAgainst = (data, settings, start = 1, end = 10) => {

    // console.log(data); //test
    // console.log(settings); //test

    const type = settings.split(/(?=[A-Z])/).slice(0,2).join(""); //regular expresion to split by capital letter -> goalsFor / goalsAgainst
    const kind = settings.split(/(?=[A-Z])/).slice(2).toString(); //regular expresion to split by capital letter -> Best     / Worst

    //1. sort data
    data.tableTotal = sortBy(data.tableTotal, [g => g[type]]); //sort data by type

    //2. object for new data
    let newData = {}; 
   
    // 3. extract total data - reduce data to requere lenght
    const teams = data.tableTotal.map((el) => {
        return el.team.name;
    })

    const goals = data.tableTotal.map(el => {
        return el[type];
    });
    
    //4. put data into object - goals for best teams are with highest numbers, goals against best teams are with lowest numbers
    if (type === "goalsFor"){
        if(kind === "Best"){
            newData.teams = teams.reverse(); //reverse for best teams and GoalsFor
            newData[`total`] = goals.reverse(); //reverse for best teams and GoalsFor
        }
        else{
            newData.teams = teams; // do not reverse for worst team and GoalsFor
            newData[`total`] = goals; // do not reverse for worst team and GoalsFor
        }
    }else{
        if(kind === "Best"){
            newData.teams = teams; // do not reverse for worst team and GoalsAgainst
            newData[`total`] = goals; // do not reverse for worst team and GoalsAgainst
            
        }
        else{
            newData.teams = teams.reverse(); //reverse for best teams
            newData[`total`] = goals.reverse(); //reverse for best teams and GoalsAgainst
        }
    }

    // 4.extract home and away data
    //take team array and find in home and away table this 
    newData[`home`] = extractHomeAway(newData.teams, data.tableHome, type);
    newData[`away`] = extractHomeAway(newData.teams, data.tableAway, type);


    //5. Cut data - acording to require length
    newData[`teams`] = newData[`teams`].slice(start - 1, end);
    newData[`total`] = newData[`total`].slice(start - 1, end);
    newData[`home`] = newData[`home`].slice(start - 1, end);
    newData[`away`] = newData[`away`].slice(start - 1, end);

    // console.log(newData); //test
    return newData
};

