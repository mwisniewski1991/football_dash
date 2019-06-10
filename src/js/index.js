import League from './models/League';
import * as leagueView from './views/leagueView'; 
import * as chartsView from './views/chartsView'; 
import * as chartsData from './views/chartsData'; 
import { elements } from './views/base';

//GLOBAL STATE OF THE APP
//currentComp, tableTotal, tableHome, tableAway, scorers
const state = {};


//API CONTROLLER
const controlSearch =  async (e) =>{

    //1. GET ID LEAGUE - ON LOAD 2021 - PREMIER LEAGUE
    let leagueId;
    const selectButtons = elements.selectButtons;

    if(e){
        leagueId = e.target.id;
    }
    else{
        leagueId = '2021'
    }

    //2. NEW SEARCH OBJECT ADD TO STATE
    // console.log(leagueId);

    state.league = new League(leagueId);
    // state.league = new League('2021');


    try{
        //3. SEARCH FOR LEAGUE
        await state.league.getTables();
        await state.league.getScorers();

        //4. PREPARE UI FOR INPUT
        leagueView.clearTable();
        leagueView.clearScorers()

        //5. RENDER TABLE
        leagueView.createLeagueTitle(state.league.currentComp);
        leagueView.createTable(state.league.tableTotal); //league table
        leagueView.createScorers(state.league.scorers); //scorers table

        //6. RENDER CHARTS
        //goals diffrences
        const chartGoalDiffData = chartsData.formatTableDataForChart(state.league.tableTotal, "goalDifference");
        chartsView.createChartGoalDiff(chartGoalDiffData);

        //goals for best
        {
            const chartGoalData = chartsData.formatDataForChartForAgainst(state.league, "goalsForBest",1 , 10);
            // console.log(chartGoalData);
            chartsView.creatChartGoal(chartGoalData, "goalsForBest");
        }

        {
            const chartGoalData = chartsData.formatDataForChartForAgainst(state.league, "goalsForWorst");
            // console.log(chartGoalData);
            chartsView.creatChartGoal(chartGoalData, "goalsForWorst");
        }

        {
            const chartGoalData = chartsData.formatDataForChartForAgainst(state.league, "goalsAgainstBest");
            // console.log(chartGoalData);
            chartsView.creatChartGoal(chartGoalData, "goalsAgainstBest");
        }


        {
            const chartGoalData = chartsData.formatDataForChartForAgainst(state.league, "goalsAgainstWorst");
            // console.log(chartGoalData);
            chartsView.creatChartGoal(chartGoalData, "goalsAgainstWorst");
        }



    }
    catch(error){
        console.log(error);
    }
};


//CHANGE LEGAUE TABLE TOTAL/HOME/AWAY
const changeLeagueKind = (e) => {

    //1. remove clicked class from whole elements
    const buttons = Array.from(elements.tableButtons);
    buttons.forEach(el => {
        el.classList.remove('changeLeague-type__button--clicked');
    });

    //2. add class to clicked element
    event.target.classList.add('changeLeague-type__button--clicked');

    //3.clear table from UI
    leagueView.clearTable();

    //4. render new table and udpate chart
    let type = e.target.id.charAt(0).toUpperCase() + e.target.id.slice(1) //change first letter to uppercase. necessery for next step

    //create league table
    leagueView.createTable(state.league[`table${type}`]);
    
    //create golas diff chart
    let chartGoalDiffData = chartsData.formatTableDataForChart(state.league[`table${type}`]);
    chartsView.createChartGoalDiff(chartGoalDiffData);
};


//LISTENER TO CHANGE LEGAUE TABLE TOTAL/HOME/AWAY
Array.from(elements.tableButtons).forEach(el => {
    el.addEventListener('click', changeLeagueKind);
})

//LISTENER TO CHANGE LEAGUE
Array.from(elements.selectButtons).forEach(el => {
    el.addEventListener('click', controlSearch);
})


//START ON LOAD
controlSearch();
console.log(state.league);
